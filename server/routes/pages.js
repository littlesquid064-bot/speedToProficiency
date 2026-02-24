const express = require('express');
const router = express.Router();

// Genie Intro Screen
router.get('/genie-intro', (req, res) => {
  res.json({ message: 'Genie Intro Screen route works!' });
});

// Self Rating Screen
router.get('/self-rating', (req, res) => {
  res.json({ message: 'Self Rating Screen route works!' });
});

// Knowledge Test Screen
router.get('/knowledge-test', (req, res) => {
  res.json({ message: 'Knowledge Test Screen route works!' });
});

// Validation Screen
router.get('/validation', (req, res) => {
  res.json({ message: 'Validation Screen route works!' });
});

// Dashboard ("/")
router.get('/', (req, res) => {
  res.json({ message: 'Dashboard route works!' });
});

module.exports = router;
