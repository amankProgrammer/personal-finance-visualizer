import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import MonthlyChart from '../components/MonthlyChart';
import { format } from 'date-fns';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      generateMonthlyData();
    }
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const generateMonthlyData = () => {
    const monthlyTotals = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthYear = format(date, 'MMM yyyy');
      
      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
      }
      
      monthlyTotals[monthYear] += parseFloat(transaction.amount);
    });

    const chartData = Object.keys(monthlyTotals).map(month => ({
      name: month,
      total: monthlyTotals[month]
    }));

    // Sort by date
    chartData.sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA - dateB;
    });

    setMonthlyData(chartData);
  };

  const handleSaveTransaction = async (data) => {
    try {
      if (transactionToEdit) {
        // Update existing transaction
        const response = await fetch('/api/transactions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: transactionToEdit._id, ...data })
        });

        if (response.ok) {
          setTransactionToEdit(null);
          fetchTransactions();
        }
      } else {
        // Add new transaction
        const response = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          fetchTransactions();
        }
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setTransactionToEdit(transaction);
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`/api/transactions?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Personal Finance Visualizer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <TransactionForm 
            transactionToEdit={transactionToEdit} 
            onSave={handleSaveTransaction} 
          />
          <TransactionList 
            transactions={transactions} 
            onEdit={handleEditTransaction} 
            onDelete={handleDeleteTransaction} 
          />
        </div>
        <div>
          <MonthlyChart data={monthlyData} />
        </div>
      </div>
    </div>
  );
}