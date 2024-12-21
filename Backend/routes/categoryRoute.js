const mongoose = require('mongoose');
const express = require('express');
const Category = require('../models/Categorymodel.js');
const router = express.Router();


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


router.post('/:categoryId/topics', async (req, res) => {
  try {
    const { name, notes } = req.body;
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const newTopic = { name:name, notes: notes || [] };
    category.topics.push(newTopic);
    await category.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(400).json({ message: 'Error creating topic', error: error.message });
  }
});



router.post('/:categoryId/topics/:topicName/notes', async (req, res) => {
  try {
    const { title, content } = req.body;  
    const { categoryId, topicName } = req.params; 

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

   
    const topic = category.topics.find(
      topic => topic.name.toLowerCase() === topicName.toLowerCase()
    );
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const newNote = {
      noteId: new mongoose.Types.ObjectId(), 
      title,
      content
    };

    topic.notes.push(newNote);
    await category.save();
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


router.get('/:categoryId', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});


router.get('/:categoryId/topics', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category.topics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics', error: error.message });
  }
});




router.get('/:categoryId/topics/:topicName', async (req, res) => {
  try {
    const { topicName } = req.params;

    const categories = await Category.find({
      topics: { $elemMatch: { name: topicName } },
    }).select('topics');  

    
    const matchingTopics = categories
      .map(category => category.topics)
      .flat()
      .filter(topic => topic.name.toLowerCase() === topicName.toLowerCase());

    if (matchingTopics.length === 0) {
      return res.status(404).json({ message: 'No topics found with the given name' });
    }
    res.status(200).json(matchingTopics); 

  } catch (error) {
    res.status(500).json({ message: 'Error searching by topic name', error: error.message });
  }
});


router.get('/:categoryId/topics/:topicName/notes', async (req, res) => {
  try {
    const { categoryId, topicName } = req.params;

    
    const category = await Category.findById(categoryId);

    if (!category) return res.status(404).json({ message: 'Category not found' });

    const topic = category.topics.find(topic => topic.name.toLowerCase() === topicName.toLowerCase());

    if (!topic) return res.status(404).json({ message: 'Topic not found' });

   
    const matchingNotes = topic.notes.map(note => ({
      noteId: note.noteId,
      title: note.title,
      content: note.content
    }));

    if (matchingNotes.length === 0) {
      return res.status(404).json({ message: 'No notes found for the given topic' });
    }
    res.status(200).json(matchingNotes); 

  } catch (error) {
    res.status(500).json({ message: 'Error searching by topic name', error: error.message });
  }
});


router.get('/:categoryId/topics/:topicName/notes/:noteName', async (req, res) => {
  try {
    const { categoryId, topicName, noteName } = req.params;

    
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    
    const topic = category.topics.find(topic => topic.name.toLowerCase() === topicName.toLowerCase());
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

   
    if (!topic.notes || !Array.isArray(topic.notes)) {
      return res.status(404).json({ message: 'Notes not found for the topic' });
    }

   
    const matchingNotes = topic.notes.filter(note =>
      note.title && typeof note.title === 'string' && note.title.toLowerCase().includes(noteName.toLowerCase())
    );

    if (matchingNotes.length === 0) {
      return res.status(404).json({ message: 'No notes found with the given name' });
    }
   res.status(200).json(matchingNotes);  

  } catch (error) {
    res.status(500).json({ message: 'Error searching notes by name', error: error.message });
  }
});


module.exports = router;
