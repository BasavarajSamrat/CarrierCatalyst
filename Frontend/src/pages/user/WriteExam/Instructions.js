import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-col gap-2 mt-1 p-1">
        <h1 className="text-2xl underline text-white mt-1 ">Instructions</h1>
        <li className="text-md mft-20 mt-1">
          Exam must be completed in {examData.duration / 60} minutes.
        </li>
        <li className="text-md mt-1">
          Exam will be submitted automatically after {examData.duration / 60}{" "}
          minutes.
        </li>
        <li className="text-md mt-1">
          Once submitted, you cannot change your answers.
        </li>
        <li className="text-md mt-1">Do not refresh the page.</li>
        <li className="text-md mt-1">
          You can use the <span className="font-bold">"Previous"</span> and{" "}
          <span className="font-bold">"Next"</span> buttons to navigate between
          questions.
        </li>
        <li className="text-md mt-1">
          Total marks of the exam is{" "}
          <span className="font-bold">{examData.totalMarks}</span>.
        </li>
        <li className="text-md mt-1">
          Passing marks of the exam is{" "}
          <span className="font-bold">{examData.passingMarks}</span>.
        </li>
      </ul>

      <div className="flex gap-2">
        <button
          className="primary-outlined-btn mt-2"
          onClick={() => navigate("/")}
        >
          CLOSE
        </button>
        <button
          className="primary-contained-btn mt-2"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}

export default Instructions;
