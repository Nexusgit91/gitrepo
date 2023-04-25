import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function DressForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
      description,
      price,
      quantity,
      paymentMethod,
      images,
    };
    try {
      const response = await fetch("api/dress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setName("");
        setDescription("");
        setPrice(0);
        setQuantity(0);
        setPaymentMethod("");
        setImages([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagesArray = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        imagesArray.push(reader.result);
        if (imagesArray.length === files.length) {
          setImages(imagesArray);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container " style={{ marginTop: "200px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <input
                type="text"
                className="form-control"
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image1">Image 1:</label>
              <input
                type="file"
                className="form-control-file"
                id="image1"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image2">Image 2:</label>
              <input
                type="file"
                className="form-control-file"
                id="image2"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image3">Image 3:</label>
              <input
                type="file"
                className="form-control-file"
                id="image3"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default DressForm;
