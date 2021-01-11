import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Popup from './Popup';

export const Transaction = ({transaction}) => {

    const [text, setText] = useState(transaction.text);
    const [amount, setAmount] = useState(transaction.amount);

    const sign = transaction.amount < 0 ? "-" : "+";
    const {deleteTransaction, updateTransaction} = useContext(GlobalContext);
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const togglePopup = () =>{
        setPopupIsOpen(!popupIsOpen);
    }

    const onUpdateSubmit = (e) => {

        e.preventDefault();

        const updatedTransaction = {

            id: transaction.id,
            text,
            amount: +amount

        }

        updateTransaction(updatedTransaction);
        togglePopup();

    }

    const getPopupContent = () => {
        return(
            <form onSubmit={onUpdateSubmit}>
                <div className="form-control">
                <label htmlFor="text">Text</label>
                <input required type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                <label htmlFor="amount">Amount <br /> (negative - expense, positive - income)</label>
                <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Update transaction</button>
            </form>
        ) 
    }

    return(
        <>
        <li className={transaction.amount < 0 ? "minus" : "plus"}>
            {transaction.text} <span>{sign}{Math.abs(transaction.amount)}</span><button onClick={()=> deleteTransaction(transaction.id)} className="delete-btn">x</button><button onClick={()=>togglePopup()} className="edit-btn">edit</button>
        </li>
        {popupIsOpen ? <Popup content={getPopupContent()} handleClose={togglePopup}/> : ""}
        </>
    );

}