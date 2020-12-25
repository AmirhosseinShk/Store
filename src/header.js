import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./asstes/css/Header.css";
import "./asstes/css/global.css";
import maximShop from "./asstes/Photos/logo.svg";
import "./asstes/icons/fontello/css/fontello.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });

export default class header extends React.Component {
  constructor(props) {
    super(props);
    var searchValue = null;
    if (window.location.href.split("search=")[1] !== undefined) {
      searchValue = decodeURI(window.location.href.split("search=")[1]);
    }
    this.state = {
      carpets: ["Iranian Carpet", "Tabriz Carpet", "Esfehan Carpet"],
      searchDefaultValue: searchValue,
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.searhResult = this.searhResult.bind(this);
    this.searhResultClick = this.searhResultClick.bind(this);
  }

  openNav() {
    var header = document.getElementsByClassName("header")[0];
    header.setAttribute("id", "blur");
    var main = document.getElementsByClassName("main")[0];
    main.setAttribute("id", "blur");
    var footer = document.getElementsByClassName("MainFooter")[0];
    footer.setAttribute("id", "blur");
    document.getElementById("mySidenav").style.width = "35%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    var header = document.getElementsByClassName("header")[0];
    header.setAttribute("id", null);
    var main = document.getElementsByClassName("main")[0];
    main.setAttribute("id", null);
    var footer = document.getElementsByClassName("MainFooter")[0];
    footer.setAttribute("id", null);
  }

  searhResult(e) {
    if (e.keyCode === 13) {
      history.push({
        pathname: "/Result",
        search: "?search=" + e.target.value,
      });
    }
  }

  searhResultClick(e, v) {
    history.push({
      pathname: "/Result",
      search: "?search=" + v,
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="row">
            <Link to={{ pathname: "/" }} className="headerImage col-sm-2">
              <img src={maximShop} alt="maximShop" />
            </Link>

            <div className="searchBorder col-sm-5" style={{ marginTop: "0" }}>
              <div className="row" id="border">
                {/* <input
                  type="text"
                  id="zoneArea"
                  className="SelectZone col-9"
                  placeholder="&#xF002; Search for carpets, clothes and..."
                  onKeyDown={this.searhResult}
                ></input> */}
                <Autocomplete
                  id="combo-box-demo"
                  className="SelectZone col-9"
                  options={this.state.carpets}
                  getOptionLabel={(option) => option}
                  onChange={this.searhResultClick}
                  defaultValue={this.state.searchDefaultValue}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="&#xF002; поиск ковров, тряпок и ..."
                      variant="outlined"
                      onKeyDown={this.searhResult}
                    />
                  )}
                />
                <div className="col-3 margintop-sm">
                  <Link to={{ pathname: "/ShoppingItem" }}>
                    <button className="SearchButton" type="submit">
                      <i class="fas icon-cart" id="SearchButtonicon"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <button id="MenuItem" className="col-sm">
              <i
                className="MenuBar fas icon-burger-menu"
                onClick={this.openNav}
              ></i>
            </button>
          </div>
        </div>
        <div id="mySidenav" className="sidenav">
          <i className="closebtn fas icon-close" onClick={this.closeNav}></i>
          <div className="row ShowMenu">
            <div className="col-sm-6 marginlist">
              <h3>товар</h3>
              <a className="item deleteUnderLink" href="#">
                ткани
              </a>
              <br></br>
              <a className="item deleteUnderLink" href="#">
                ковер
              </a>
              <br></br>
              <a className="item deleteUnderLink" href="#">
                Ремесла
              </a>
              <br></br>
              <a className="item deleteUnderLink" href="#">
                сумки
              </a>
            </div>
            <div className="col-sm-6 marginlist">
              <h3>насчет нас</h3>
              <Link
                to={{ pathname: "/AboutUs " }}
                className="item deleteUnderLink"
              >
                введение
              </Link>
              <br></br>
              <Link
                to={{ pathname: "/LegalInfo " }}
                className="item deleteUnderLink"
              >
                легальная информация
              </Link>
              <br></br>
              <Link
                to={{ pathname: "/Policy" }}
                className="item deleteUnderLink"
              >
                политика
              </Link>
            </div>
          </div>
          <div className="row ShowMenu ">
            <div className="col-sm-6 marginlist">
              <h3>поддержка</h3>
              <a className="item deleteUnderLink" href="#">
                условия
              </a>
              <br></br>
              <Link to={{ pathname: "/FAQ" }} className="item deleteUnderLink">
                часто задаваемые вопросы
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
