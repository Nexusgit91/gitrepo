// ProductCard.js
import React from "react";
import { Card, Button } from "react-bootstrap";

import SizeForm from "./SizeForm";

function ProductCard({
  product,
  selectedSize,
  setSelectedSize,
  handleAddToCart,
  setSelectedProduct,
}) {
  return (
    <Card
      className="product-card"
      style={{ border: "none", marginBottom: "20px", boxShadow: "none" }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}
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
            <SizeForm sizes={product.sizes} onSelectSize={setSelectedSize} />
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
          disabled={product.quantity >= 5}
        >
          {product.quantity >= 5 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
