import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Link } from 'react-router-dom';
// import './First.css'
function First() {
  return (
    <div className="bg-first">
      <Navbar />
      <div className="div parent text-white  bg-first p- text-mdx">
        <div className="p-5 text-md text-center">
          {" "}
          <p className="text-white text-xl moving-tag">
            Welcome to CarrierCatalyst{" "}
          </p>
          <p>
            Practice aptitude tests and prepare for your interviews with our
            platform.
          </p>
        </div>

        <div className="text-white bg-mix">
          <div className="flex bd justify-between hpx-700 mt-10 tf">
            <div className=" w-50 text-md p-5 mft-80">
              <p className="text-xl ">
                What is an aptitude test in recruitment?
              </p>
              <p>
                An aptitude test is an assessment that is designed to evaluates
                a person's potential to excel in a specific task by assessing
                their natural abilities and skills rather than their acquired
                knowledge.{" "}
              </p>
              <p>
                Online aptitude tests are mainly used by organizations in their
                hiring process and these tests are also helpful for L&D
                programs..
              </p>
              <div className="w-25% mft-80 p-2">
                <Link className="bd p-2 text-lg text" to="/login">
                  Get started
                </Link>
              </div>
            </div>
            <div className="img-div mt-50">
              <img src="/assets/boy.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <h2 className=" text-center mt-3 text-2xl p-5 text-purple">
        Types Of Aptitude Interview Questions
      </h2>

      <div className="mft-50 mt-3  text-white text-md flex gap-100 tf">
        <div className=" bd p-2">
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
            Read the question carefully:{" "}
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
          {" "}
          <h3 className="text-purple  text-xl">
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
