import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
      const item = state.items.find(
        (item) => item.id === action.item.id
        );

        let updatedItems;
        
        if(item){
          item.amount++;
          updatedItems = [...state.items];
        } else{
          updatedItems = state.items.concat(action.item); 
        }

        const updatedTotalAmount =  state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'REMOVE') {

    const item = state.items.find(
      (item) => item.id === action.id
      );

      let updatedItems;
 
      if(item.amount === 1){
        item.amount--;
        updatedItems = state.items.filter(item =>item.id !== action.id)
      }else{
        item.amount--;
        updatedItems = [...state.items]; 
      }
      const updatedTotalAmount =  state.totalAmount - item.price;
      
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id:id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
