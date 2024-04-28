import React, { useEffect, useState } from "react";
import "./ClientAdd.css";
import { assets } from "../../assets/admin_assets/assets";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
function ClientAdd() {
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let [image, setImage] = useState(null);
  let [preview, setPreview] = useState();
  // const {currentUser} = useSelector(state=>state.userLogin)
  let restaurantName = sessionStorage.getItem('restaurantName')
  let restaurantId = sessionStorage.getItem('restaurantId')

  async function handleFormSubmit(menuObj) {
    console.log(menuObj);
    menuObj.restaurantName = restaurantName
    menuObj.restaurantId = Number(restaurantId)
    delete menuObj.image;
    const formData = new FormData();
    formData.append("menuObj", JSON.stringify(menuObj));
    formData.append("image", image);
    // console.log(formData.get('name'));
    let res = await axios.post("http://localhost:4000/client/add-item", formData);
    if (res.data.statusCode === 6) {
      toast.success(res.data.message);
      setPreview(null);
      setImage(null);
      reset();
    } else {
      console.log("There was some problem in adding manu item");
    }
  }

  function handleFileChange(e) {
    console.log("handleFileChange Entered");
    setImage(e.target.files[0]);
    console.log(image);
  }

  useEffect(() => {
    if (image) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const { result } = event.target;
        setPreview(result);
      };
      fileReader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <div className="client-add">
      <form
        action=""
        className="custom-form flex-col p-3 form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img className="menu-preview-img" src={preview ? preview : assets.upload_area} alt="" />
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            hidden
            className="form-control-file"
            {...register("image", { required: true })}
            onChange={handleFileChange}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            placeholder="name"
            className="form-control"
            {...register("name", { required: true })}
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="6"
            placeholder="Write content here"
            className="form-control"
            {...register("desc", { required: true })}
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              className="form-select"
              {...register("category", { required: true })}
            >
              <option value="Starters">Starters</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pizza">Pizza</option>
              <option value="Cake">Cake</option>
              <option value="Biryani">Biryani</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="North Indian">North Indian</option>
              <option value="South Indian">SouthIndian</option>
              <option value="Deserts">Deserts</option>
            </select>
          </div>
          <div className="add-price flex-c0l">
            <p>Product Price</p>
            <input
              type="Number"
              name="price"
              placeholder="Rs.100"
              {...register("price", { required: true })}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success add-btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default ClientAdd;
