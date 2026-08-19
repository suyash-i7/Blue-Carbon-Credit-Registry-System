const supabase = require('../config/supabaseClient');

exports.buyTokens = async (req, res) => {
  const { amount } = req.body;
  const companyId = req.user.id;
  const ANNUAL_LIMIT = 100;

  try {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(`${currentYear}-01-01T00:00:00Z`).toISOString();
    
    // Calculate total tokens bought this year
    const { data: pastPurchases, error: fetchErr } = await supabase
      .from('token_requests')
      .select('amount')
      .eq('company_id', companyId)
      .eq('status', 'approved')
      .gte('created_at', startOfYear);
      
    if (fetchErr) throw fetchErr;

    const totalBought = pastPurchases.reduce((sum, req) => sum + req.amount, 0);

    if (totalBought + Number(amount) > ANNUAL_LIMIT) {
      return res.status(400).json({ message: `Annual purchase limit of ${ANNUAL_LIMIT} tokens exceeded. You can only buy ${ANNUAL_LIMIT - totalBought} more tokens this year.` });
    }

    // Generate Registry Transaction Reference
    const purchaseTx = `VCC-PUR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const { data, error } = await supabase
      .from('token_requests')
      .insert([
        {
          company_id: companyId,
          amount: Number(amount),
          status: 'approved',
          tx_hash: purchaseTx,
          expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTokens = async (req, res) => {
  try {
    // 1. Get History from Supabase
    const { data: requests, error: reqErr } = await supabase
      .from('token_requests')
      .select('*')
      .eq('company_id', req.user.id)
      .order('created_at', { ascending: false });

    if (reqErr) throw reqErr;

    // 2. Calculate balance from approved records
    const balance = (requests || [])
      .filter(r => r.status === 'approved')
      .reduce((sum, r) => sum + Number(r.amount || 0), 0);
    
    res.json({
      balance,
      history: requests || []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
