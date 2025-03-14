

import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

import { getUserInfo } from "../../../apicalls/users";

function First() {
  const [name, setName] = useState(null);
  
  const getUserData = async () => {
    try {
      
      const response = await getUserInfo();
      console.log(response);
     
      if (response.success) {
        const capitalized = response.data.name
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" "); 
        setName(capitalized);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } 
  }, []);


  return (
    <div className="bg-first">
      <Navbar />
     
        <div className="mft-20 p-2">
          <span className="text-purple text-2xl p-1 mt-2">
            Welcome <span className="text-purple text-2xl p-1">{name},</span>
          </span>

          <div className="p-4">
            <p className="text-xl text-white">
              What is an aptitude test in recruitment?
            </p>
            <p className="text-white text-lg">
              An aptitude test is an assessment designed to evaluate a person's
              potential to excel in a specific task by assessing their natural
              abilities and skills rather than their acquired knowledge.
            </p>
          </div>
        </div>
    
      <h2 className="text-center mt-3 text-2xl p-2 text-purple">
        Types Of Aptitude Interview Questions
      </h2>
      <div className="mft-50 mt-3 text-white text-md flex gap-100 tf">
        <div className="bd p-2">
          <p className="text-xl">Numerical Ability</p>
          <p>
            This focuses on a candidate's ability to work with numbers and
            mathematical concepts, including arithmetic, percentages, ratios,
            and number sequences.
          </p>
        </div>

        <div className="bd p-2">
          <p className="text-xl">Logical/Abstract Reasoning</p>
          <p>
            This evaluates the ability to think logically, analyze patterns, and
            solve problems involving shapes, numbers, and symbols, usually in
            the form of puzzles and series.
          </p>
        </div>

        <div className="bd p-2">
          <p className="text-xl">Verbal Ability</p>
          <p>
            This category tests the candidate’s proficiency in understanding and
            reasoning using concepts framed in words. It includes reading
            comprehension, synonyms, antonyms, and grammar-based questions.
          </p>
        </div>
      </div>
      <div className="text-white text-center text-lg p-5">
        <h2 className="text-white mt-2 text-2xl p-5">
          Tips For Preparing For An Aptitude Interview Test
        </h2>
        <div className="p-5 bd mt-2">
          <h3 className="text-purple mt3 text-xl">
            Read the question carefully:
          </h3>
          <p>
            Before answering the question, read them carefully. Some aptitude
            questions only require you to use some basic logic.
          </p>
        </div>
        <div className="p-5 bd mt-2">
          <h3 className="text-purple text-xl">Manage your time: </h3>
          <p>
            Usually, employers expect candidates to complete aptitude tests in a
            fixed time frame. So, when solving aptitude questions, use the time
            available and try answering as many questions as you can.
          </p>
        </div>
        <div className="p-5 bd mt-2">
          <h3 className="text-purple text-xl">
            Be careful about trap questions:
          </h3>
          <p>
            Employers often include many trap questions in the aptitude test to
            test a candidate's skills. So, carefully read the questions and
            answer them only when confident.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default First;
