import React, { useState } from "react";
import "../ProductList.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronDown } from "react-icons/fa";
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

import { dressProducts } from "../Datajson/dressProducts";

import VideoBanner from "../../VideoBanner/VideoBanner";
import IconGrid from "../../IconGrid/IconGrid";

import DressCart from "./DressCart";
import TimeComponent from "../Timer/TimeComponet";
import ProductModal from "./ProductModal";
//Component
function Dress() {
  const products = dressProducts;
  const [selectedSize, setSelectedSize] = useState(null);

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

  // Function to handle adding product to cart
  const handleAddToCart = (product) => {
    const MAX_QUANTITY = 2; // Set the maximum quantity limit

    // Check if item is already in cart
    const index = cartItems.findIndex(
      (item) => item.id === product.id && item.size === selectedSize
    );

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
      if (!selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
      }

      const newCartItem = { ...product, quantity: 1, size: selectedSize };
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
                        marginLeft: "30px",
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
                        <span style={{ color: "white" }}>10%</span>
                      </div>
                      <span style={{ fontWeight: "bold" }}>Discount</span>
                    </div>
                    <Card.Img
                      variant="top"
                      src={product.images[0]}
                      style={{ width: "300px" }}
                    />

                    <Card.Body>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
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
                          <span>${(product.price * 0.9).toFixed(2)}</span>

                          <Form
                            style={{
                              width: "90px",
                              marginTop: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            <Form.Group controlId="formSize">
                              <div style={{ position: "relative" }}>
                                <Form.Control
                                  as="select"
                                  onChange={(e) =>
                                    setSelectedSize(e.target.value)
                                  }
                                  style={{ paddingRight: "30px" }}
                                >
                                  <option value=""> Size</option>
                                  {product.sizes.map((size) => (
                                    <option value={size} key={size}>
                                      {size}
                                    </option>
                                  ))}
                                </Form.Control>
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  <FaChevronDown size={20} />
                                </div>
                              </div>
                            </Form.Group>
                          </Form>
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
                        onClick={() => handleAddToCart(product, selectedSize)}
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "36px",
                  color: "#ff9900",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                  textShadow: "2px 2px 5px #333333",
                  margin: "auto",
                }}
              >
                Sales End's In
              </h1>
            </div>
            <TimeComponent />
            <h1
              style={{ marginLeft: "170px", fontSize: "60px" }}
              className="cart-title"
            >
              Cart
            </h1>
            <DressCart
              handleClearCart={handleClearCart}
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
              orderFormData={orderFormData}
              setOrderFormData={setOrderFormData}
              handleSubmitOrder={handleSubmitOrder}
            />
          </Col>
        </Row>

        <ProductModal
          selectedProduct={selectedProduct}
          onHide={() => setSelectedProduct(null)}
          handleAddToCart={handleAddToCart}
        />
      </Container>
    </>
  );
}

export default Dress;
