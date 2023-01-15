import { useContext, useEffect } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";
import { BsShopWindow } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

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
import { useRouter } from "next/router";
import Dashboard from "../../components/Dashboard/Dashboard";
const Index = () => {
  const { shops, createShop, currentUserDetails } = useContext(FirebaseContext);

  //get router for user navigation
  const router = useRouter();

  //create the new shop
  const createNewShop = async () => {
    try {
      await createShop(currentUser.uid, name, location, pin);
      alert("Successfully created a new shop");
      router.push("/shops");
    } catch (err) {
      console.log("Failed with the error fgf : " + err);
    }
  };

  useEffect(() => {
    if (currentUserDetails.type === "admin") {
      console.log("signed in!");
    } else {
      // router.push("/salespoint");
    }
  }, [currentUserDetails]);

  if (!currentUserDetails) {
    // user is signed out or still being checked.
    // don't render anything
    return null;
  }

  return (
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
                href={`/shops/${shop.id}`}
                className="p-2 rounded-xl hover:text-custom-orange font-bold flex items-center gap-4 justify-end"
              >
                view shop <BsArrowRight />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Index;
