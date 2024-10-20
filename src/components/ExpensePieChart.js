import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expenses, totalIncome }) => {
    // Calculate the total expenses by category
    const categoryTotals = {};

    expenses.forEach(expense => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    // Calculate total expenses
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    // Calculate remaining balance
    const remainingBalance = totalIncome - totalExpenses;

    // Update the chart data to include remaining balance
    const updatedChartData = {
        labels: [...Object.keys(categoryTotals), 'Remaining Balance'],
        datasets: [{
            data: [...Object.values(categoryTotals), remainingBalance],
            backgroundColor: [...['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'], 'gray'], 
        }],
    };

    return (
        <div className="pie-chart-wrapper">
            <div className="pie-chart-container">
                <h2 style={{ textAlign: 'center' }}>Expense Distribution</h2>
                <Pie data={updatedChartData} />
            </div>
        </div>
    );
};

export default ExpensePieChart;
