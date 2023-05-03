import React, { useState } from "react";
import { Col, Card, Form, Button } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";

const ProductCard = ({ product, handleAddToCart, setSelectedProduct }) => {
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <Col md={4} className="heading-container">
      <Card
        className="product-card"
        style={{ border: "none", marginBottom: "20px", boxShadow: "none" }}
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
                style={{ textDecoration: "line-through", marginRight: "10px" }}
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
                      onChange={(e) => setSelectedSize(e.target.value)}
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
          <Card.Title style={{ marginLeft: "20px", width: "195px" }}>
            {product.name}
          </Card.Title>
          <Button variant="primary" onClick={() => setSelectedProduct(product)}>
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
  );
};

export default ProductCard;
