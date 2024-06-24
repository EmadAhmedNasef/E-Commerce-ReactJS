import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";

export default function Details() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  async function getProductDetails() {
    await axios
      .get(`http://localhost:3000/api/v1/categories/${id}`)
      .then((res) => {
        console.log(res.data.data.category);
        setData(res.data.data.category);
      });
  }
  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className="flex justify-center items-center my-10">
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={data.image}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
            {data.description}
        </p>
      </Card>
    </div>
  );
}
