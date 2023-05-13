import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { OnboardingComponent, OnboardingComponentProps } from '../types';

const Onboarding: OnboardingComponent = ({
  onOnboardingComplete,
}: OnboardingComponentProps) => {
  return (
    <Box sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Gas Quest
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You're about to create a new blockchain account.<br />
          Quest wallet allows you to experience the power of web3 in a seamless way.<br />
          <br />
          Enjoy!
        </Typography>
      </CardContent>
      <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            size="large"
            variant="contained"
            onClick={() => onOnboardingComplete()}
          >
            Continue
          </Button>
        </Stack>
      </CardActions>
    </Box>
  );
};

export default Onboarding;
