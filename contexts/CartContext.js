import { createContext, useState } from "react";

const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const namesake = "Joshua";

  const [itemsList, setItemsList] = useState([
    {
      name: "Rimula Oil",
      price: 2000,
      category: "Lubricants",
    },
  ]);

  return (
    <CartContext.Provider value={{ namesake, itemsList, setItemsList }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
