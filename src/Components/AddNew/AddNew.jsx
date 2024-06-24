import React from "react";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddNew() {
  const navigate = useNavigate();

  function handleSubmit(values, { resetForm }) {
    // const formData = new FormData();
    // formData.append("title", values.title);
    // formData.append("description", values.description);
    // formData.append("image", values.image);

    axios
      .post("http://localhost:3000/api/v1/categories", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          text: "You have successfully added a new category!",
          icon: "success",
        });
        resetForm();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  const mySchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
    },
    validationSchema: mySchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form
        className="flex max-w-lg mx-auto flex-col gap-4 shadow-lg p-8 my-8"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="Your Title...."
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="title"
          />
          <span className="text-sm text-red-600">
            {formik.touched.title && formik.errors.title}
          </span>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" />
          </div>
          <TextInput
            id="description"
            type="text"
            placeholder="Your Description...."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
          />
          <span className="text-sm text-red-600">
            {formik.touched.description && formik.errors.description}
          </span>
        </div>
        <div id="fileUpload" className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="file" />
          </div>
          <FileInput
            id="file"
            helperText="A profile picture is useful to confirm your are logged into your account"
            placeholder="Upload your profile picture"
            name="image"
            onChange={(event) => {
              formik.setFieldValue("image", event.target.files[0]);
            }}
          />
          <span className="text-sm text-red-600">
            {formik.touched.image && formik.errors.image}
          </span>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
