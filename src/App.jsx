import "./main.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import {
  Home,
  About,
  Contact,
  Register,
  Login,
  Footer,
} from "./components/PageImport";
import Terms from "./components/terms/Terms";
import { useState } from "react";

const App = ({ setLoginUser }) => {
  const [showFooter, setShowFooter] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [showAlert, setShowAlert] = useState(false); // For showing wrong user name and password message
  const [loginAttempt, setLoginAttempt] = useState(3);

  const navigate = useNavigate();

  // Sending Facebook Data to the Server
  const onHandleFacebookLogin = (fbUserData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/store");
    }, 3000);

    fetch("http://localhost:8080/api/facebook-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: fbUserData.accessToken,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setLoginUser(data);
      })
      .catch((err) => {
        console.error("Error during fetch:", err);
      });
  };

  // Sending Google data to the Server
  const onHandleGoogleLogin = (ggUserdata) => {
    console.log(ggUserdata);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/store");
    }, 3000);

    fetch("http://localhost:8080/api/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: ggUserdata.access_token,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Google Login was Not ok");
        }
        return res.json();
      })
      .then((data) => {
        setLoginUser(data);
      })
      .catch((err) => {
        console.error("Error during fetch: ", err);
      });
  };

  // Sending Normal Register form data to the Server
  const onHandleRegister = (registerData) => {
    console.log(registerData);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/store");
    }, 3000);

    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Register was Not ok");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        console.log("Register Success");
      })
      .catch((err) => {
        console.error("Error during fetch: ", err);
      });
  };

  // Sending login data to the server
  const onHandleLogin = (loginData) => {
    setIsLoading(true);
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Authentication failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log("--> Login Success");
        setIsLoading(false);
        navigate("/store");
      })
      .catch((err) => {
        console.error("Error during login: ", err);
        setIsLoading(false);
        setShowAlert(true);
        setLoginAttempt((prev) => prev - 1);
      });
  };

  return (
    <>
      <div id="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="/register"
              element={
                <Register
                  setShowFooter={setShowFooter}
                  onHandleFacebookLogin={onHandleFacebookLogin}
                  onHandleGoogleLogin={onHandleGoogleLogin}
                  onHandleRegister={onHandleRegister}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setShowFooter={setShowFooter}
                  onHandleFacebookLogin={onHandleFacebookLogin}
                  onHandleGoogleLogin={onHandleGoogleLogin}
                  isLoading={isLoading}
                  onHandleLogin={onHandleLogin}
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
                  loginAttempt={loginAttempt}
                />
              }
            />
          </Route>
        </Routes>
      </div>

      {showFooter && <Footer />}
    </>
  );
};

export default App;
