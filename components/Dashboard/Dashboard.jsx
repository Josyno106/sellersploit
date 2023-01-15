import { useContext, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { BsShopWindow } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import FirebaseContext from "../../contexts/FirebaseContext";
import { useRouter } from "next/router";

import { db } from "../../Firebase/FIREBASE";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";

const Dashboard = () => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState(null);

  //create variables for the textfields
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pin, setPin] = useState("");

  //get the add doc function
  const {
    addUser,
    currentUser,
    taskList,
    createShop,
    shops,
    currentUserDetails,
  } = useContext(FirebaseContext);

  //get router for user navigation
  const router = useRouter();

  //create the new shop
  const createNewShop = async () => {
    try {
      await createShop(currentUser.uid, name, location, pin);
      alert("Successfully created a new shop");
      router.push("/shops");
    } catch (err) {
      console.log("Failed with the error : " + err);
    }
  };

  useEffect(() => {
    if (currentUserDetails && currentUserDetails.type === "admin") {
      console.log("signed in!");
    } else {
      router.push("/salespoint");
    }
  }, [currentUserDetails]);

  if (!currentUserDetails) {
    // user is signed out or still being checked.
    // don't render anything
    return null;
  }

  return (
    <>
      <div className="h-[100vh] bg-white flex flex-col items-center justify-center  group ">
        {shops.length ? (
          shops.map((shop, index) => (
            <div
              className="bg-white mb-6 shadow-gray-600 drop-shadow-lg cursor-pointer  py-4 px-6 rounded-2xl 
          flex items-center gap-8 w-[40%] hover:drop-shadow-2xl"
              key={index}
            >
              <div className="text-6xl text-custom-orange ">
                <BsShopWindow />
              </div>
              <div className="text-2xl font-semibold">
                <h3>{shop.name}</h3>
                <p className="text-lg font-normal ">{shop.location}</p>
              </div>
              <div className=" flex-grow ">
                <Link
                  href="#"
                  className="p-2 rounded-xl text-custom-orange font-bold flex items-center gap-4 justify-end"
                >
                  view shop <BsArrowRight />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <>
            <button
              className={
                animate
                  ? "hidden"
                  : "bg-orange-500 px-4 py-2 rounded-full font-bold cursor-pointer text-white flex items-center gap-2 select-none"
              }
              onClick={() => {
                setAnimate(!animate);
              }}
            >
              <IoMdAdd />
              Create a shop {currentUserDetails.type}
            </button>

            <div
              className={
                animate
                  ? "bg-white relative border  outline-gray-600 px-4 py-6 rounded-xl font-bold cursor-pointer text-gray-600" +
                    "flex items-center gap-2 select-none  md:w-[40%] lg:w-[25%] xl:w-[22%]"
                  : "hidden "
              }
            >
              <div className=" flex justify-end mb-8 absolute -right-5 -top-4 ">
                <div
                  className=" bg-custom-orange p-2 rounded-full text-white "
                  onClick={() => {
                    setAnimate(!animate);
                  }}
                >
                  <RxCross1 />
                </div>
              </div>
              <form
                className=" w-full "
                onSubmit={(e) => {
                  e.preventDefault();
                  createNewShop();
                }}
              >
                <h2 className="text-orange-500 text-2xl px-6 mb-4">
                  New shop details {name}
                </h2>
                <div className="flex flex-col gap-6 px-6">
                  <input
                    placeholder="Shop Name *"
                    type="text"
                    required
                    className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none
                  text-gray-600  mt-1 "
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <input
                    placeholder="Location *"
                    type="text"
                    required
                    className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                  <input
                    placeholder="KRA PIN *"
                    type="text"
                    required
                    className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                    onChange={(e) => {
                      setPin(e.target.value);
                    }}
                  />

                  <div className=" bg-orange-500 cursor-pointer text-center p-[.5em] text-[1.1em] mt-6 rounded-2xl text-white font-bold hover:bg-orange-600">
                    <input
                      type="submit"
                      value="create shop"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
