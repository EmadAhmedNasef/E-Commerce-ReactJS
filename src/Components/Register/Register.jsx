import React, { useContext, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../../Context/UserContext";



export default function Register() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const userDetails = useContext(userContext);

  async function handleSubmit(values, { resetForm }) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("token", res.data.token);
          userDetails.setUser(res.data.token);
          toast.success("You have been registered successfully", {
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
            navigate("/login");
          }, 3000);
        }
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setMsg(error.response.data.message);
      });
  }
  // Validation Schema
  const mySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name is too short")
      .max(50, "Name is too long"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short")
      .max(50, "Password is too long")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/,
        "Password must contain at least one number , one uppercase and one lowercase letter , one special character"
      ),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Password must match"),
    phone: Yup.string().required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
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
        <h1 className="text-green-600 font-extrabold text-2xl">Register</h1>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Your Name..."
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className="mt-3 text-red-600 text-sm">
            {formik.touched.name && formik.errors.name}
          </span>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="Your Email..."
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="email"
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
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="password"
          />
          <span className="mt-3 text-red-600 text-sm">
            {formik.touched.password && formik.errors.password}
          </span>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="rePassword" />
          </div>
          <TextInput
            id="rePassword"
            type="password"
            placeholder="Your ConfirmPassword..."
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className="mt-3 text-red-600 text-sm">
            {formik.touched.rePassword && formik.errors.rePassword}
          </span>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" />
          </div>
          <TextInput
            id="phone"
            type="tel"
            placeholder="Your Phone..."
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="phone"
          />
          <span className="mt-3 text-red-600 text-sm">
            {formik.touched.phone && formik.errors.phone}
          </span>
        </div>
        <Button type="submit">Submit</Button>
        {msg && <div className="text-red-600 text-center my-3">{msg}</div>}
        <ToastContainer />
      </form>
    </>
  );
}
