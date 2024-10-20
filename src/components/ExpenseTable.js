import React, { useState, useEffect } from 'react';
import IncomeDisplay from './IncomeDisplay';
import './Expense.css';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
    const [filterType, setFilterType] = useState(''); 
    const [selectedCategory, setSelectedCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState(0); 
    
    // Get unique categories from expenses
    const uniqueCategories = [...new Set(expenses.map(expense => expense.category))];

    // Fetch income from localStorage when the component mounts
    useEffect(() => {
        const savedIncome = localStorage.getItem('monthlyIncome');
        if (savedIncome) {
            setMonthlyIncome(parseFloat(savedIncome)); 
        }
    }, []);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const convertToBackendDate = (date) => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    };

    // Filter expenses by date range
    const filterByDateRange = (expense) => {
        if (!startDate || !endDate) return true;
        const expenseDate = new Date(expense.date);
        const start = new Date(convertToBackendDate(startDate));
        const end = new Date(convertToBackendDate(endDate));
        return expenseDate >= start && expenseDate <= end;
    };

    // Filter expenses based on category or date range
    let filteredExpenses = expenses.filter(expense => {
        if (filterType === 'category' && selectedCategory) {
            return expense.category === selectedCategory;
        } else if (filterType === 'dateRange') {
            return filterByDateRange(expense);
        }
        return true;
    });

    // Sort the filtered expenses by date (newest first)
    filteredExpenses = filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Clear filters and reset table
    const clearFilters = () => {
        setFilterType('');
        setSelectedCategory('');
        setStartDate('');
        setEndDate('');
    };

    const totalExpense = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    return (
        <>
            {/* Income Display */}
            <IncomeDisplay className="incomeDisplaytable" monthlyIncome={monthlyIncome} setMonthlyIncome={setMonthlyIncome} totalUnfilteredExpense={expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0)} />

            {/* Filter Section */}
            <div className="filter-container">
    <div className="filter-item">
        <label>Filter By:</label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Select</option>
            <option value="category">Category</option>
            <option value="dateRange">Date Range</option>
        </select>
    </div>

    {/* Category Dropdown */}
    {filterType === 'category' && (
        <div className="filter-item">
            <label>Select Category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All</option>
                {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    )}

    {/* Date Range Inputs */}
    {filterType === 'dateRange' && (
        <>
            <div className="filter-item">
                <label>Start Date:</label>
                <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="dd/mm/yyyy"
                />
            </div>
            <div className="filter-item">
                <label>End Date:</label>
                <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="dd/mm/yyyy"
                />
            </div>
        </>
    )}

    <div className="filter-item">
        <button onClick={clearFilters}>Clear Filter</button>
    </div>
</div>


            {/* Expense Table */}
            <div className="table-container">
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {filteredExpenses.map((expense) => (
                <tr key={expense._id}>
                    <td>{formatDate(expense.date)}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>₹{expense.amount}</td>
                    <td>{expense.paymentMethod}</td>
                    <td>
                        <span className="icon edit-icon" onClick={() => onEdit(expense)} title="Edit">
                            ✏️
                        </span>
                        <span className="icon delete-icon" onClick={() => onDelete(expense._id)} title="Delete">
                            <i className="fas fa-trash-alt"></i>
                        </span>
                    </td>
                </tr>
            ))}
            <tr>
                <td colSpan={3}><strong>Total</strong></td>
                <td><strong>₹{totalExpense.toFixed(2)}</strong></td>
                <td colSpan={2}></td>
            </tr>
        </tbody>
    </table>
</div>

            
        </>
    );
};

export default ExpenseTable;
