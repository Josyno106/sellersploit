import { useContext, useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/router";
import FirebaseContext from "../../contexts/FirebaseContext";

const ShopPage = () => {
  //get the current shop id
  const router = useRouter();
  const shopId = router.query.id;

  const [show, setShow] = useState(false);
  const [isUser, setIsUser] = useState(false);

  //new user variables
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //new product ref details
  const pNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const codeRef = useRef(null);
  const priceRef = useRef(null);
  const litresRef = useRef(null);
  const quantityRef = useRef(null);

  //get functions for creating the employees database

  const { signupUser, createEmployee, currentUser, createProductunderShop } =
    useContext(FirebaseContext);

  //set loading state while performing db operations
  const [loading, setloading] = useState(false);

  return (
    <div className="h-[100vh] bg-white flex flex-col items-center justify-center  group ">
      <h2 className="text-2xl mb-8">Hello, what do you want to do?</h2>
      {show ? (
        <div
          className={
            show
              ? "bg-white relative border  outline-gray-600 px-4 py-6 rounded-xl font-bold cursor-pointer text-gray-600" +
                "flex items-center gap-2 select-none  md:w-[40%] lg:w-[25%] xl:w-[22%]"
              : "hidden "
          }
        >
          <div className=" flex justify-end mb-8 absolute -right-5 -top-4 ">
            <div
              className=" bg-custom-orange p-2 rounded-full text-white "
              onClick={() => {
                setShow(!show);
              }}
            >
              <RxCross1 />
            </div>
          </div>
          {isUser ? (
            <form
              className=" w-full "
              onSubmit={async (e) => {
                e.preventDefault();
                // create the account
                setloading(true);
                try {
                  const newEmployee = await signupUser(
                    emailRef.current.value,
                    passwordRef.current.value
                  );

                  await createEmployee(
                    newEmployee.user.uid,
                    fnameRef.current.value,
                    lnameRef.current.value,
                    emailRef.current.value,
                    shopId
                  );

                  setloading(false);

                  alert("Created the Cashier account " + newEmployee.user.uid);
                  fnameRef.current.value = "";
                  lnameRef.current.value = "";
                  emailRef.current.value = "";
                  passwordRef.current.value = "";
                } catch (error) {
                  setloading(false);

                  alert("Failed to add user date: " + error);
                }
              }}
            >
              <h2 className="text-orange-500 text-2xl px-6 mb-4">
                Add a cashier
              </h2>
              <div className="flex flex-col gap-6 px-6">
                <input
                  placeholder="First Name *"
                  type="text"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none
                  text-gray-600  mt-1 "
                  // onChange={(e) => {
                  //   setFname(e.target.value);
                  // }}
                  ref={fnameRef}
                />
                <input
                  placeholder="Last Name *"
                  type="text"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                  ref={lnameRef}
                />
                <input
                  placeholder="Email *"
                  type="email"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                  ref={emailRef}
                />
                <input
                  placeholder="Password *"
                  type="Password"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                  ref={passwordRef}
                />

                <div className=" bg-orange-500 cursor-pointer text-center p-[.5em] text-[1.1em] mt-6 rounded-2xl text-white font-bold hover:bg-orange-600">
                  <input
                    type="submit"
                    value={loading ? "loading..." : "create user"}
                    className="cursor-pointer"
                    disabled={loading ? true : false}
                  />
                </div>
              </div>
            </form>
          ) : (
            <form
              className=" w-full "
              onSubmit={async (e) => {
                e.preventDefault();

                setloading(true);
                try {
                  await createProductunderShop(
                    currentUser.uid,
                    shopId,
                    pNameRef.current.value,
                    descriptionRef.current.value,
                    codeRef.current.value,
                    priceRef.current.value,
                    litresRef.current.value,
                    quantityRef.current.value
                  );

                  alert("Added the product successfully");
                  pNameRef.current.value = "";
                  descriptionRef.current.value = "";
                  codeRef.current.value = "";
                  priceRef.current.value = "";
                  litresRef.current.value = "";
                  quantityRef.current.value = "";
                } catch (error) {
                  alert("Failed to add product :  " + error);
                  setloading(false);
                }
                setloading(false);
              }}
            >
              <h2 className="text-orange-500 text-2xl px-6 mb-4">
                Add New Product
              </h2>
              <div className="flex flex-col gap-6 px-6">
                <input
                  placeholder="Product Name *"
                  type="text"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none
                  text-gray-600  mt-1 "
                  ref={pNameRef}
                />
                <input
                  placeholder="Description *"
                  type="text"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                  ref={descriptionRef}
                />
                <input
                  placeholder="Product Code *"
                  type="text"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                  ref={codeRef}
                />
                <input
                  placeholder="Litres *"
                  type="text"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                  ref={litresRef}
                />
                <input
                  placeholder="Quantity *"
                  type="number"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                  ref={quantityRef}
                />
                <input
                  placeholder="Price *"
                  type="number"
                  required
                  className="border-b-[1px] p-2 focus:border-b-custom-orange focus:outline-none  text-gray-600  mt-1"
                  ref={priceRef}
                />

                <div className=" bg-orange-500 cursor-pointer text-center p-[.5em] text-[1.1em] mt-6 rounded-2xl text-white font-bold hover:bg-orange-600">
                  <input
                    type="submit"
                    value={loading ? "loading" : "Add Product"}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <button
            className="bg-custom-orange py-2 px-6 rounded-full text-white"
            onClick={() => {
              setIsUser(true);
              setShow(true);
            }}
          >
            Add users
          </button>
          <button
            className="bg-custom-orange py-2 px-6 rounded-full text-white"
            onClick={() => {
              setIsUser(false);
              setShow(true);
            }}
          >
            Add New Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
