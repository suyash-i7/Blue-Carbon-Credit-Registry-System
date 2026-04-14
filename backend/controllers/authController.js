const supabase = require('../config/supabaseClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  const { name, email, password, role, walletAddress } = req.body;
  const document_url = req.file ? req.file.path : null;

  try {
    // 1. Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Role/Approval Logic
    const ADMIN_EMAIL = 'carbonadmin@gmail.com';
    let isApproved = false;
    let finalRole = role;

    // Only this specific email can be an admin
    if (email === ADMIN_EMAIL) {
      finalRole = 'admin';
      isApproved = true;
    } else if (role === 'admin') {
      // Prevent unauthorized admin registration
      return res.status(403).json({ message: 'Unauthorized role assignment' });
    }

    // 4. Create User in Supabase
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        { 
          name, 
          email, 
          password: hashedPassword, 
          role: finalRole, 
          wallet_address: walletAddress,
          document_url,
          approved: isApproved 
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const ADMIN_EMAIL = 'carbonadmin@gmail.com';

  try {
    // 1. Check if user exists
    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle(); // Use maybeSingle to avoid 406 errors if not found

    // 2. AUTO-BOOTSTRAP ADMIN:
    // If the specific admin email doesn't exist, create it on the fly
    if (!user && email === ADMIN_EMAIL) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{ 
          name: 'Primary Admin', 
          email, 
          password: hashedPassword, 
          role: 'admin', 
          approved: true 
        }])
        .select()
        .single();
        
      if (createError) throw createError;
      user = newUser;
    }

    // 3. Normal Login Verification
    if (user && (await bcrypt.compare(password, user.password))) {
      
      if (!user.approved && user.role !== 'admin') {
        return res.status(403).json({ message: 'Account pending approval from admin' });
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
