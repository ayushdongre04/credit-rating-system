import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Alert } from '@mui/material';
import axios from 'axios';

const initialFormState = {
	credit_score: '',
	loan_amount: '',
	property_value: '',
	annual_income: '',
	debt_amount: '',
	loan_type: 'fixed',
	property_type: 'single_family',
};

export default function MortgageForm({ onMortgageAdded, onRatingCalculated }) {
	const [formData, setFormData] = useState(initialFormState);
	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validate = () => {
		if (formData.credit_score < 300 || formData.credit_score > 850) {
			return 'Credit score must be between 300 and 850';
		}
		// Add additional validations for positive numbers etc.
		return '';
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}
		setError('');
		try {
			// Submit the form to the backend
			const response = await axios.post('http://127.0.0.1:8000/api/mortgages/', formData);
			// Response should include the calculated rating
			onRatingCalculated(response.data.credit_rating);
			onMortgageAdded(response.data);
			setFormData(initialFormState);
		} catch (err) {
			setError('Failed to submit mortgage data.');
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ m: 2 }}>
			{error && <Alert severity="error">{error}</Alert>}
			<TextField
				label="Credit Score"
				name="credit_score"
				type="number"
				value={formData.credit_score}
				onChange={handleChange}
				required
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Loan Amount"
				name="loan_amount"
				type="number"
				value={formData.loan_amount}
				onChange={handleChange}
				required
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Property Value"
				name="property_value"
				type="number"
				value={formData.property_value}
				onChange={handleChange}
				required
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Annual Income"
				name="annual_income"
				type="number"
				value={formData.annual_income}
				onChange={handleChange}
				required
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Debt Amount"
				name="debt_amount"
				type="number"
				value={formData.debt_amount}
				onChange={handleChange}
				required
				fullWidth
				margin="normal"
			/>
			<TextField
				select
				label="Loan Type"
				name="loan_type"
				value={formData.loan_type}
				onChange={handleChange}
				fullWidth
				margin="normal"
			>
				<MenuItem value="fixed">Fixed</MenuItem>
				<MenuItem value="adjustable">Adjustable</MenuItem>
			</TextField>
			<TextField
				select
				label="Property Type"
				name="property_type"
				value={formData.property_type}
				onChange={handleChange}
				fullWidth
				margin="normal"
			>
				<MenuItem value="single_family">Single Family</MenuItem>
				<MenuItem value="condo">Condo</MenuItem>
			</TextField>
			<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
				Submit Mortgage
			</Button>
		</Box>
	);
}
