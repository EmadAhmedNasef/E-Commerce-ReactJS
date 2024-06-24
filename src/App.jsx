import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Service from "./Components/Service/Service"
import NotFound from "./Components/NotFound/NotFound"
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import NonProtectedRoute from "./Components/ProtectedRoute/NonProtectedRoute";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UserContextProvider from "./Context/UserContext"
import Details from "./Components/Details/Details"
import AddNew from "./Components/AddNew/AddNew"
import Products from "./Components/Products/Products"
import ProductDetails from "./Components/ProductDetails/ProductDetails"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Cart from "./Components/Cart/Cart"
import CartContextProvider from "./Context/CartContext"
import AllOrders from "./Components/AllOrders/AllOrders"
import Address from "./Components/Address/Address"
import Wishlist from "./Components/Wishlist/Wishlist"
import WishlistContextProvider from "./Context/WishlistContext"
let query = new QueryClient();


const routes =createBrowserRouter([
  {path : "" , element : <Layout /> , children : [
    {path : "" , element : <ProtectedRoute><Products /></ProtectedRoute>},
    {path : "products" , element : <ProtectedRoute><Products/></ProtectedRoute>},
    {path : "service" , element : <ProtectedRoute><Service /></ProtectedRoute>},
    {path : "cart" , element : <ProtectedRoute><Cart /></ProtectedRoute>},
    {path : "allorders" , element : <ProtectedRoute><AllOrders /></ProtectedRoute>},
    {path : "wishlist" , element : <ProtectedRoute><Wishlist /></ProtectedRoute>},
    {path : "address/:id" , element : <ProtectedRoute><Address /></ProtectedRoute>},
    {path : "login" , element : <NonProtectedRoute><Login /></NonProtectedRoute>},
    {path : "register" , element : <NonProtectedRoute><Register /></NonProtectedRoute>},
    {path : "details/:id" , element : <ProtectedRoute><Details /></ProtectedRoute>},
    {path : "addnew" , element : <ProtectedRoute><AddNew/></ProtectedRoute>},
    {path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute>}
  ]},
  {path : "*" , element : <NotFound />},
]);

function App() {
  return (
    <>
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={routes}></RouterProvider>
            <ReactQueryDevtools />
          </WishlistContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
