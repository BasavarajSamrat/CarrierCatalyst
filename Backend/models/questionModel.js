// const mongoose = require("mongoose");

// const questionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   correctOption: {
//     type: String,
//     required: true,
//   },
 
//   options: {
//     type: Object,
//     required: true,
//   },
//   exam: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "exams",
//   },
// }, {
//     timestamps: true,
// });

// const Question = mongoose.model("questions", questionSchema);
// module.exports = Question;
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    correctOption: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    description: {
      type: String, // Field to store the explanation for the correct answer
      required: true, // Set to true if you want all questions to have a description
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exams",
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("questions", questionSchema);
module.exports = Question;


