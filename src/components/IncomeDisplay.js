import React, { useEffect, useState } from 'react';
import './Expense.css';

const IncomeDisplay = ({ monthlyIncome, setMonthlyIncome, totalUnfilteredExpense }) => {
    const [showIncomeInput, setShowIncomeInput] = useState(false); 

    // Fetch income from localStorage when the component mounts
    useEffect(() => {
        const savedIncome = localStorage.getItem('monthlyIncome');
        if (savedIncome) {
            setMonthlyIncome(parseFloat(savedIncome)); 
        }
    }, [setMonthlyIncome]);

    // Function to save income to localStorage and update state
    const handleSaveIncome = () => {
        localStorage.setItem('monthlyIncome', monthlyIncome); 
        setShowIncomeInput(false); // Hide input field
    };

    // Calculate remaining balance
    const remainingBalance = monthlyIncome - totalUnfilteredExpense;

    return (
        <div className="income-display-container">
            {/* Income Display Table */}
            <table className="income-table">
                <thead>
                    <tr>
                        <th>Total Income</th>
                        <th>Total Expenses</th>
                        <th>Remaining Balance</th>
                        <th>
                            <button
                                className="btn"
                                onClick={() => setShowIncomeInput(!showIncomeInput)}
                            >
                                {showIncomeInput ? 'Cancel' : 'Add Income'}
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>₹{monthlyIncome.toFixed(2)}</td>
                        <td>₹{totalUnfilteredExpense.toFixed(2)}</td>
                        <td>₹{remainingBalance.toFixed(2)}</td>
                        <td>
                            {showIncomeInput && (
                                <div className="input-container">
                                    <input
                                        type="number"
                                        value={monthlyIncome}
                                        onChange={(e) => setMonthlyIncome(parseFloat(e.target.value))}
                                        className="input-income"
                                    />
                                    <button className="btn" onClick={handleSaveIncome}>
                                        Save Income
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default IncomeDisplay;
