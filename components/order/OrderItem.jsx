import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { useContext, useState } from "react";
import ItemTemplate from "./ItemTemplate";
import CartContext from "../../contexts/CartContext";

const OrderItem = () => {
  const [numOfItems, setNumOfItems] = useState(1);

  const { itemsList } = useContext(CartContext);
  return (
    <>
      <h2 className=" text-2xl font-bold mb-2 mt-5">
        {" "}
        {itemsList.length ? "Current Order" : null}{" "}
      </h2>
      <ul className=" select-none ">
        {itemsList.length ? (
          itemsList.map((item, index) => (
            <ItemTemplate
              name={item.name}
              price={item.price}
              key={index}
              currentItem={item}
            />
          ))
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center text-lg  mt-96 ">
            <BsCart4 className="text-6xl text-custom-orange" />
            <p>Cart is Empty</p>
          </div>
        )}
      </ul>
    </>
  );
};

export default OrderItem;
