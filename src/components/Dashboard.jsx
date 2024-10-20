import React, { useState, useEffect } from 'react';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from './api';
import ExpenseForm from './ExpenseForm';
import Header from './Header';
import ExpenseTable from './ExpenseTable';
import ExpensePieChart from './ExpensePieChart';
import Footer from './Footer';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [editExpenseData, setEditExpenseData] = useState(null);
  
    useEffect(() => {
      async function loadExpenses() {
        const data = await fetchExpenses();
        setExpenses(data);
      }
      loadExpenses();
    }, []);
  
    // Add Expense
    const handleAddExpense = async (newExpense) => {
      const addedExpense = await addExpense(newExpense);
      setExpenses([...expenses, addedExpense]);
    };
  
    // Update Expense
    const handleUpdateExpense = async (updatedExpense) => {
      const expenseData = await updateExpense(updatedExpense);
      setExpenses(expenses.map(exp => exp._id === expenseData._id ? expenseData : exp));
    };
  
    // Delete Expense
    const handleDeleteExpense = async (id) => {
      await deleteExpense(id);
      setExpenses(expenses.filter(exp => exp._id !== id));
    };
  
    useEffect(() => {
      const savedIncome = localStorage.getItem('monthlyIncome');
      if (savedIncome) {
        setMonthlyIncome(parseFloat(savedIncome)); 
      }
    }, []);
  return (
    <div className='dashbordBackgornd'>
      
      <Header />
      <ExpenseForm
        onAddExpense={handleAddExpense}
        onUpdateExpense={handleUpdateExpense}
        editExpenseData={editExpenseData}
      />
      <ExpenseTable
        expenses={expenses}
        onEdit={setEditExpenseData}
        onDelete={handleDeleteExpense}
      />
      <ExpensePieChart expenses={expenses} totalIncome={monthlyIncome} />
      <Footer/>

    </div>
  )
}

export default Dashboard
