import { useContext, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import CartContext from "../../contexts/CartContext";
const ItemTemplate = ({ name, price, currentItem }) => {
  const [numOfItems, setNumOfItems] = useState(1);

  const { itemsList, setItemsList } = useContext(CartContext);

  return (
    <>
      <li className="mt-1">
        <div className=" border-2 p-3 flex justify-between ">
          <div>
            <h3>{name}</h3>
            <h3>Ksh. {price}</h3>
          </div>
          <div className="flex items-center justify-center gap-3 font-bold text-xl ">
            <div
              className="p-1 hover:bg-orange-100 rounded-full cursor-pointer"
              onClick={() => {
                setNumOfItems((prev) => (prev > 1 ? prev - 1 : 1));
              }}
            >
              <AiOutlineMinus />
            </div>
            <p className="text-custom-orange">{numOfItems}</p>

            <div
              className="p-1 hover:bg-orange-100 rounded-full cursor-pointer"
              onClick={() => {
                setNumOfItems((prev) => prev + 1);
              }}
            >
              <GrAdd />
            </div>
            <div
              className="p-1 hover:bg-orange-100 rounded-full cursor-pointer text-red-500"
              onClick={() =>
                setItemsList(
                  itemsList.filter((item) => item.name !== currentItem.name)
                )
              }
            >
              <AiFillDelete />
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ItemTemplate;
