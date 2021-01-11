import React ,{useContext, useState} from 'react';
import { GlobalContext } from '../context/GlobalState'

export const AddTransaction = () => {

    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [response, setResponse] = useState('');

    const { addTransaction } = useContext(GlobalContext);

    const onSubmitTransaction = e => {
        e.preventDefault();
        setResponse('');

        if(+amount === 0){
            setResponse("error");
            return false;
        }

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: +amount
        }

        addTransaction(newTransaction);
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmitTransaction}>
                <div className="form-control">
                    <label htmlFor="text">Description</label>
                    <input required type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br /> (negative - expense, positive - income)</label>
                    <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <div className={response}>{response ? "Amount should be lesser or greater than 0" : ""}</div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}