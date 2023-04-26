// import React, { useState } from "react";

// function QuantityForm() {
//   const [name, setName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const data = {
//       name: name,
//       quantity: quantity,
//     };
//     console.log(data);

//     fetch("api/quantitydress", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setName("");
//         setQuantity("");
//         console.log("Success:", data);
//         setMessage(data.message);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div className="container">
//       <h1>Item Form</h1>
//       {message && <div className="alert alert-danger">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="quantity">Quantity</label>
//           <input
//             type="text"
//             className="form-control"
//             id="quantity"
//             value={quantity}
//             onChange={(event) => setQuantity(event.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// //// Define schema for the data
// const quantitySchema = new mongoose.Schema({
//   name: String,
//   quantity: Number,
// });

// // Create model from schema
// const Quantity = mongoose.model("Quantity", quantitySchema);

// // Routes
// app.post("/api/quantitydress", async (req, res) => {
//   const { name, quantity } = req.body;

//   try {
//     const existingQuantity = await Quantity.findOne({ name });
//     if (existingQuantity) {
//       return res.status(400).json({ message: "Product already exists" });
//     }

//     // Create a new document using the Quantity model
//     const newQuantity = new Quantity({
//       name,
//       quantity,
//     });

//     // Save the document to the database
//     await newQuantity.save();
//     res.status(200).json({ message: "Data saved successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Routes
// app.get("/api/quantitydress", async (req, res) => {
//   try {
//     const quantities = await Quantity.find({});
//     res.status(200).json(quantities);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });
// export default QuantityForm;
