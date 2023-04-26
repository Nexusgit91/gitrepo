import { useState } from "react";

function DressForm() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Preview images
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // do something with reader.result
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image-${index}`, image);
    });

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="images">Upload Images:</label>
        <input
          type="file"
          className="form-control-file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
        {images.map((image) => (
          <img
            key={image.name}
            src={URL.createObjectURL(image)}
            alt={image.name}
          />
        ))}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
export default DressForm;
