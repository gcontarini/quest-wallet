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
  const [showTxHash, setShowTxHash] = React.useState<boolean>(false);

  const handleSubmit = (isCorrect) => {
    if (isCorrect.every((answer) => answer === true)) {
      setIsCorrect(true)
    }
  }

  const afterSubmit = () => {
    setTimeout(() => {
      setShowTxHash(true);
    }, 5000);
  }

  return (
    <>
      <CardContent>
        {!isCorrect ?
          <>
            <Typography variant="h3" gutterBottom>
              Time to quest!
            </Typography>
            <Quiz onSubmit={handleSubmit}></Quiz>
          </>
          :
          <Typography variant="subtitle1" gutterBottom> You're ready to execute your transaction. </Typography>
        }
      </CardContent>
      <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
        <Stack spacing={2} sx={{ width: '80%' }}>
          {showTxHash ?
            <Button size="large" href="https://goerli.etherscan.io/tx/0xc4ea345da8e64d012d342686e932fbdbe788e96241787d5a23cbc42dfc8d0ca8">Check your tx!</Button>
            :
            isCorrect ?
              <Button
                disabled={!isCorrect && !loader}
                size="large"
                variant="contained"
                onClick={() => {
                  onComplete(transaction, undefined);
                  afterSubmit();
                  setLoader(true);
                }}
                sx={{
                  height: '32px', // set the fixed height for the button
                  position: 'relative', // set position to relative to contain the loader
                }}
              >
                {loader ? (
                  <CircularProgress
                    size={24}
                    color="info"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                ) : ("Send tx")}
              </Button>
              : null
          }
        </Stack>
      </CardActions>
    </>
  );
};

export default Transaction;
