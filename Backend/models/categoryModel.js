
const mongoose = require('mongoose');

// Note Schema
// const noteSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content_1: { type: String, required: true },
//   content_2: { type: String, required: true },
//   content_3: { type: String, required: true },
//   content_4: { type: String, required: true },
//   content_5: { type: String, required: true }
// });


const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contents: [
    {
      contentTitle: { type: String, required: true },
      content: { type: String, required: true }
    }
  ]
});


// Topic Schema
const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  notes: [noteSchema], // Notes are embedded within topics
});

// Category Schema
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    topics: [topicSchema], // Topics are embedded within categories
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
