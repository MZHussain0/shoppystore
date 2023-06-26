import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
      <Link to={"/admin"}>ADMIN</Link>
    </div>
  );
};

export default Home;
