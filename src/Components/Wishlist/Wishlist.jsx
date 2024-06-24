import axios from "axios";
import { Button, Card } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../../Context/WishlistContext";
import { ClipLoader } from "react-spinners";

export default function Wishlist() {
  //const [data, setData] = useState([]);

  //   function getLoggedWishlist() {
  //     axios
  //       .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
  //         headers: {
  //           token: `${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((response) => {
  //         setData(response.data.data);
  //       });
  //   }

  //   function removeFromWishlist(id) {
  //     axios
  //       .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
  //         headers: {
  //           token: `${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((response) => {
  //         getLoggedWishlist();
  //       });
  //   }

  const { getLoggedWishlist, removeFromWishlist, currentWishlist } =
    useContext(wishlistContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoggedWishlist();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#10B981" loading={loading} size={150} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentWishlist.map((item) => (
              <Card
                key={item._id}
                className="max-w-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={item.imageCover}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <Button
                  onClick={() => removeFromWishlist(item._id)}
                  className="bg-red-600"
                >
                  Remove From Watchlist
                </Button>
              </Card>
            ))}
            {currentWishlist.length === 0 && (
              <p className="text-center text-red-600 text-3xl">
                No items in wishlist
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
