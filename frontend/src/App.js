import React, { useState } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import MortgageForm from './components/MortgageForm';
import MortgageList from './components/MortgageList';

function App() {
  const [ratingMessage, setRatingMessage] = useState('');

  const handleRatingCalculated = (rating) => {
    setRatingMessage(`Calculated Credit Rating: ${rating}`);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        RMBS Credit Rating Calculator
      </Typography>
      {ratingMessage && <Alert severity="info">{ratingMessage}</Alert>}
      <MortgageForm onRatingCalculated={handleRatingCalculated} onMortgageAdded={() => {}} />
      <MortgageList />
    </Container>
  );
}

export default App;
