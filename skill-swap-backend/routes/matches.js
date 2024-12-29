const express = require('express');
const { Sequelize } = require('sequelize');
const { User, Skill } = require('../models/db');
const router = express.Router();

// Ruta para obtener matches basados en habilidades
router.get('/', async (req, res) => {
    try {
      const { userId } = req.query; // ID del usuario que busca matches
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
      }
  
      // Obtener las habilidades del usuario actual
      const userSkills = await Skill.findAll({
        where: { user_id: userId },
        attributes: ['skill_name', 'type'],
      });
  
      if (!userSkills.length) {
        return res.status(404).json({ message: 'No skills found for this user.' });
      }
  
      // Filtrar usuarios con habilidades similares
      const matches = await User.findAll({
        include: [
          {
            model: Skill,
            where: {
              skill_name: userSkills.map((skill) => skill.skill_name), // Coincidencia en habilidades
              type: userSkills[0].type === 'teach' ? 'learn' : 'teach', // Tipo opuesto
            },
            required: true,
          },
        ],
        where: {
          id: { [Sequelize.Op.ne]: userId }, // Excluir al usuario actual
        },
      });
  
      res.json(matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      res.status(500).json({ message: 'Error fetching matches.', db: error.message });
    }
  });
  
module.exports = router;
