import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';

interface Transaction {
  to: string;
  fee: number[];
  memo: number[];
  from_subaccount: string[];
  created_at_time: number[];
  amount: number;
}

export default function TransactionList() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const organization = location.state?.organization;

  // TODO FETCH TRANSACTION DATA
  useEffect(() => {
    fetch('/public/temp_db/mockTransaction.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredTransactions = data.transactions.filter(
          (tx: Transaction) => tx.to === id,
        );
        setTransactions(filteredTransactions);
      })
      .catch((error) => console.error('Error loading transactions:', error));
  }, [id]);

  if (!organization) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold">Organization not found!</p>
        <Button onClick={() => navigate('/')} className="mt-4 px-6 py-3">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 rounded-md"
      >
        ← Back
      </button>
      <h2 className="text-4xl font-bold mt-6">
        {organization.name} - Transactions
      </h2>

      {transactions.length > 0 ? (
        <div className="mt-6 space-y-4">
          {transactions.map((tx, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg">
                <strong>Amount:</strong> {tx.amount} Tokens
              </p>
              {tx.fee.length > 0 && (
                <p className="text-gray-600">
                  <strong>Fee:</strong> {tx.fee[0]} Tokens
                </p>
              )}
              {tx.memo.length > 0 && (
                <p className="text-gray-600">
                  <strong>Memo:</strong> {tx.memo[0]}
                </p>
              )}
              {tx.from_subaccount.length > 0 && (
                <p className="text-gray-600">
                  <strong>From Subaccount:</strong> {tx.from_subaccount[0]}
                </p>
              )}
              {tx.created_at_time.length > 0 && (
                <p className="text-gray-600">
                  <strong>Created At:</strong>{' '}
                  {new Date(tx.created_at_time[0] * 1000).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-lg text-gray-600">No transactions found.</p>
      )}
    </div>
  );
}
