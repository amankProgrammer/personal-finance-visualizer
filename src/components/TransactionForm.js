import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TransactionForm = ({ transactionToEdit, onSave }) => {
	const [amount, setAmount] = useState('');
	const [date, setDate] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (transactionToEdit) {
			setAmount(transactionToEdit.amount.toString());
			setDate(transactionToEdit.date);
			setDescription(transactionToEdit.description);
		} else {
			setAmount('');
			setDate('');
			setDescription('');
		}
	}, [transactionToEdit]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if(!amount || !date || !description) return;
		const data = { 
			amount: parseFloat(amount), 
			date, 
			description 
		};
		onSave(data);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-lg font-semibold">{transactionToEdit ? 'Edit' : 'Add'} Transaction</h2>
			<div className="space-y-2">
				<Label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount</Label>
				<Input
					id="amount"
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
					min="0"
					step="0.01"
					placeholder="Amount"
					className="w-full"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="date" className="text-sm font-medium text-gray-700">Date</Label>
				<Input
					id="date"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					required
					className="w-full"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
				<Input
					id="description"
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
					placeholder="Description"
					className="w-full"
				/>
			</div>
			<Button type="submit" className="w-full">{transactionToEdit ? 'Update' : 'Add'} Transaction</Button>
		</form>
	);
};

export default TransactionForm;