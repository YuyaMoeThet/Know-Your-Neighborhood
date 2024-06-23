import "./store.css";
import { Link, NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
const Store = () => {
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/store")
      .then((res) => res.json())
      .then((data) => {
        setStoreData(data);
      });
  }, []);

  //  Store lists for Right Side Bar
  const storeLists = storeData?.map((store, index) => {
    return (
      <li key={index} className="table-row">
        <div className="col col-1" data-label="Job Id">
          {store.id}
        </div>
        <div className="col col-2" data-label="Customer Name">
          {store.name}
        </div>
        <div className="col col-3" data-label="Amount">
          {store.email}
        </div>
        <div className="col col-4" data-label="Payment Status">
          {store.userType}
        </div>
      </li>
    );
  });

  return (
    <>
      <header>
        <h2 className="logo">KYN</h2>
        <nav>
          <ul className="nav_link">
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/about"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/contact"
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : null)}
                to="/terms"
              >
                Terms
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="btn">
          <span>{storeData[storeData.length - 1]?.name}</span>
          {/* <img src={storeData[storeData.length - 1]?.picture} alt="" /> */}
          {storeData[storeData.length - 1]?.userType == "Facebook" ? (
            <img
              src="../../img/avater-1.svg"
              alt="Facebook Profile"
              className="avator"
            />
          ) : storeData[storeData.length - 1]?.userType == "Google" ? (
            <img
              className="avator"
              src="../../img/google-avater.jpg"
              alt="Normal Profile"
            />
          ) : (
            <img
              className="avator"
              src="../../img/avator.jpg"
              alt="Normal Profile"
            />
          )}
        </div>
      </header>

      <div className="store">
        <h2>
          Store Lists of KYN<small></small>
        </h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">ID</div>
            <div className="col col-2">Name</div>
            <div className="col col-3">Email</div>
            <div className="col col-4">Address</div>
          </li>
          {storeLists}
        </ul>
      </div>
    </>
  );
  {
  }
};

export default Store;
