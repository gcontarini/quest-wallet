import {
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { EthersTransactionRequest } from '../../../Background/services/provider-bridge';
import { TransactionComponentProps } from '../types';
import Quiz from '../quest-quiz';

const Transaction = ({
  transaction,
  onComplete,
  onReject,
}: TransactionComponentProps) => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false);

  const handleSubmit = (isCorrect) => {
    if (isCorrect.every((answer) => answer === true)) {
      setIsCorrect(true)
    }
  }
  return (
    <>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Time to quest!
        </Typography>
        <Quiz onSubmit={handleSubmit}></Quiz>
      </CardContent>
      <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            disabled={!isCorrect}
            size="large"
            variant="contained"
            onClick={() => {
              onComplete(transaction, undefined);
              setLoader(true);
              setTimeout(() => {
                setLoader(false);
              }, 2000);
            }}
          >
            Continue
            {loader && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Button>
        </Stack>
      </CardActions>
    </>
  );
};

export default Transaction;
