import "./register.css";
import { useEffect, useState } from "react";
import GoogleLoginButton from "../social-login/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLoginButton from "../social-login/FacebookLoginButton";

const Register = ({
  setShowFooter,
  onHandleFacebookLogin,
  onHandleGoogleLogin,
  isLoading,
  onHandleRegister,
}) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset the passwordsMatch state when any input changes
    setPasswordsMatch(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if passwords match and update the passwordsMatch state
    setPasswordsMatch(formData.password === e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Simple client-side validation to check if password and confirmation match
    if (!passwordsMatch) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    console.log("Form data submitted:", formData);

    onHandleRegister(formData);
  };

  // Handling Google Login
  // Google Client ID
  const clientId =
    "661359056290-i5sf4uhvskg53h0jhq41eclnh9oa868q.apps.googleusercontent.com";

  const onHandleGoogleLoginSuccess = (response) => {
    onHandleGoogleLogin(response);
    console.log("Sucess ---> ");
  };

  const onHandleGoogleLoginFail = (error) => {
    console.log("Fail ---> ", error);
  };

  // Handling Facebook Login
  const onHandleFacebookLoginSuccess = (response) => {
    onHandleFacebookLogin(response);
  };

  // Hide the Footer in Login Page
  useEffect(() => {
    // This will be executed after the component is mounted
    setShowFooter(false);

    // Return a cleanup function if needed
    return () => {
      // This will be executed when the component is unmounted
      setShowFooter(true);
    };
  }, [setShowFooter]);

  return (
    <>
      {isLoading ? (
        <div class="lds-circle">
          <div></div>
        </div>
      ) : (
        <div className="login_form">
          <h2>Register</h2>

          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name..."
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email..."
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Your Password..."
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Your Confirm Password..."
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{
                borderColor: passwordsMatch ? "" : "red",
              }}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address..."
              value={formData.address}
              onChange={handleInputChange}
              required
            />

            <button type="submit" className="lg_btn">
              Register
            </button>

            <div className="orLine">Or</div>

            <FacebookLoginButton
              onHandleFacebookLoginSuccess={onHandleFacebookLoginSuccess}
            />

            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLoginButton
                onHandleSuccess={onHandleGoogleLoginSuccess}
                onHandleFail={onHandleGoogleLoginFail}
              />
            </GoogleOAuthProvider>

            <h4>
              Already had an account?
              <a href="/login">Login</a>
            </h4>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
