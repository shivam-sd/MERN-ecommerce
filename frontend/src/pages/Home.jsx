import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../store/productSlice";
import { Link } from "react-router-dom";
import HomeBanner from "./HomeBanner";

const Home = () => {
  const dispatch = useDispatch();
  let product = useSelector((state) => state?.product?.product?.products);

  // Persist product data in localStorage if available, or retrieve from localStorage if Redux is empty
  if (!product || product.length === 0) {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      product = JSON.parse(storedProducts);
    }
  } else {
    localStorage.setItem("products", JSON.stringify(product));
  }

  console.log("Product from Home:", product);

  return (
    <div>
      <Header />
      <div className="w-full h-36 px-4 py-2 rounded-sm bg-gray-200 mt-5 flex gap-6 lg:overflow-x-hidden overflow-x-auto">
        {product?.map((item, index) => (
          <Link
            to={`/product-category/${item.productCategory}`}
            key={index}
            onClick={() => dispatch(setProductDetails(item))} // optional
          >
            <div className="bg-white h-32 w-32 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 duration-300 overflow-hidden">
              <img
                src={item.productImage}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        ))}
      </div>

<HomeBanner />

      <Footer />
    </div>
  );
};

export default Home;
