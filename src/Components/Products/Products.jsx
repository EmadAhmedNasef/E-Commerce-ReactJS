import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Pagination } from "flowbite-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userContext } from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";

export default function Products() {
  const { setNumberOfCartItems, numberOfCartItems } = useContext(cartContext);
  const { token } = useContext(userContext);
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
        setNumberOfCartItems(response.data.numOfCartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  useEffect(() => {
    getProducts();
  }, []);

  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5000,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data?.data.data.map((item) => (
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
            <ToastContainer />
          </Card>
        ))}
      </div>
    </>
  );
}
