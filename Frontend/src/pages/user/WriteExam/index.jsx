
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../../apicalls/exams";
import { addReport } from "../../../apicalls/reports";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import Instructions from "./Instructions";

function WriteExam() {
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState({});
  const [view, setView] = useState("instructions");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  // Fetch exam data by ID
  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({ examId: params.id });
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
        setQuestions(response.data.questions);
        setSecondsLeft(response.data.duration * 1); // Convert minutes to seconds
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

 

// Format time as MM:SS
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};


  // Calculate the exam result
  const calculateResult = async () => {
    try {
      const correctAnswers = [];
      const wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      const verdict =
        correctAnswers.length >= examData.passingMarks ? "Pass" : "Fail";

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };

      setResult(tempResult);

      // Save report to the database
      dispatch(ShowLoading());
      const response = await addReport({
        exam: params.id,
        result: tempResult,
        user: user._id,
      });
      dispatch(HideLoading());

      if (response.success) {
        setView("result");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Start the timer
  const startTimer = () => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(interval);
  };

  useEffect(() => {
    if (timeUp) {
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center text-white">{examData.name}</h1>
        <div className="divider"></div>

        {view === "instructions" && (
          <Instructions
            examData={examData}
            setView={setView}
            startTimer={startTimer}
          />
        )}

        {view === "questions" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-2xl text-white">
                {selectedQuestionIndex + 1}:{" "}
                {questions[selectedQuestionIndex].name}
              </h1>
              <div className="timer">
                <span className="text-xl">Time Left :- {formatTime(secondsLeft)}</span>
              </div>

            </div>

            <div className="flex flex-col gap-2 text-white">
              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => (
                  <div
                    className={`flex gap-2 flex-col ${
                      selectedOptions[selectedQuestionIndex] === option
                        ? "selected-option"
                        : "option"
                    }`}
                    key={index}
                    onClick={() =>
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedQuestionIndex]: option,
                      })
                    }
                  >
                    <h1 className="text-xl text-white">
                      {option}:{" "}
                      {questions[selectedQuestionIndex].options[option]}
                    </h1>
                  </div>
                )
              )}
            </div>

            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button
                  className="primary-outlined-btn"
                  onClick={() =>
                    setSelectedQuestionIndex((prev) => prev - 1)
                  }
                >
                  Previous
                </button>
              )}

              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() =>
                    setSelectedQuestionIndex((prev) => prev + 1)
                  }
                >
                  Next
                </button>
              )}

              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    clearInterval(intervalId);
                    setTimeUp(true);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {view === "result" && (
          <div className="flex items-center mt-2 justify-center result">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">RESULT</h1>
              <div className="divider"></div>
              <div className="marks">
                <h1 className="text-md">Total Marks: {examData.totalMarks}</h1>
                <h1 className="text-md">
                  Obtained Marks: {result.correctAnswers.length}
                </h1>
                <h1 className="text-md">
                  Wrong Answers: {result.wrongAnswers.length}
                </h1>
                <h1 className="text-md">
                  Passing Marks: {examData.passingMarks}
                </h1>
                <h1 className="text-md">VERDICT: {result.verdict}</h1>

                <div className="flex gap-2 mt-2">
                  <button
                    className="primary-outlined-btn"
                    onClick={() => {
                      setView("instructions");
                      setSelectedQuestionIndex(0);
                      setSelectedOptions({});
                      setSecondsLeft(examData.duration * 60);
                    }}
                  >
                    Retake Exam
                  </button>
                  <button
                    className="primary-contained-btn"
                    onClick={() => setView("review")}
                  >
                    Review Answers
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "review" && (
          <div className="flex flex-col gap-2 ">
            {questions.map((question, index) => {
              const isCorrect =
                question.correctOption === selectedOptions[index];
              return (
                <div
                  className={`flex flex-col gap-1 bd p-2 ${
                    isCorrect ? "bg-success" : "bg-error"
                  }`}
                  key={index}
                >
                  <h1 className="text-xl">
                    {index + 1}: {question.name}
                  </h1>
                  <h1 className="text-md">
                    Submitted Answer: {selectedOptions[index]} -{" "}
                    {question.options[selectedOptions[index]]}
                  </h1>
                  <h1 className="text-md">
                    Correct Answer: {question.correctOption} -{" "}
                    {question.options[question.correctOption]}
                  </h1>
                  <h1 className="text-md">
                       Description: {question.description} ;
                  </h1>
                </div>
              );
            })}
            <div className="flex justify-center gap-2">
              <button
                className="primary-outlined-btn mt-2 "
                onClick={() => navigate("/home")}
              >
                Close
              </button>
              <button
                className="primary-outlined-btn mt-2"
                onClick={() => {
                  setView("instructions");
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                  setSecondsLeft(examData.duration * 60);
                }}
              >
                Retake Exam
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default WriteExam;
