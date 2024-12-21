
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contents: [
    {
      contentTitle: { type: String, required: true },
      content: { type: String, required: true }
    }
  ]
});


const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  notes: [noteSchema], 
});


const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    topics: [topicSchema], 
  },
  { timestamps: true } 
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
