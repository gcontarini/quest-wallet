import { Paper, Stack, Typography, Button } from '@mui/material';
import React, { useState } from 'react';

const Quiz = ({ onSubmit }) => {
  const questions = [
    {
      questionText: "Is zk-Rollup considered a promising scaling solution for Ethereum?",
      options: ["Yes", "No"],
      correctAnswer: "Yes",
      afterHint: "By bundling transactions and providing a succinct proof, ZK Rollups offer significant scalability benefits."
    },
    {
      questionText: "What is the main limitation of zk-Rollup that hinders the development of general-purpose DApps",
      options: [
        "A) Devs need to write the Smart Contract logic in a programing language called R1SC.",
        "B) Different zk-Rollup applications cannot interact with each other within the Layer 2 environment",
        "C) Devs need to write the Smart Contract logic in Vyper to build zk-Rollup Apps",
        "A & B are correct",
        "A, B & C are correct"
      ],
      correctAnswer: "C) Devs need to write the Smart Contract logic in Vyper to build zk-Rollup Apps",
      afterHint: ""
    },
    {
      questionText: "Scroll collaborates closely with the Ethereum Foundation to find the best way to implement the EVM circuit",
      options: ["True", "False"],
      correctAnswer: "True",
      afterHint: "Scroll's zkEVM can provide the same experience for developers and users. It’s order of magnitudes cheaper without sacrificing security. "
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [isCorrect, setIsCorrect] = useState(Array(questions.length).fill(null));
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const checkAnswers = () => {
    const correctAnswers = questions.map((question) => question.correctAnswer);
    const newIsCorrect = selectedOptions.map((selectedOption, index) => selectedOption === correctAnswers[index]);
    setIsCorrect(newIsCorrect);
    if (newIsCorrect.every((answer) => answer === true)) {
      setDisabledSubmit(true);
    }
    onSubmit(newIsCorrect);
  }

  const handleOptionChange = (event, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  }

  const btnStyle = {
    marginTop: '10px',
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
            <h2>{isCorrect[index] ? "Correct answer!" : question.afterHint ? question.afterHint : "Wrong answer."}</h2>
          )}
        </div>
      ))}
      <Button style={btnStyle} disabled={disabledSubmit} variant='contained' onClick={checkAnswers}>Submit</Button>
    </div>
  );
}

export default Quiz;
