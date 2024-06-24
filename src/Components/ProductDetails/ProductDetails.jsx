import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { wishlistContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id, category } = useParams();

  function getProductById(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data.data);
      });
  }

  function getProductByCategory(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((response) => {
        let allProducts = response.data.data;
        let relatedProducts = allProducts.filter(
          (item) => item.category.name === category
        );
        setRelatedProducts(relatedProducts);
      });
  }

  // function addToWishlist() {
  //   axios
  //     .post(
  //       `https://ecommerce.routemisr.com/api/v1/wishlist`,
  //       { productId: id },
  //       {
  //         headers: {
  //           token: `${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response.data.status === "success") {
  //         toast.success(`${response.data.message}`, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //       }
  //     });
  // }

  const { currentWishlist, addToWishlist } = useContext(wishlistContext);
  const isDisabled = currentWishlist.find((item) => item._id === id);

  useEffect(() => {
    getProductById(id);
    getProductByCategory(category);
  }, [id, category]);

  return (
    <div className="flex flex-wrap items-center p-6">
      <div className="w-full lg:w-1/4 p-2 shadow-lg">
        <img className="w-full" src={product.imageCover} alt={product.title} />
      </div>
      <div className="w-full lg:w-3/4 p-2">
        <h1 className="text-lg font-bold">{product.title}</h1>
        <p className="text-lg font-normal text-gray-700 dark:text-gray-400">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-green-600">
            Price: {product.price}$
          </p>
        </div>
        <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded">
          Add To Cart
        </button>
        <button
          disabled={isDisabled}
          onClick={() => addToWishlist(product._id)}
          className={`mt-4 w-full text-white px-4 py-2 rounded ${isDisabled ? "bg-red-600 cursor-not-allowed" : "bg-slate-600"}`}
        >
          Add To wishlist
        </button>
      </div>

      <div className="grid grid-cols-6">
        {relatedProducts.map((item) => (
          <Link
            key={item._id}
            to={`/productdetails/${item._id}/${item.category.name}`}
          >
            <div className="p-2 shadow-lg">
              <img className="w-full" src={item.imageCover} alt={item.title} />
              <p className="text-lg font-normal text-red-700">
                {item.category.name}
              </p>
              <h1 className="text-lg font-bold">{item.title}</h1>
              <p className="text-lg font-normal text-gray-700 dark:text-gray-400">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-green-600">
                  Price: {item.price}$
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
