import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import FirebaseContext from "../../contexts/FirebaseContext";
const ShopOwnerDetails = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setID] = useState();
  const [phone, setPhone] = useState("");

  //get the method to add data
  const { currentUser, setShopOwner } = useContext(FirebaseContext);

  //get the current router
  const router = useRouter();

  const updateOwner = async () => {
    try {
      await setShopOwner(fname, lname, currentUser.uid, id, phone);
      setFname("");
      setLname("");
      setID("");
      setPhone("");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-[100vh] bg-white font-poppins flex flex-col items-center justify-center  group ">
        <div
          className={
            "bg-white relative border  outline-gray-600 px-4 py-6 rounded-xl font-bold cursor-pointer text-gray-600" +
            "flex items-center gap-2 select-none  md:w-[40%] lg:w-[25%] xl:w-[22%]"
          }
        >
          <div className=" flex justify-end mb-8 absolute -right-5 -top-4 "></div>
          <form
            className=" w-full "
            onSubmit={(e) => {
              e.preventDefault();
              updateOwner();

              // console.log("Hello");
            }}
          >
            <h2 className="text-orange-500 text-2xl px-6 mb-4">
              let&apos;s get to know you
            </h2>
            <div className="flex flex-col gap-6 px-6">
              <input
                placeholder="First Name *"
                value={fname}
                type="text"
                required
                className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none
                  text-gray-600  mt-1 "
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              />
              <input
                placeholder="Last Name *"
                type="text"
                value={lname}
                required
                className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                onChange={(e) => {
                  setLname(e.target.value);
                }}
              />
              <input
                placeholder="ID / Passport Number *"
                type="number"
                value={id}
                required
                className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                onChange={(e) => {
                  setID(e.target.value);
                }}
              />
              <input
                placeholder="Phone *"
                type="tel"
                value={phone}
                required
                className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />

              <div className=" bg-orange-500 cursor-pointer text-center p-[.5em] text-[1.1em] mt-6 rounded-2xl text-white font-bold hover:bg-orange-600">
                <input
                  type="submit"
                  value="Save details"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShopOwnerDetails;
