const mongoose = require('mongoose');
const express = require('express');
const Category = require('../models/Categorymodel');
const router = express.Router();

// Create a new category
router.post('/', async (req, res) => {
  try {
    const { name, topics } = req.body;
    const newCategory = new Category({ name, topics });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
});

// Add a topic to a category
router.post('/:categoryId/topics', async (req, res) => {
  try {
    const { name, notes } = req.body;
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const newTopic = { name, notes: notes || [] };
    category.topics.push(newTopic);
    await category.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(400).json({ message: 'Error creating topic', error: error.message });
  }
});


// Add a note to a topic
router.post('/:categoryId/topics/:topicName/notes', async (req, res) => {
  try {
    const { title, content } = req.body;  // Extract title and content from request body
    const { categoryId, topicName } = req.params; // Extract categoryId and topicName from the URL parameters

    // Find category by categoryId
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find the topic within the category by topicName
    const topic = category.topics.find(
      topic => topic.name.toLowerCase() === topicName.toLowerCase()
    );
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Create a new note
    const newNote = {
      noteId: new mongoose.Types.ObjectId(), // Generate a new note ID
      title,
      content
    };

    // Add the new note to the topic's notes array
    topic.notes.push(newNote);

    // Save the updated category with the new note
    await category.save();

    // Return the newly added note
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: 'Error creating note', error: error.message });
  }
});



router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Get a category by ID
router.get('/:categoryId', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});

// Get all topics for a category
router.get('/:categoryId/topics', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category.topics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics', error: error.message });
  }
});



// Search a topic by name and return only topic data
router.get('/:categoryId/topics/:topicName', async (req, res) => {
  try {
    const { topicName } = req.params;

    // Find categories containing the topic name
    const categories = await Category.find({
      topics: { $elemMatch: { name: topicName } },
    }).select('topics');  // Only return the 'topics' field

    // Flatten the topics array and filter by the topic name
    const matchingTopics = categories
      .map(category => category.topics)
      .flat()
      .filter(topic => topic.name.toLowerCase() === topicName.toLowerCase());

    if (matchingTopics.length === 0) {
      return res.status(404).json({ message: 'No topics found with the given name' });
    }

    res.status(200).json(matchingTopics);  // Return only the matching topics
  } catch (error) {
    res.status(500).json({ message: 'Error searching by topic name', error: error.message });
  }
});

// Search a topic by name and return only topic data
router.get('/:categoryId/topics/:topicName/notes', async (req, res) => {
  try {
    const { categoryId, topicName } = req.params;

    // Find category by categoryId
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Find the topic within the category
    const topic = category.topics.find(topic => topic.name.toLowerCase() === topicName.toLowerCase());
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    // Extract and return the notes for the matching topic
    const matchingNotes = topic.notes.map(note => ({
      noteId: note.noteId,
      title: note.title,
      content: note.content
    }));

    if (matchingNotes.length === 0) {
      return res.status(404).json({ message: 'No notes found for the given topic' });
    }

    res.status(200).json(matchingNotes);  // Return the notes
  } catch (error) {
    res.status(500).json({ message: 'Error searching by topic name', error: error.message });
  }
});




// Search for notes by note name (title) within a specific topic
// router.get('/:categoryId/topics/:topicName/notes/:noteName', async (req, res) => {
//   try {
//     const { categoryId, topicName, noteName } = req.params;

//     // Find category by categoryId
//     const category = await Category.findById(categoryId);
//     if (!category) return res.status(404).json({ message: 'Category not found' });

//     // Find topic within the category by topicName
//     const topic = category.topics.find(topic => topic.name.toLowerCase() === topicName.toLowerCase());
//     if (!topic) return res.status(404).json({ message: 'Topic not found' });

//     // Filter notes by noteName (case-insensitive)
//     const matchingNotes = topic.notes.filter(note =>
//       note.title.toLowerCase().includes(noteName.toLowerCase())
//     );

//     if (matchingNotes.length === 0) {
//       return res.status(404).json({ message: 'No notes found with the given name' });
//     }

//     res.status(200).json(matchingNotes);  // Return the matching notes
//   } catch (error) {
//     res.status(500).json({ message: 'Error searching notes by name', error: error.message });
//   }
// });

router.get('/:categoryId/topics/:topicName/notes/:noteName', async (req, res) => {
  try {
    const { categoryId, topicName, noteName } = req.params;

    // Find category by categoryId
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Find topic within the category by topicName
    const topic = category.topics.find(topic => topic.name.toLowerCase() === topicName.toLowerCase());
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    // Check if notes exist and are an array
    if (!topic.notes || !Array.isArray(topic.notes)) {
      return res.status(404).json({ message: 'Notes not found for the topic' });
    }

    // Filter notes by noteName (case-insensitive)
    const matchingNotes = topic.notes.filter(note =>
      note.title && typeof note.title === 'string' && note.title.toLowerCase().includes(noteName.toLowerCase())
    );

    if (matchingNotes.length === 0) {
      return res.status(404).json({ message: 'No notes found with the given name' });
    }

    res.status(200).json(matchingNotes);  // Return the matching notes
  } catch (error) {
    res.status(500).json({ message: 'Error searching notes by name', error: error.message });
  }
});





module.exports = router;
