const express = require('express');
const router = express.Router();
const { Messages, User } = require('../models/db');
const { verifyToken } = require('../middleware/auth');
const { Op } = require('sequelize');

router.get('/', verifyToken, async (req, res) => {
  const { matchId, userId } = req.query;
  
  try {
    const messages = await Messages.findAll({
      where: {
        [Op.or]: [
          { sender_id: matchId, recipient_id: userId },
          { sender_id: userId, recipient_id: matchId },
        ],
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'ASC']], // Order messages by creation time
    });
    
    // Map the results to include the sender's name
    const formattedMessages = messages.map(message => ({
      id: message.id,
      sender_id: message.sender_id,
      recipient_id: message.recipient_id,
      content: message.content,
      timestamp: message.createdAt,
      senderName: message.sender ? message.sender.name : 'Unknown',
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ error: 'Could not fetch messages.' });
  }
});

// Enviar un nuevo mensaje
router.post('/', verifyToken, async (req, res) => {
  const recipientId = req.body.matchId;
  const senderId = req.body.userId;
  const content = req.body.content;

  if (!recipientId || !content) {
    return res.status(400).json({ error: 'Recipient ID and content are required' });
  }

  try {
    const newMessage = await Messages.create({
      sender_id: senderId,
      recipient_id: recipientId,
      content: content
    });

    // Fetch the sender's name
    const sender = await User.findByPk(senderId);
    const senderName = sender ? sender.name : 'Unknown';

    const messageResponse = {
      id: newMessage.id,
      sender_id: newMessage.sender_id,
      recipient_id: newMessage.recipient_id,
      content: newMessage.content,
      timestamp: newMessage.createdAt,
      senderName: senderName
    };

    res.status(201).json(messageResponse);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
});

module.exports = router;