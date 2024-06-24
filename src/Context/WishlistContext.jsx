import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const wishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [currentWishlist, setCurrentWishlist] = useState([]);

  function getLoggedWishlist() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCurrentWishlist(response.data.data);
      });
  }

  function removeFromWishlist(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        getLoggedWishlist();
      });
  }

  function addToWishlist(id) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: id },
        {
          headers: {
            token: `${localStorage.getItem("token")}`,
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
          getLoggedWishlist();
        }
      });
  }



  return (
    <wishlistContext.Provider
      value={{
        getLoggedWishlist,
        removeFromWishlist,
        addToWishlist,
        setCurrentWishlist,
        currentWishlist,
      }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
