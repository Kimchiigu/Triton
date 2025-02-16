import { useState, useEffect } from 'react';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '@/declarations/icrc1_ledger_canister';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

export default function Transaction() {
  const [balance, setBalance] = useState<number | null>(null);
  const [principal, setPrincipal] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const getUserPrincipal = async (): Promise<Principal> => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    return identity.getPrincipal();
  };

  const getUserActor = async () => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();

    const canisterId = process.env.CANISTER_ID_ICRC1_LEDGER_CANISTER;
    if (!canisterId) {
      throw new Error('Canister ID is missing! Check your .env file.');
    }

    const agent = new HttpAgent({ identity });
    await agent.fetchRootKey();

    return Actor.createActor(idlFactory, {
      agent,
      canisterId: canisterId as string,
    });
  };

  const fetchBalance = async () => {
    try {
      const userPrincipal = await getUserPrincipal();
      setPrincipal(userPrincipal.toText());

      const userActor = await getUserActor();
      const balanceResult = await userActor.icrc1_balance_of({
        owner: userPrincipal,
        subaccount: [],
      });

      setBalance(Number(balanceResult) / 100_000_000);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleTransfer = async () => {
    try {
      if (!recipient || !amount) {
        setMessage('Please enter recipient and amount.');
        return;
      }

      if (balance === null) {
        setMessage('Balance is still loading. Please try again.');
        return;
      }

      const senderPrincipal = await getUserPrincipal();
      console.log('Current Sender Principal:', senderPrincipal.toText());

      const recipientPrincipal = Principal.fromText(recipient);
      const transferAmount = BigInt(Number(amount) * 100_000_000);
      const TRANSFER_FEE = BigInt(10000);

      const currentBalance = BigInt(Number(balance) * 100_000_000);
      const requiredBalance = transferAmount + TRANSFER_FEE;

      if (currentBalance < requiredBalance) {
        const maxSendable =
          (currentBalance - TRANSFER_FEE) / BigInt(100_000_000);
        setMessage(
          `Insufficient balance! Try sending ${maxSendable.toString()} TRTK.`,
        );
        return;
      }

      setMessage('Processing transaction...');

      const userActor = await getUserActor();

      const transferResult: any = await userActor.icrc1_transfer({
        from_subaccount: [],
        to: { owner: recipientPrincipal, subaccount: [] },
        amount: transferAmount,
        fee: [TRANSFER_FEE],
        memo: [],
        created_at_time: [],
      });

      console.log('Transfer Result:', transferResult);

      if (transferResult.Err) {
        setMessage(
          `Transfer failed: ${JSON.stringify(
            transferResult.Err,
            (key, value) =>
              typeof value === 'bigint' ? value.toString() : value,
          )}`,
        );
      } else if (transferResult.Ok) {
        setMessage(
          `Transaction successful! Tx ID: ${transferResult.Ok.toString()}`,
        );
        setTimeout(() => {
          fetchBalance();
        }, 2000);
      }
    } catch (error) {
      console.error('Transfer error:', error);
      setMessage('Transfer failed. Check console for details.');
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">ICRC-1 Ledger</h1>
        <p className="text-sm mb-2">
          <strong>Your Principal:</strong> {principal}
        </p>
        <p className="text-lg font-semibold mb-4">
          Balance: {balance !== null ? `${balance} Tokens` : 'Loading...'}
        </p>
        <button
          onClick={fetchBalance}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Refresh Balance
        </button>
        <h2 className="text-xl font-semibold mt-6">Transfer Tokens</h2>
        <div className="space-y-3 mt-2">
          <input
            type="text"
            placeholder="Recipient Principal"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleTransfer}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Transfer
          </button>
        </div>
        {message && (
          <p className="mt-4 text-sm text-center text-gray-300">{message}</p>
        )}
      </div>
    </div>
  );
}
