import { createContext, useState } from "react";

const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const namesake = "Joshua";

  const [itemsList, setItemsList] = useState([]);

  return (
    <CartContext.Provider value={{ itemsList, setItemsList }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
