import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //send the email to the backend
      body: JSON.stringify({ email }),
    });
    setIsSubmitting(false);
    if (response.ok) {
      // Email sent successfully
      setSuccessMessage(
        "An email with password reset instructions has been sent to your email address."
      );
    } else {
      // Error sending email
      const data = await response.json();
      setErrorMessage(
        data.message ||
          "An error occurred while sending the email. Please try again later."
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Form
        onSubmit={handleSubmit}
        className="border p-4 rounded"
        style={{ marginTop: "100px", width: "30%", border: "2px solid black" }}
      >
        <h1 className="text-center mb-4">Forgot Password</h1>
        {successMessage && <p className="text-success">{successMessage}</p>}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Form.Group>
          <Form.Label className="d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            Email:
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Password Reset Email"}
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPassword;
