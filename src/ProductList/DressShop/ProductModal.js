import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Slider from "react-slick";

function ProductModal(props) {
  const { selectedProduct, onHide, handleAddToCart } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Modal show={selectedProduct !== null} onHide={onHide}>
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
        <p>Price: {selectedProduct?.price * 0.9}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
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
  );
}

export default ProductModal;
