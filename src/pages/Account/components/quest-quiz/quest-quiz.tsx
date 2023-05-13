import { Typography, Button, FormLabel, FormControl, RadioGroup, Radio, FormControlLabel, Grid, Box, Paper } from '@mui/material';
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
        "Devs need to write the Smart Contract logic in a programing language called R1SC.",
        "Different zk-Rollup applications cannot interact with each other within the Layer 2 environment",
        "Devs need to write the Smart Contract logic in Vyper to build zk-Rollup Apps",
        "All of the above are correct",
        "Third answer is wrong"
      ],
      correctAnswer: "Third answer is wrong",
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

  const questionStyle = {
    marginBottom: '20px',
  }

  const titleStyle = {
    marginBottom: '20px',
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography style={titleStyle} variant="h5" component="h1">
            Quiz
          </Typography>
          <Grid container spacing={2} direction="column">
            {questions.map((question, index) => (
              <Grid item xs={12} key={index} sx={questionStyle}>
                <FormControl component="fieldset">
                  <Typography variant="h6" component="legend">
                    {index + 1}. {question.questionText}
                  </Typography>
                  <RadioGroup>
                    {question.options.map((option, optionIndex) => (
                      <FormControlLabel key={optionIndex} value={option} control={<Radio />} onChange={(event) => handleOptionChange(event, index)} label={option} />
                    ))}
                  </RadioGroup>
                </FormControl>
                {isCorrect[index] !== null && (
                  <Typography variant="subtitle2">{isCorrect[index] ? "Correct answer!" : question.afterHint ? question.afterHint : "Wrong answer."}</Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
      <Button style={btnStyle} disabled={disabledSubmit} variant='contained' onClick={checkAnswers}>Submit</Button>
    </Box>
  )
}

export default Quiz;
