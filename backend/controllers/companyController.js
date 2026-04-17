const supabase = require('../config/supabaseClient');
const blockchainService = require('../services/blockchainService');

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

    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('wallet_address')
      .eq('id', companyId)
      .single();
      
    if (userErr) throw userErr;

    // Instant Blockchain Transfer from central contract pool minter
    const txHash = await blockchainService.transferTokens(
      user.wallet_address,
      amount,
      90
    );

    const { data, error } = await supabase
      .from('token_requests')
      .insert([
        {
          company_id: companyId,
          amount,
          status: 'approved',
          tx_hash: txHash,
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
