import React from 'react';
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const TransactionList = ({ transactions, onEdit, onDelete }) => {
	return (
		<div className="mt-4 p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-xl font-semibold mb-4">Transactions</h2>
			{transactions.length === 0 ? (
				<p className="text-gray-500">No transactions found.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{transactions.map((tx) => (
								<tr key={tx._id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
										{tx.date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
										{tx.description}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
										{parseFloat(tx.amount).toFixed(2)} Rs
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<Button
											onClick={() => onEdit(tx)}
											variant="outline"
											size="sm"
											className="mr-2 text-gray-900 hover:text-blue-800 hover:bg-blue-300"
										>
											Edit
										</Button>
										<Button
											onClick={() => onDelete(tx._id)}
											variant="outline"
											size="sm"
											className="mr-2 text-gray-900 hover:text-red-800 hover:bg-red-300"
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default TransactionList;