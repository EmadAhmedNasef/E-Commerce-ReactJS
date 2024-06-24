import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider(props) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  function getAllCartItems() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setNumberOfCartItems(response.data.numOfCartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllCartItems();
  }, []);

  return (
    <cartContext.Provider value={{ numberOfCartItems, setNumberOfCartItems }}>
      {props.children}
    </cartContext.Provider>
  );
}
