import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";

export default function Address() {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    checkOut(values);
  }

  async function checkOut(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,
      {
        shippingAddress: values,
      },
      {
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(data);
    open(data.session.url, "_self");
  }

  return (
    <form
      className="flex max-w-md mx-auto flex-col gap-4 my-8"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-green-700 font-extrabold text-2xl">Address</h1>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="detail" />
        </div>
        <TextInput
          id="detail"
          type="text"
          placeholder="Your Details..."
          name="details"
          value={formik.values.details}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="tel" />
        </div>
        <TextInput
          id="tel"
          type="tel"
          placeholder="Your Phone..."
          name="phone"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="City" />
        </div>
        <TextInput
          id="City"
          type="text"
          placeholder="Your City..."
          name="city"
          value={formik.values.city}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>

      <Button type="submit" className="bg-green-600">
        Check Out
      </Button>
    </form>
  );
}
