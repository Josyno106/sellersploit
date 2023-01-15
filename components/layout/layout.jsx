import Appbar from "./Appbar";

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      {children}
    </>
  );
};

export default Layout;
