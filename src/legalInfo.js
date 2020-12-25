import React, { Fragment } from "react";
import IconAboutUs from "./asstes/svg/Asset2.svg";
import "./asstes/css/legalInfo.css";
import Header from "./Header.js";
import Footer from "./Footer.js";

export default class LegalInfo extends React.Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <div>
          <div className="main">
            <div className="row">
              <div className="col-sm-4">
                <img
                  className="IconLegalInfo"
                  width="200"
                  height="260"
                  src={IconAboutUs}
                  alt="Icon Legal Info"
                ></img>
              </div>
              <div className="col-sm-8 textLegalInfo">
                <h4>легальная информация</h4>
                <p className="pLegalInfo">
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
