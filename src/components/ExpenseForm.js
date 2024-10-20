import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import './Expense.css';

const ExpenseForm = ({ onAddExpense, onUpdateExpense, editExpenseData }) => {
    const [expense, setExpense] = useState({
        description: '',
        amount: '',
        date: '',
        category: '',
        paymentMethod: '',
    });

    const categories = ['Food', 'Transport', 'Utilities', 'Entertainment']; 
    const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Online Payment']; 

    // Function to format date to dd/mm/yyyy
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); 
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Function to convert dd/mm/yyyy to yyyy-MM-dd for backend
    const convertToBackendDate = (date) => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`; 
    };

    // Pre-fill the form for editing
    useEffect(() => {
        if (editExpenseData) {
            const formattedDate = formatDate(editExpenseData.date);
            setExpense({ ...editExpenseData, date: formattedDate });
        }
    }, [editExpenseData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // If the field is the date, set it in the dd/mm/yyyy format
        if (name === 'date') {
            setExpense({ ...expense, date: value });
        } else {
            setExpense({ ...expense, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const submittedExpense = {
            ...expense,
            amount: Number(expense.amount), 
            date: convertToBackendDate(expense.date), 
        };
    
        console.log('Submitted Expense:', submittedExpense); 
    
        try {
            if (expense._id) {
                await onUpdateExpense(submittedExpense);
            } else {
                await onAddExpense(submittedExpense);
            }
    
            // Reset the form
            setExpense({ description: '', amount: '', date: '', category: '', paymentMethod: '' });
        } catch (error) {
            console.error('Error submitting expense:', error.response?.data || error.message);
        }
    };
    
    return (
        <form className="formContainer" onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Description"
                        name="description"
                        value={expense.description}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Amount"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Date"
                        name="date"
                        type="text" 
                        value={expense.date}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={expense.category}
                            onChange={handleChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth required>
                        <InputLabel>Payment Method</InputLabel>
                        <Select
                            name="paymentMethod"
                            value={expense.paymentMethod}
                            onChange={handleChange}
                        >
                            {paymentMethods.map((method) => (
                                <MenuItem key={method} value={method}>
                                    {method}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={1}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        style={{ height: '100%' }} 
                    >
                        {expense._id ? 'Update' : 'Add'} Expense
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ExpenseForm;
