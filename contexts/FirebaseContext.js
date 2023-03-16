import { createContext, useEffect, useRef } from "react";
import { auth } from "../Firebase/FIREBASE";
import { useState } from "react";
import { db } from "../Firebase/FIREBASE";
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

const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserDetails, setcurrentUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  //set all tasks state
  const [taskList, setTasksList] = useState([]);
  //set the shop state
  const [shops, setShops] = useState([]);

  //fetch products from the database
  const [products, setProducts] = useState([]);

  //set variable for showing receipt
  const [showReceipt, setShowReceipt] = useState(true);

  //create new user
  const signupUser = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  //log in user anonymously
  const loginAnon = () => {
    return auth
      .signInAnonymously()
      .then(console.log("user logged in successfylly"));
  };
  //log in  user
  const signInUserWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  //logout current user
  const signOut = () => {
    auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  //add a document to the database
  const addUser = (title, description) => {
    addDoc(collection(db, "tasks"), {
      title: title,
      description: description,
      created: Timestamp.now(),
    });
  };

  //update shop Owner Details
  const setShopOwner = (fname, lname, owneruid, id_passport, phone) => {
    setDoc(doc(db, "allusers", owneruid), {
      firstname: fname,
      lastname: lname,
      uid: owneruid,
      idorpassport: id_passport,
      phone: phone,
      type: "admin",
      permissions: ["add", "delete", "update", "reports"],
      last_updated: Timestamp.now(),
    });
  };

  //create a new shop
  const createShop = (owner, name, location, pin) => {
    addDoc(collection(db, `allshops/${owner}/shops`), {
      owner: owner,
      name: "name",
      location: "location",
      pin: pin,
      created: Timestamp.now(),
    });
  };

  //create a new cashier for a given shop
  const createEmployee = (uid, fname, lname, email, shopid) => {
    setDoc(doc(db, "allusers", uid), {
      firstname: fname,
      lastname: lname,
      email: email,
      uid: uid,
      shopid: shopid,
      phone: "phone",
      type: "employee",
      permissions: ["add", "sell"],
      created: Timestamp.now(),
    });
  };

  //create a new product under a given shop id
  const createProductunderShop = (
    addedby,
    shopId,
    name,
    description,
    code,
    price,
    litres,
    quantity
  ) => {
    addDoc(collection(db, `allproducts/${shopId}/products`), {
      addedby: addedby,
      shopId: shopId,
      productname: name,
      description: description,
      code: code,
      price: price,
      category: "default",
      litres: litres,
      quantity: quantity,
      created: Timestamp.now(),
    });
  };

  useEffect(() => {
    const subscriber = async () => {
      const docRef = doc(db, "allusers", currentUser.uid);
      const docSnap = await getDoc(docRef);
      setcurrentUserDetails(docSnap.data());
      console.log(docSnap.data());
    };

    {
      currentUser ? subscriber() : null;
    }
  }, [currentUser]);
  //get the data from database in realtime
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    const subscriber = getDocs(collection(db, "tasks")).then((snapshot) => {
      snapshot.forEach((doc) => {
        setTasksList((taskList) =>
          taskList.concat({
            title: doc.data().title,
            description: doc.data().description,
          })
        );
      });
    });
    return () => subscriber;
  }, []);

  //fetch all shops for current user

  //get all the shops
  const isFetched = useRef(false);

  useEffect(() => {
    if (currentUser) {
      if (isFetched.current) return;
      isFetched.current = true;
      const subscriber = getDocs(
        collection(db, `allshops/${currentUser.uid}/shops`)
      ).then((snapshot) => {
        snapshot.forEach((doc) => {
          setShops((shops) =>
            shops.concat({
              name: doc.data().name,
              location: doc.data().location,
              id: doc.id,
            })
          );
        });
      });
      return () => subscriber;
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const values = {
    currentUser,
    loading,
    addUser,
    signupUser,
    signInUserWithEmailAndPassword,
    signOut,
    resetPassword,
    loginAnon,
    taskList,
    setShopOwner,
    currentUser,
    createShop,
    shops,
    createEmployee,
    createProductunderShop,
    currentUserDetails,
    products,
    setProducts,
    showReceipt,
    setShowReceipt,
  };

  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
