import React from "react";
import "./Css/Header.css";
import "./Css/global.css";
import testShop from "./shopTest.png";
import "bootstrap/dist/css/bootstrap.css";
import "./Css/fontawesome-free-5.15.1-web/css/all.css";

export default () => {
  return (
    <div className="header">
      <div className="row">
        <img src={testShop} className="headerImage" />
        <div className="searchBorder col-5" style={{ marginTop: "0" }}>
          <div className="row" style={{ height: "80%" }}>
            <input
              type="text"
              id="zoneArea"
              className="SelectZone col-9"
              placeholder="&#xF002; Search for carpets, clothes and..."
            ></input>
            <div className=" col-3">
              <button className="SearchButton" type="submit">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
        <i class="MenuBar fas fa-grip-lines"></i>
      </div>
    </div>
  );
};
