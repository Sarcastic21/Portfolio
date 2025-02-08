import express from 'express';
import Contact from '../models/contactModel.js'; // Path to the model
const router = express.Router();

// POST route to handle contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const newContact = new Contact({ name, email, mobile });
    await newContact.save();
    res.status(201).json({ message: 'Contact information saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// GET route to fetch all contact submissions
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find(); // Get all contact data from the database
    res.status(200).json(contacts); // Send the contacts as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact data' });
  }
});

export default router;
