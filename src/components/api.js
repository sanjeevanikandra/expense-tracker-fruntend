import axios from 'axios';

export const fetchExpenses = async () => {
  const response = await axios.get('http://localhost:5000/api/expenses');
  return response.data;
};

export const addExpense = async (newExpense) => {
  const response = await axios.post('http://localhost:5000/api/expenses', newExpense);
  return response.data;
};

export const updateExpense = async (updatedExpense) => {
  const response = await axios.put(`http://localhost:5000/api/expenses/${updatedExpense._id}`, updatedExpense);
  return response.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`http://localhost:5000/api/expenses/${id}`);
};
