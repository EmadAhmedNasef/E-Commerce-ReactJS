import React, { useContext, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";


export default function Login() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const userDetails = useContext(userContext);

  async function handleSubmit(values, { resetForm }) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("token", res.data.token);
          userDetails.setUser(res.data.token);
          toast.success("You have been logged in successfully", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          resetForm();
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }
      })
      .catch((error) => {
        setMsg(error.response.data.message);
      });
  }

  const mySchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form
        className="flex max-w-md mx-auto flex-col gap-4 my-8"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-green-700 font-extrabold text-2xl">Login</h1>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="Your Email..."
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className="mt-3 text-red-600 text-sm">
            {formik.touched.email && formik.errors.email}
          </span>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="Your Password..."
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className="mt-3 text-red-600 text-sm">
            {formik.touched.password && formik.errors.password}
          </span>
        </div>

        <Button type="submit">Submit</Button>
        {msg && <span className="text-red-600 text-center">{msg}</span>}
        <ToastContainer />
      </form>
    </>
  );
}
