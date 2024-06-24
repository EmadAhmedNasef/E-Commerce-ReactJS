import { Button, Navbar } from "flowbite-react";
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";

export default function Header() {
  const navigate = useNavigate();
  let userDetails = useContext(userContext);
  const { setNumberOfCartItems, numberOfCartItems } = useContext(cartContext);

  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/login");
    userDetails.setUser(null);
    setNumberOfCartItems(0);
  }

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {userDetails.user == null ? (
            <>
              <Button
                className="bg-green-600 mr-4"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-red-700 mr-4"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Button className="bg-orange-400" onClick={handleLogOut}>
                Logout
              </Button>
            </>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <NavLink to="products">Products</NavLink>
          <NavLink to="service">Services</NavLink>
          <NavLink to="wishlist">Wishlist</NavLink>
          <NavLink to="cart">
            Cart{" "}
            <span className="w-5 h-5 p-2 border rounded-[50%] text-yellow-400 border-yellow-500">
              {numberOfCartItems}
            </span>{" "}
          </NavLink>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
