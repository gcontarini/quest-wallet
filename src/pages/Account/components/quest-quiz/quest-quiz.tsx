import { Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const Quiz = ({ onSubmit }) => {
  const questions = [
    {
      questionText: "What is Cardano?",
      options: ["The moon", "Shiba Inu", "A blockchain platform", "A type of pasta"],
      correctAnswer: "A blockchain platform"
    },
    {
      questionText: "Who is the founder of Cardano?",
      options: ["Vitalik Buterin", "Charles Hoskinson", "Satoshi Nakamoto", "Elon Musk"],
      correctAnswer: "Charles Hoskinson"
    },
    {
      questionText: "What language was Cardano written in?",
      options: ["JavaScript", "Python", "Haskell", "C++"],
      correctAnswer: "Haskell"
    }
  ];

  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [isCorrect, setIsCorrect] = useState(Array(questions.length).fill(null));

  const checkAnswers = () => {
    const correctAnswers = questions.map((question) => question.correctAnswer);
    const newIsCorrect = selectedOptions.map((selectedOption, index) => selectedOption === correctAnswers[index]);
    setIsCorrect(newIsCorrect);
    onSubmit(newIsCorrect);
  }

  const handleOptionChange = (event, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  }

  const btnStyle = {
    'margin-top': '10px',
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <h1>{question.questionText}</h1>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOptions[index] === option}
                  onChange={(event) => handleOptionChange(event, index)}
                />
                {option}
              </label>
            </div>
          ))}
          {isCorrect[index] !== null && (
            <h2>{isCorrect[index] ? "Correct answer!" : "Wrong answer. Try again."}</h2>
          )}
        </div>
      ))}
      <button style={btnStyle} onClick={checkAnswers}>Submit</button>
    </div>
  );
}

export default Quiz;
