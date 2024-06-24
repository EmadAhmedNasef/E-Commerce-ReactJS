import axios from "axios";
import { Button } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { setNumberOfCartItems, numberOfCartItems } = useContext(cartContext);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  function getCartUser() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCartId(response.data.data._id);
        setCart(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteCartProduct(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        axios
          .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
              token: `${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setCart(response.data.data.products);
            setTotalPrice(response.data.data.totalCartPrice);
            setNumberOfCartItems(response.data.numOfCartItems);
          });
      }
    });
  }

  function deleteAllCartProduct() {
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCart([]);
        setTotalPrice(0);
        setNumberOfCartItems(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateUserCart(id, count) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        {
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setCart(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
      });
  }

  useEffect(() => {
    getCartUser();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#10B981" loading={loading} size={150} />
        </div>
      ) : (
        <>
          <h1 className="text-center text-green-600 mb-3">My Cart</h1>
          <h3 className="text-center text-green-600 mb-3">
            total price: {totalPrice}
          </h3>
          <Button
            onClick={deleteAllCartProduct}
            className="text-right bg-red-700"
          >
            Clear All
          </Button>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={item.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="iPhone 12"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateUserCart(item.product._id, item.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div className="ms-3">
                          <input
                            type="number"
                            id="first_product"
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={item.count}
                            required
                          />
                        </div>
                        <button
                          onClick={() =>
                            updateUserCart(item.product._id, item.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => deleteCartProduct(item.product._id)}
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
                {cart.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-red-600 p-7 text-3xl"
                    >
                      Your cart is empty
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <Link to={`/address/${cartId}`}>
            <Button className="bg-green-600">Check Out</Button>
          </Link>
        </>
      )}
    </>
  );
}
