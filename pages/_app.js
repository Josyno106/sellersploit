import { createContext } from "react";
import Layout from "../components/layout/layout";
import { CartContextProvider } from "../contexts/CartContext";
import { FirebaseContextProvider } from "../contexts/FirebaseContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <FirebaseContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FirebaseContextProvider>
    </CartContextProvider>
  );
}

export default MyApp;
