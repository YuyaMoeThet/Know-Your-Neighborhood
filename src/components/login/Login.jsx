import "./login.css";
import { useEffect, useState } from "react";
import GoogleLoginButton from "../social-login/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLoginButton from "../social-login/FacebookLoginButton";

const Login = ({
  setShowFooter,
  onHandleFacebookLogin,
  onHandleGoogleLogin,
  isLoading,
  onHandleLogin,
  showAlert,
  setShowAlert,
  loginAttempt,
}) => {
  // Not Shwoing Footer in Login Page
  useEffect(() => {
    setShowFooter(false); // This will be executed after the component is mounted

    return () => {
      // Return a cleanup function if needed

      setShowFooter(true); // This will be executed when the component is unmounted
    };
  }, [setShowFooter]);

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onHandleLogin(formData);
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

  return (
    <>
      {loginAttempt === 0 && (
        <div className="alert">
          Incorrect too many times! We unlocked for a moment!
        </div>
      )}
      {showAlert && (
        <div className="alert">
          <p>Incorrect Credentials</p>
          <button onClick={() => setShowAlert(false)}>Ok</button>
        </div>
      )}

      {isLoading ? (
        <div class="lds-circle">
          <div></div>
        </div>
      ) : (
        <div className="login_form">
          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="📧..."
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="🔑..."
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <button
              type="submit"
              className={`lg_btn ${loginAttempt === 0 ? "disable" : ""}`}
              disabled={loginAttempt === 0}
            >
              Login
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
              Don't have account? <a href="/register">Register</a>
            </h4>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
