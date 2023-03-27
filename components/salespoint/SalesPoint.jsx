import OrderItem from "../order/OrderItem";
import SingleProduct from "../order/SingleProduct";
import { BsCartPlusFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  forwardRef,
} from "react";
import CartContext from "../../contexts/CartContext";
import FirebaseContext from "../../contexts/FirebaseContext";
import { db } from "../../Firebase/FIREBASE";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";

import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";

const SalesPoint = () => {
  const { itemsList } = useContext(CartContext);
  const { signOut, currentUserDetails } = useContext(FirebaseContext);

  //fetch products from the database
  const [products, setProducts] = useState([]);

  //set variable for showing receipt
  const [showReceipt, setShowReceipt] = useState(false);

  //get all the shops
  const fetchProducts = useRef(false);

  useEffect(() => {
    console.log(`allproducts/${currentUserDetails.shopid}/products`);
    if (currentUserDetails.shopid) {
      if (fetchProducts.current) return;
      fetchProducts.current = true;
      const subscriber = getDocs(
        collection(db, `allproducts/${currentUserDetails.shopid}/products`)
      ).then((snapshot) => {
        snapshot.forEach((doc) => {
          setProducts((products) =>
            products.concat({
              productname: doc.data().productname,
              description: doc.data().description,
              price: doc.data().price,
              litres: "1",
              quantity: 1,

              code: doc.data().code,
              id: doc.id,
            })
          );
        });
      });
      return () => subscriber;
    } else {
      console.log("user details empty");
    }
  }, [currentUserDetails]);

  //variables for implementing search

  const [query, setQuery] = useState("");

  //define the search function
  const filteredData = useMemo(
    () =>
      products.filter(
        (item) =>
          item.productname.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      ),
    [products, query]
  );

  //get router for user navigation
  const router = useRouter();

  //add the useRef for the printing panel
  const componentRef = useRef();

  useEffect(() => {
    if (currentUserDetails.type === "admin") {
      router.push("/dashboard");
    } else {
      console.log("signed in!");
    }
  }, [currentUserDetails]);

  if (!currentUserDetails) {
    // user is signed out or still being checked.
    // don't render anything
    return null;
  }

  return (
    <>
      <div className="flex px-6 py-3 bg-custom-gray relative ">
        <div className=" ">
          <div className="flex items-center justify-between w-4/5 pr-12 relative  ">
            <div className=" px-12 ">
              <h2 className="text-3xl font-semibold">
                {" "}
                👋 Hello, {currentUserDetails.firstname}
              </h2>
              <p className="text-xl">Let&apos;s do some sales</p>
            </div>
            <div className="bg-white w-96  p-4 text-xl flex items-center gap-6 rounded-lg ">
              <BsSearch className="text-gray-500" />
              <input
                type="text"
                className=" outline-none "
                placeholder="search product"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            <div
              className=" text-3xl w-32 h-16  relative   text-custom-orange
             cursor-pointer group overflow-hidden"
            >
              <div className="absolute right-0">
                <AiOutlineUser />
              </div>
              <div
                className="bg-white rounded-xl w-32  text-sm  py-1 px-5 absolute top-16  left-0   duration-[200ms]
               z-50  font-bold  flex items-center gap-1
               group-hover:top-8 
               group-hover:transition-top 
               group-hover:duration-[200ms] 
            
               "
                onClick={async () => {
                  try {
                    await signOut();
                    router.push("/login");
                  } catch (error) {
                    alert("Operation failed. Try again");
                  }
                }}
              >
                Sign Out <AiOutlineArrowRight className="text-xl" />
              </div>
            </div>
          </div>
          <div
            className="w-4/5 grid grid-cols-5 gap-4 px-12 py-12
         md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 
        
         "
          >
            {/* {products.length} */}
            {filteredData.map((item, index) => (
              <SingleProduct
                name={item.productname}
                category={item.category}
                description={item.description}
                price={item.price}
                code={item.code}
                key={index}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="w-1/5 fixed right-0 top-0 h-full p-3 bg-white ">
            <div className="h-full relative">
              {/* <OrderItem /> */}
              <OrderItem ref={componentRef} showReceipt={showReceipt} />
              <ReactToPrint
                trigger={() => (
                  <div
                    className=" absolute  bg-custom-orange bottom-0 w-full left-0 p-4 flex
           items-center justify-center text-xl font-bold gap-3 cursor-pointer
           text-white select-none"
                  >
                    <BsCartPlusFill /> Print Receipt
                  </div>
                )}
                // content={() => setShowReceipt(!showReceipt)}
                content={() => componentRef.current}
              />
            </div>

            <div
              className=" absolute  bg-custom-orange bottom-16 w-full left-0 p-4 flex 
           items-center justify-center text-xl font-bold gap-3 cursor-pointer
           text-white select-none
           "
              onClick={() => setShowReceipt(!showReceipt)}
            >
              <BsCartPlusFill /> {!showReceipt ? "Checkout" : "Back to order"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesPoint;
