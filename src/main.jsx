import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./components/store/Store";

const KNYApp = () => {
  const [loginUser, setLoginUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App setLoginUser={setLoginUser} />} />
        <Route path="/store" element={<Store loginUser={loginUser} />} />
      </Routes>
    </BrowserRouter>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<KNYApp />);
