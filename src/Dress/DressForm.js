import React, { useState } from "react";

const DressForm = () => {
  const [user, setUser] = useState({
    s_id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: null,
    previewImage: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const previewImage = URL.createObjectURL(image);
    setUser({ ...user, image, previewImage });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("s_id", user.s_id);
    formData.append("name", user.name);
    formData.append("description", user.description);
    formData.append("price", user.price);
    formData.append("quantity", user.quantity);
    formData.append("image", user.image);

    fetch("/users/dress", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // add any success/failure handling code here
        setUser({
          s_id: "",
          name: "",
          description: "",
          price: "",
          quantity: "",
          image: null,
          previewImage: null,
        });
      })
      .catch((error) => {
        console.error(error);
        // add any error handling code here
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dress-form"
      style={{ marginTop: "100px" }}
    >
      <div className="form-group">
        <label htmlFor="s_id">S_ID:</label>
        <input
          type="text"
          className="form-control"
          name="s_id"
          id="s_id"
          value={user.s_id}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          value={user.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          className="form-control"
          name="description"
          id="description"
          value={user.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          className="form-control"
          name="price"
          id="price"
          value={user.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          className="form-control"
          name="quantity"
          id="quantity"
          value={user.quantity}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label className="custom-file-label" htmlFor="image">
            Choose file
          </label>
        </div>
        {user.previewImage && (
          <img
            src={user.previewImage}
            alt="preview"
            className="img-fluid mt-2"
          />
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default DressForm;
