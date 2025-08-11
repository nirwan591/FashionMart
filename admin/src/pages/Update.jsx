import React, { useEffect, useState } from "react";
import upload_area from "../assets/upload_area1.svg";
import { FaUpload } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:4000";

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${url}/api/product/${id}`);
      if (res.data.success) {
        setData({
          name: res.data.data.name,
          description: res.data.data.description,
          price: res.data.data.price,
          category: res.data.data.category,
        });
        setPreviewImage(`${url}/images/${res.data.data.image}`);
      } else {
        toast.error("Product not found");
      }
    } catch (err) {
      toast.error("Failed to fetch product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post(`${url}/api/product/update`, formData);
      if (res.data.success) {
        toast.success("Product updated");
        navigate("/list");
      } else {
        toast.error("Failed to update product");
      }
    } catch (err) {
      toast.error("Error updating product");
    }
  };

  return (
    <section className="p-4 sm:p-10 w-full bg-primary/20">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-5 max-w-[555px]">
        <h4 className="bold-22 pb-2 uppercase">Update Product</h4>

        <div className="flex flex-col gap-y-2 max-w-24 h-24">
          <p>Upload new image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : previewImage || upload_area}
              alt=""
              className="h-20"
            />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p>Product name</p>
          <input
            name="name"
            type="text"
            value={data.name}
            onChange={onChangeHandler}
            className="ring-1 ring-slate-900/10 py-1 px-3 outline-none"
            required
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p>Product description</p>
          <textarea
            name="description"
            rows={6}
            value={data.description}
            onChange={onChangeHandler}
            className="ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none"
            required
          ></textarea>
        </div>

        <div className="flex item-center gap-x-6 text-gray-900/70 medium-15">
          <div className="flex flex-col gap-y-2">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="outline-none ring-1 ring-slate-900/10 pl-2"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Electronics">Electronics</option>
              <option value="Cosmetics">Cosmetics</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2">
            <p>Product price</p>
            <input
              name="price"
              type="number"
              value={data.price}
              onChange={onChangeHandler}
              className="outline-none ring-1 ring-slate-900/10 pl-2"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-dark sm:w-5/12 flexCenter gap-x-2 !py-2 rounded">
          <FaUpload />
          Update Product
        </button>
      </form>
    </section>
  );
};

export default Update;
