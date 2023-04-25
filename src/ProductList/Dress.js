import React, { useState } from "react";
import "./ProductList.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
  Image,
} from "react-bootstrap";

import { dressProducts } from "./Datajson/dressProducts";
import Cart from "./Cart";
import TypingAnimation from "../TypingAnimation/TypingAnimation";
import VideoBanner from "../VideoBanner/VideoBanner";
import IconGrid from "../IconGrid/IconGrid";
import Timer from "./Timer/Timer";

function Dress() {
  const products = dressProducts;
  // State for selected product and cart items
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  const keywords = searchQuery.toLowerCase().split(" ");

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    let matchCount = 0;
    for (const keyword of keywords) {
      if (productName.includes(keyword)) {
        matchCount++;
      }
    }
    return matchCount >= Math.ceil(keywords.length / 2);
  });
  const handleClearCart = () => {
    setCartItems([]);
  };

  // State for order form data and date/time
  const [orderFormData, setOrderFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [dateTime, setDateTime] = useState("");

  // Function to handle adding product to cart
  const handleAddToCart = (product) => {
    const MAX_QUANTITY = 2; // Set the maximum quantity limit

    // Check if item is already in cart
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index > -1) {
      // Item already exists, update quantity if it is less than the maximum quantity limit
      const newCartItems = [...cartItems];
      if (newCartItems[index].quantity < MAX_QUANTITY) {
        newCartItems[index].quantity += 1;
        setCartItems(newCartItems);
      } else {
        alert(
          `Sorry, you can only order up to ${MAX_QUANTITY} units of this product.`
        );
      }
    } else {
      // Item does not exist, add to cart with quantity 1
      const newCartItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
    }
  };
  //hello from main
  // Function to handle removing product from cart
  const handleRemoveFromCart = (product) => {
    // Check if item is in cart
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index > -1) {
      // Item exists, remove from cart
      const newCartItems = [...cartItems];
      if (newCartItems[index].quantity > 1) {
        // Item quantity > 1, decrement quantity
        newCartItems[index].quantity -= 1;
      } else {
        // Item quantity == 1, remove from cart
        newCartItems.splice(index, 1);
      }
      setCartItems(newCartItems);
    }
  };

  // Function to handle submitting order
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const orderData = {
      ...orderFormData,
      cartItems,
      dateTime: new Date().toLocaleString(),
    };
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        // Order submitted successfully
        console.log("Order submitted successfully");
        // Clear cart and order form data
        setCartItems([]);
        setOrderFormData({ name: "", email: "", address: "" });
        // Redirect to payment page
        window.location.replace("/pay");
      } else {
        // Order submission failed
        console.log("Failed to submit order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //this is main branch
  return (
    <>
      <VideoBanner videoName={"raymond"} />
      <IconGrid />

      <Container>
        <Row className="mb-3" style={{ marginTop: "60px" }}>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginBottom: "25px" }}
            />
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <Row>
              {filteredProducts.map((product) => (
                <Col md={4} key={product.id} className="heading-container">
                  <Card
                    className="product-card"
                    style={{
                      border: "none",
                      marginBottom: "20px",
                      boxShadow: "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "60px",
                      }}
                    >
                      <div
                        style={{
                          height: "50px",
                          fontSize: "17px",
                          fontWeight: "bold",
                          width: "50px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ color: "white" }}>30%</span>
                      </div>
                      <span style={{ fontWeight: "bold" }}>Discount</span>
                    </div>
                    <Card.Img
                      variant="top"
                      src={product.images[0]}
                      style={{ width: "250px" }}
                    />

                    <Card.Body>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ marginLeft: "30px", fontSize: "20px" }}>
                          <span
                            style={{
                              textDecoration: "line-through",
                              marginRight: "10px",
                            }}
                          >
                            ${product.price}
                          </span>
                          <span>${(product.price * 0.7).toFixed(2)}</span>
                        </div>
                      </div>
                      <Card.Title
                        style={{ marginLeft: "20px", width: "195px" }}
                      >
                        {product.name}
                      </Card.Title>
                      <Button
                        variant="primary"
                        onClick={() => setSelectedProduct(product)}
                      >
                        View Details
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantity >= 5} // maximum allowed quantity is 5
                      >
                        {product.quantity >= 5 ? "Out of Stock" : "Add to Cart"}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={4}>
            <h1
              style={{ marginLeft: "140px", fontSize: "60px" }}
              className="cart-title"
            >
              Cart
            </h1>
            <Cart
              handleClearCart={handleClearCart}
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
              orderFormData={orderFormData}
              setOrderFormData={setOrderFormData}
              handleSubmitOrder={handleSubmitOrder}
            />
          </Col>
        </Row>
        <Modal
          show={selectedProduct !== null}
          onHide={() => setSelectedProduct(null)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Slider {...settings}>
              {selectedProduct?.images.map((src, index) => (
                <div key={index}>
                  <Image src={src} fluid />
                </div>
              ))}
            </Slider>
            <p style={{ marginTop: "40px" }}>{selectedProduct?.description}</p>
            <p>Price: {selectedProduct?.price}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => handleAddToCart(selectedProduct)}
            >
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Dress;
