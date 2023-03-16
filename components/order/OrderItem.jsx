import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { useContext, useState } from "react";
import ItemTemplate from "./ItemTemplate";
import CartContext from "../../contexts/CartContext";
import React from "react";
import FirebaseContext from "../../contexts/FirebaseContext";

const OrderItem = React.forwardRef(({ showReceipt }, ref) => {
  const [numOfItems, setNumOfItems] = useState(0);

  const { itemsList, setItemsList } = useContext(CartContext);
  const { currentUserDetails } = useContext(FirebaseContext);

  //set the total for the items bought
  const totalAmount = itemsList.reduce((accumulator, object) => {
    return accumulator + object.total;
  }, 0);

  return (
    <>
      <div ref={ref}>
        <h2
          className={
            showReceipt
              ? " text-lg font-semibold mb-2 mt-5"
              : " text-2xl font-bold mb-2 mt-5"
          }
        >
          {" "}
          {itemsList.length
            ? showReceipt
              ? `Milk Sale Ltd `
              : "Current Order"
            : null}{" "}
        </h2>
        {showReceipt ? (
          <p className="text-sm font-bold mb-4 ">
            Sales Completed Upon Generation of this Receipt
            <br />
            Mobile: **** *** *** <br />
          </p>
        ) : null}
        <ul className=" select-none ">
          {itemsList.length ? (
            itemsList.map((item, index) => (
              <ItemTemplate
                name={item.name}
                price={item.price}
                key={index}
                currentItem={item}
                showReceipt={showReceipt}
                clickedItem={item}
                itemIndex={index}
              />
            ))
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center text-lg  mt-96 ">
              <BsCart4 className="text-6xl text-custom-orange" />
              <p>Cart is Empty</p>
            </div>
          )}
          {showReceipt ? (
            <div className=" border-gray-600 border-t-2 border-b-2 border-dashed py-2 mt-8 ">
              <p>Subtotal Ksh. {totalAmount}</p>
            </div>
          ) : null}
          {showReceipt ? (
            <>
              <ul>
                {itemsList.map((item, index) => (
                  <li key={index}>{parseInt(numOfItems)}</li>
                ))}
              </ul>
              {/* {itemsList.length} */}
              <p className=" text-xs mt-5 ">
                You were Served by {currentUserDetails.firstname}
              </p>
              <p className="font-bold mt-1 text-xs py-0 px-1">
                Goods Once Sold Are NOT Returnable
              </p>
            </>
          ) : null}
        </ul>
      </div>
    </>
  );
});

export default OrderItem;
