import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import bg from "../../assets/bg-login.jpg";
import FirebaseContext from "../../contexts/FirebaseContext";
import Signup from "./Signup";

const Login = () => {
  //get the firebase context to sign in the user
  const { signInUserWithEmailAndPassword } = useContext(FirebaseContext);
  //create refs for email and password
  const emailRef = useRef();
  const paswordRef = useRef();

  //get the router
  const router = useRouter();

  //login the user into their account
  const loginToAccount = async () => {
    try {
      // setError("");
      // setLoading(true);

      await signInUserWithEmailAndPassword(
        emailRef.current.value,
        paswordRef.current.value
      );
      router.push("/dashboard");
    } catch (e) {
      // setError("Invalid username or password");
      console.log(e);
      // setLoading(false);
    }
    // setLoading(false);
  };
  return (
    <>
      <div className="h-[100vh]  flex items-center justify-center font-poppins ">
        <div className="flex gap-4 w-[50%] h-[70%] p-4 bg-white rounded-2xl ">
          <div className="flex items-center justify-center flex-col bg-white w-1/2 text-start ">
            <div className=" ">
              <h3 className="text-4xl font-black">Log in</h3>
              <p className="text-lg mt-2 text-gray-600">
                Hello there 👋, Welcome back!
              </p>
            </div>
            <form
              className=" flex flex-col text-xl gap-2 my-6 w-[60%]"
              onSubmit={(e) => {
                e.preventDefault();
                loginToAccount();
              }}
            >
              <div className="flex flex-col">
                <label>Email</label>
                <input
                  type="email"
                  ref={emailRef}
                  required
                  className="border-[1px] p-2 focus:outline-1 focus:outline-custom-orange text-lg text-gray-600 rounded-lg mt-1"
                />
              </div>
              <div className="flex flex-col">
                <label>Password</label>
                <input
                  type="password"
                  ref={paswordRef}
                  required
                  className="border-[1px] p-2 focus:outline-1 focus:outline-custom-orange text-lg text-gray-600 rounded-lg mt-1"
                />
              </div>
              <div className=" bg-orange-500 cursor-pointer text-center p-[.5em] text-[.9em] mt-6 rounded-2xl text-white font-bold hover:bg-orange-600">
                <input type="submit" value="login" className="cursor-pointer" />
              </div>
            </form>
            <p className="sign-up">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-orange-500 font-bold">
                Sign up
              </Link>
            </p>
          </div>
          <div className="w-1/2 ">
            <Image
              src={bg}
              alt="some text"
              className="rounded-xl h-full object-cover "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
