import { useContext, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import CartContext from "../../contexts/CartContext";
const ItemTemplate = ({
  name,
  price,
  currentItem,
  showReceipt,
  clickedItem,
  itemIndex,
  amount,
}) => {
  const [numOfItems, setNumOfItems] = useState(1);

  const { itemsList, setItemsList } = useContext(CartContext);

  //set variable for showing receipt
  // const [showReceipt, setShowReceipt] = useState(true);

  const updateState = () => {
    const newState = itemsList.map((obj, index) => {
      // 👇️ if id equals 2, update country property
      if (index === itemIndex) {
        return {
          ...obj,
          total: numOfItems * price,
        };
      }

      // 👇️ otherwise return the object as is
      return obj;
    });

    setItemsList(newState);
    // alert("updated item");
  };

  return (
    <>
      <li className="mt-1">
        <div
          className={
            showReceipt
              ? " border-b-[.06em] p-[.5] flex justify-between text-sm"
              : " border-2 p-3 flex justify-between "
          }
        >
          <div>
            <h3>{name}</h3>
            <h3 className="flex justify-between gap-2">
              <span>
                Ksh. {price} x {numOfItems}
              </span>
              <span> {price * numOfItems}</span>
            </h3>
          </div>
          <div className="flex items-center justify-center gap-3 font-bold text-xl ">
            {showReceipt ? null : (
              <>
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
                    updateState();
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
              </>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default ItemTemplate;
