import Image from "next/image";
import rimula from "../../assets/rimula.jpeg";
import cow from "../../assets/cow.jpg";
import { BsCartPlusFill } from "react-icons/bs";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
const SingleProduct = ({ name, category, price, description, code }) => {
  //get the items in the Cart List
  const { itemsList, setItemsList } = useContext(CartContext);

  return (
    <>
      <div className="bg-white p-4 rounded-2xl flex flex-col cursor-pointer relative group overflow-hidden select-none">
        <Image src={cow} alt="product image" className="rounded-xl" />
        <h2 className="font-bold md:text-xl mt-1 text-gray-700 ">{name}</h2>
        <p className="text-gray-500">{code}</p>
        <h3 className="font-bold mt-1 text-custom-orange  ">Ksh. {price}</h3>
        <div
          className="absolute bg-custom-orange w-full left-0 -bottom-12 h-12 flex items-center
         justify-center gap-2 text-lg text-white font-bold rounded-b-2xl duration-[200ms]
         group-hover:bottom-0 
         group-hover:transition-top
         group-hover:duration-[200ms]      
         "
          onClick={() => {
            setItemsList([
              ...itemsList,
              {
                name: name,
                category: category,
                price: price,
                litres: "1",
                quantity: 1,
                total: 1,
              },
            ]);
            console.log(itemsList);
          }}
        >
          <BsCartPlusFill />
          add to cart
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
