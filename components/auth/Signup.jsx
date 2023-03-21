import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import bg from "../../assets/bg-login.jpg";
import FirebaseContext from "../../contexts/FirebaseContext";

const Signup = () => {
  //create refs for email and password
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //set loading state while performing db operations
  const [loading, setloading] = useState(false);

  //call the methods to create account from the context

  const { signupUser } = useContext(FirebaseContext);

  //get the router

  const router = useRouter();

  return (
    <>
      <div className="h-[100vh] flex items-center justify-center font-poppins ">
        <div className="flex gap-4 w-[50%] h-[70%] p-4 bg-white rounded-2xl ">
          <div className="flex items-center justify-center flex-col bg-white w-1/2 text-start ">
            <div className=" ">
              <h3 className="text-4xl font-black">Creat account</h3>
              <p className="text-lg mt-2 text-gray-600">
                Hello there 👋, Create account!
              </p>
            </div>
            <form
              className=" flex flex-col text-xl gap-2 my-6 w-[60%]"
              onSubmit={async (e) => {
                e.preventDefault();
                // create the account
                setloading(true);
                try {
                  const shopowner = await signupUser(
                    emailRef.current.value,
                    passwordRef.current.value
                  );

                  setloading(false);
                  router.push("/complete-signup");
                } catch (error) {
                  setloading(false);

                  alert("Failed to add user date: " + error);
                }
              }}
            >
              <div className="flex flex-col">
                <label>Email</label>
                <input
                  type="text"
                  ref={emailRef}
                  required
                  className="border-[1px] p-2 focus:outline-1 focus:outline-custom-orange text-lg text-gray-600 rounded-lg mt-1"
                />
              </div>
              <div className="flex flex-col">
                <label>Password</label>
                <input
                  type="password"
                  required
                  className="border-[1px] p-2 focus:outline-1 focus:outline-custom-orange text-lg text-gray-600 rounded-lg mt-1"
                  ref={passwordRef}
                />
              </div>
              <div className=" bg-orange-500 cursor-pointer text-center p-[.5em] text-[1.1em] mt-6 rounded-2xl text-white font-bold hover:bg-orange-600">
                <input
                  type="submit"
                  value="sign up"
                  className="cursor-pointer"
                />
              </div>
            </form>
            <p className="sign-up">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 font-bold">
                Login
              </Link>
            </p>
          </div>
          <div className="w-1/2 ">
            <Image
              src={bg}
              alt="some text"
              className="rounded-xl h-full object-cover "
            />
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Signup;
