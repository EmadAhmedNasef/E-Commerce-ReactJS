import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Pagination } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { cartContext } from "../../Context/CartContext";
import { userContext } from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";

export default function Service() {
  const [products, setProducts] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { setNumberOfCartItems, numberOfCartItems } = useContext(cartContext);
  const { token } = useContext(userContext);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  function addProductToCart(id) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        {
          headers: {
            token: `${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(`${response.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setNumberOfCartItems(response.data.numOfCartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getAllProducts = (page) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
      .then((response) => {
        console.log(response.data.metadata);
        setProducts(response.data.data);
        setMetadata(response.data.metadata);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((item) => (
          <Card
            key={item._id}
            className="max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
          >
            <Link to={`/productdetails/${item._id}/${item.category.name}`}>
              <div>
                <img src={item.imageCover} alt={item.title} />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </Link>
            <Button onClick={() => addProductToCart(item._id)}>
              Add To Cart
            </Button>
          </Card>
        ))}
      </div>
      <div className="flex overflow-x-auto sm:justify-center my-6">
        <Pagination
          currentPage={metadata.currentPage || 1}
          totalPages={metadata.numberOfPages || 1}
          onPageChange={onPageChange}
        />
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
    </>
  );
}
