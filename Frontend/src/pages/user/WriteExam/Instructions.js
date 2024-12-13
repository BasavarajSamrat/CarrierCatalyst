import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-col gap-2">
        <h1 className="text-2xl underline text-white mt-1">Instructions</h1>
        <li className="text-md mft-20">Exam must be completed in {examData.duration} secons.</li>
        <li className="text-md">
          Exam will be submitted automatically after {examData.duration}{" "}
          seconds.
        </li>
        <li className="text-md">Once submitted, you cannot change your answers.</li>
        <li className="text-md">Do not refresh the page.</li>
        <li className="text-md">
          You can use the <span className="font-bold">"Previous"</span> and{" "}
          <span className="font-bold">"Next"</span> buttons to navigate between
          questions.
        </li>
        <li className="text-md">
          Total marks of the exam is{" "}
          <span className="font-bold">{examData.totalMarks}</span>.
        </li>
        <li className="text-md">
          Passing marks of the exam is{" "}
          <span className="font-bold">{examData.passingMarks}</span>.
        </li>
      </ul>

      <div className="flex gap-2">
        <button className="primary-outlined-btn mt-2"
         onClick={()=>navigate('/')}
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
