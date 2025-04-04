import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function MortgageList() {
	const [mortgages, setMortgages] = useState([]);

	const fetchMortgages = async () => {
		try {
			const res = await axios.get('http://127.0.0.1:8000/api/mortgages/');
			setMortgages(res.data);
		} catch (error) {
			console.error('Error fetching mortgages', error);
		}
	};

	useEffect(() => {
		fetchMortgages();
	}, []);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://127.0.0.1:8000/api/mortgages/${id}/`);
			fetchMortgages();
		} catch (error) {
			console.error('Error deleting mortgage', error);
		}
	};

	return (
		<Box sx={{ m: 2 }}>
			<List>
				{mortgages.map((mortgage) => (
					<ListItem key={mortgage.id} secondaryAction={
						<IconButton edge="end" onClick={() => handleDelete(mortgage.id)}>
							<DeleteIcon />
						</IconButton>
					}>
						<ListItemText
							primary={`Mortgage ID: ${mortgage.id} | Credit Rating: ${mortgage.credit_rating}`}
							secondary={`Credit Score: ${mortgage.credit_score}, Loan Amount: ${mortgage.loan_amount}`}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
