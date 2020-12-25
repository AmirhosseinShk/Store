import React, { Fragment } from "react";
import IconAboutUs from "./asstes/svg/Asset1.svg";
import "./asstes/css/aboutUs.css";
import Header from "./Header.js";
import Footer from "./Footer.js";

export default class AboutUs extends React.Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <div>
          <div class="main">
            <div class="row">
              <div class="col-sm-4">
                <img
                  class="IconAboutUs"
                  width="150"
                  height="210"
                  src={IconAboutUs}
                  alt="Icon About Us"
                ></img>
              </div>
              <div class="col-sm-8 textAboutUs">
                <h4>насчет нас</h4>
                <p class="paboutus">
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
