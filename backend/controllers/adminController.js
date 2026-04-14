const supabase = require('../config/supabaseClient');
const blockchainService = require('../services/blockchainService');

exports.getPendingUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .in('role', ['ngo', 'company'])
      .eq('approved', false);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ approved: true })
      .eq('id', req.body.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*, submitted_by(name, email)');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveProject = async (req, res) => {
  const { id, credits } = req.body;
  try {
    // 1. Fetch project with submitter data
    const { data: project, error: fetchErr } = await supabase
      .from('projects')
      .select('*, submitted_by(wallet_address)')
      .eq('id', id)
      .single();

    if (fetchErr || !project) return res.status(404).json({ message: 'Project not found' });

    // 2. Blockchain Mint
    const amount = credits || (project.area * 10);
    const txHash = await blockchainService.mintTokens(project.submitted_by.wallet_address, amount);

    // 3. Update Supabase
    const { data: updatedProject, error: updateErr } = await supabase
      .from('projects')
      .update({
        status: 'approved',
        credits_generated: amount,
        tx_hash: txHash
      })
      .eq('id', id)
      .select()
      .single();

    if (updateErr) throw updateErr;
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTokenRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('token_requests')
      .select('*, company_id(name, email, wallet_address)');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveTokenRequest = async (req, res) => {
  const { id } = req.body;
  try {
    const { data: request, error: fetchErr } = await supabase
      .from('token_requests')
      .select('*, company_id(wallet_address)')
      .eq('id', id)
      .single();

    if (fetchErr || !request) return res.status(404).json({ message: 'Request not found' });

    // 1. Blockchain Transfer
    const txHash = await blockchainService.transferTokens(
      request.company_id.wallet_address,
      request.amount,
      90
    );

    // 2. Update Supabase
    const { data: updatedRequest, error: updateErr } = await supabase
      .from('token_requests')
      .update({
        status: 'approved',
        tx_hash: txHash,
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (updateErr) throw updateErr;
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
