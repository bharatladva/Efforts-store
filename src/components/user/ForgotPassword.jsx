import React, { useRef, useState } from "react";
import { useAuth } from "../user/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (erorr) {
      console.error(erorr);
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="signin-page-container">
        <div className="signin-page-main">
          <div
            className={`error-alert ${error == "" ? "" : "show-erorr-alert"}`}
          >
            {error}
          </div>

          {message && <div className="alert alert-success">{message}</div>}
          <form className="signin-form" onSubmit={handleSubmit}>
            <h2
              className="form_title title"
              style={{ textAlign: "left", width: "55%" }}
            >
              Password Reset
            </h2>
            <label className="label-text">Email</label>
            <input
              type="email"
              ref={emailRef}
              required
              className="form__input"
            />

            <button
              disabled={loading}
              className="form__button signin-button submit"
              type="submit"
            >
              Reset Password
            </button>
            <div style={{ display: "flex" }}>
              <div
                className="signin-form-link"
                style={{ fontFamily: "Oswald, 'sans-serif'", fontSize: "15px" }}
              >
                Need an account?
                <Link to="/signup">
                  <button
                    className="form__button signin-button"
                    style={{ scale: "0.7", backgroundColor: "darkred" }}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
              <div
                className="signin-form-link"
                style={{ fontFamily: "Oswald, 'sans-serif'", fontSize: "15px" }}
              >
                Already a User?
                <Link to="/signup">
                  <button
                    className="form__button signin-button"
                    style={{ scale: "0.7", backgroundColor: "darkred" }}
                  >
                    Log In
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
