import React from "react";
import { Link } from "react-router-dom";
import "./asstes/css/Header.css";
import "./asstes/css/global.css";
import testShop from "./asstes/Photos/logo.svg";
import "./asstes/icons/fontello/css/fontello.css";

export default class header extends React.Component {
  constructor(props) {
    super(props);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  openNav() {
    var x = document.getElementsByClassName("header")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("main")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id", "blur");
    document.getElementById("mySidenav").style.width = "35%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    var x = document.getElementsByClassName("header")[0];
    x.setAttribute("id", null);
    var x = document.getElementsByClassName("main")[0];
    x.setAttribute("id", null);
    var x = document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id", null);
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="row">
            <Link to={{ pathname: "/" }} className="headerImage col-2">
              <img src={testShop} />
            </Link>

            <div className="searchBorder col-5" style={{ marginTop: "0" }}>
              <div className="row" id="border">
                <input
                  type="text"
                  id="zoneArea"
                  className="SelectZone col-9"
                  placeholder="&#xF002; Search for carpets, clothes and..."
                ></input>
                <div className=" col-3">
                  <button className="SearchButton" type="submit">
                    <Link to={{ pathname: "/ShoppingItem" }}>
                      <i class="fas icon-cart" id="SearchButtonicon"></i>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <button id="MenuItem" className="col">
              <i
                class="MenuBar fas icon-burger-menu"
                onClick={this.openNav}
              ></i>
            </button>
          </div>
        </div>
        <div id="mySidenav" class="sidenav">
          <i class="closebtn fa fa-times fa-2x" onClick={this.closeNav}></i>
          <div class="row ShowMenu">
            <div class="col-6 marginlist">
              <h3>Products</h3>
              <a class="item" href="#">
                Clothes
              </a>
              <br></br>
              <a class="item" href="#">
                Carpet
              </a>
              <br></br>
              <a class="item" href="#">
                Handicrafts
              </a>
              <br></br>
              <a class="item" href="#">
                Bags
              </a>
            </div>
            <div class="col-6">
              <h3>About Us</h3>
              <Link
                to={{ pathname: "/AboutUs" }}
                className="item deleteUnderLink"
              >
                Introduction
              </Link>
              <br></br>
              <Link
                to={{ pathname: "/LegalInfo" }}
                className="item deleteUnderLink"
              >
                Legal Info
              </Link>
              <br></br>
              <Link
                to={{ pathname: "/Policy" }}
                className="item deleteUnderLink"
              >
                Policy
              </Link>
            </div>
          </div>
          <div class="row ShowMenu ">
            <div class="col-6 ">
              <h3>Support</h3>
              <a class="item" href="#">
                Condition
              </a>
              <br></br>
              <Link
                to={{ pathname: "/Questions" }}
                className="item deleteUnderLink"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
