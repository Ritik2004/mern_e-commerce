import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js"

//import ProductCard from "./ProductCard.js";
//import MetaData from "../layout/MetaData";
//import { clearErrors, getProduct } from "../../actions/productAction";
//import { useSelector, useDispatch } from "react-redux";
//import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const product = {
  name:"Tshirt",
  images:[{url:"https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_640.png"}],
  price:"$40",
  _id:"ritik"
};

const Home = () => {
//   const alert = useAlert();
//   const dispatch = useDispatch();
//   const { loading, error, products } = useSelector((state) => state.products);

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//     dispatch(getProduct());
//   }, [dispatch, error, alert]);

  return (
        <Fragment>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

           <div className="container" id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
          </div>
        </Fragment>
   
  );
};

export default Home;