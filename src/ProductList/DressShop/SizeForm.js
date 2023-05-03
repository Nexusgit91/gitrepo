// SizeForm.js
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";

function SizeForm({ sizes, onSelectSize }) {
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    onSelectSize(e.target.value);
  };

  return (
    <Form style={{ width: "90px", marginTop: "10px", marginBottom: "10px" }}>
      <Form.Group controlId="formSize">
        <div style={{ position: "relative" }}>
          <Form.Control
            as="select"
            onChange={handleSizeChange}
            value={selectedSize}
            style={{ paddingRight: "30px" }}
          >
            <option value=""> Size</option>
            {sizes.map((size) => (
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
  );
}

export default SizeForm;
