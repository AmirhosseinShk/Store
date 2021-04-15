import React, { Fragment } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import IconAboutUs from "./asstes/svg/Asset3.svg";
import "./asstes/css/policy.css";

export default class Policy extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("ShoppingItems") == "[]") {
      document.getElementById("redDotShopItem").style.display = "none";
    } else {
      document.getElementById("redDotShopItem").style.display = "inline-block";
    }
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div>
          <div className="main">
            <div className="row">
              <div className="col-sm-4">
                <img
                  className="IconPolicy"
                  width="180"
                  height="230"
                  src={IconAboutUs}
                  alt="Icon Policy"
                ></img>
              </div>
              <div className="col-sm-8 textPolicy">
                <h4>политика</h4>
                <p className="pPolicy">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </Fragment>
    );
  }
}
