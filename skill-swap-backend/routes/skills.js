const express = require('express');
const { Skill } = require('../models/db');
const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, skill_name, type, level } = req.body;
  try {
    const skill = await Skill.create({ user_id, skill_name, type, level });
    res.status(201).json({ message: 'Skill added', skill });
  } catch (error) {
    res.status(500).json({ error: 'Error adding skill' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const skills = await Skill.findAll({ where: { user_id: userId } });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skillss' });
  }
});

router.delete('/:skillId', async (req, res) => {
  const { skillId } = req.params; // Get skill ID from request parameters

  try {
    // Find the skill by ID
    const skill = await Skill.findByPk(skillId);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Delete the skill
    await skill.destroy();

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting skill', details: error.message });
  }
});

module.exports = router;