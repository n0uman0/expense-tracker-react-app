const AppReducer =  (state, action) => {

    switch(action.type){
        case "DELETE_TRANSACTION" :
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case "ADD_TRANSACTION" :
            return {
                ...state,
                transactions: [action.payload , ...state.transactions]
            }
        case "UPDATE_TRANSACTION":
            state.transactions.filter(transaction => { 
                if(transaction.id === action.payload.id){
                    transaction.amount = action.payload.amount;
                    transaction.text =  action.payload.text;
                }
                return state.transactions;
            });

            return {
                ...state,
                transactions: [...state.transactions]
            }
        default:
            return state;
    }

}

export default AppReducer;