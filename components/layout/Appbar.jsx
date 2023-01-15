import { useRouter } from "next/router";
import { useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import FirebaseContext from "../../contexts/FirebaseContext";
const Appbar = () => {
  //import the signout method from context
  const { signOut, currentUser, currentUserDetails } =
    useContext(FirebaseContext);

  //get the router router
  const router = useRouter();
  return (
    <>
      {currentUserDetails && currentUserDetails.type === "admin" ? (
        <div className="  flex items-center justify-between px-80 text-xl ">
          <div>
            <h2>
              Hello, {currentUserDetails ? currentUserDetails.firstname : null}{" "}
            </h2>
          </div>
          <nav>
            <ul className="flex  gap-8 py-6 font-poppins">
              <li className=" cursor-not-allowed  ">create shop</li>
              <li
                className="hover:text-red-600 cursor-pointer"
                onClick={() => {
                  router.push("/shops");
                }}
              >
                view shops
              </li>
              <li
                className="flex  items-center gap-3 hover:text-red-600 cursor-pointer  "
                onClick={async () => {
                  try {
                    await signOut();
                    router.push("/login");
                  } catch (error) {
                    alert("Lout Operation Failed : " + error);
                  }
                }}
              >
                sign out
                <AiOutlineArrowRight />
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
};

export default Appbar;
