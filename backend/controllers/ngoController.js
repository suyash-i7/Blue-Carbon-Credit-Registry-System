const supabase = require('../config/supabaseClient');

exports.submitProject = async (req, res) => {
  const { name, location, area } = req.body;
  const ngoId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          location,
          area,
          submitted_by: ngoId,
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

exports.getOwnProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('submitted_by', req.user.id);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
