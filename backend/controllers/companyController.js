const supabase = require('../config/supabaseClient');
const blockchainService = require('../services/blockchainService');

exports.requestTokens = async (req, res) => {
  const { amount } = req.body;
  const companyId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('token_requests')
      .insert([
        {
          company_id: companyId,
          amount,
          status: 'pending'
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
    // 1. Get user for wallet address
    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('wallet_address')
      .eq('id', req.user.id)
      .single();

    if (userErr) throw userErr;

    // 2. Get Blockchain Balance
    const balance = await blockchainService.getBalance(user.wallet_address);
    
    // 3. Get History
    const { data: requests, error: reqErr } = await supabase
      .from('token_requests')
      .select('*')
      .eq('company_id', req.user.id);

    if (reqErr) throw reqErr;
    
    res.json({
      balance,
      history: requests
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
