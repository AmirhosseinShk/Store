import React, { Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "./Header.js";
import Footer from "./Footer.js";
import RangeSideBar from "./RangeSideBar.js";
import configData from "./config.json";
import { addToStorage, removeFromStorage } from "./JsonHelperFunction.js";

import carpet2 from "./asstes/Photos/carpet2.PNG";
import noResult from "./asstes/svg/noResult.svg";

import "./asstes/css/Result.css";
import "./asstes/css/global.css";

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    const searchData = props.location.search;
    // console.log(searchData);
    var data = searchData.split("=")[1];
    this.state = {
      searchResultCarpet: [],
      filteredSearchResult: [],
      Categories: [
        { icon: "fa icon-carpet", Name: "ковер" },
        { icon: "fa icon-hand-bag", Name: "сумки" },
        { icon: "fa icon-jacket", Name: "ткани" },
        { icon: "fa icon-page-1", Name: "Ремесла" },
      ],
      loading: false,
      result: true,
      searchConcept: data,
      width: window.innerWidth,
      maxPrice: 0,
      sidebarValue: [],
    };
    this.changSelectedItemBeforLoadPage = this.changSelectedItemBeforLoadPage.bind(
      this
    );
    this.ResultOfRangeButton = this.ResultOfRangeButton.bind(this);
    this.handleChangeSideBar = this.handleChangeSideBar.bind(this);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidUpdate() {
    this.changSelectedItemBeforLoadPage();
  }

  componentDidMount() {
    // console.log("here");
    var urlDb =
      configData.SERVER_URL + "getCarpets/" + this.state.searchConcept;
    axios(urlDb).then(
      (result) => {
        var resultSearch = result.data.Carpets;
        var maxPrice = 0;
        for (let i = 0; i < resultSearch.length; i++) {
          if (resultSearch[i].price > maxPrice) {
            maxPrice = resultSearch[i].price;
          }
        }
        this.setState({
          searchResultCarpet: resultSearch,
          filteredSearchResult: resultSearch,
          loading: true,
          maxPrice: maxPrice,
        });
      },
      (error) => {
        this.setState({
          loading: true,
        });
        console.log(error);
      }
    );

    if (localStorage.getItem("ShoppingItems") == "[]") {
      document.getElementById("redDotShopItem").style.display = "none";
    } else {
      document.getElementById("redDotShopItem").style.display = "inline-block";
    }
  }

  changSelectedItemBeforLoadPage() {
    var Items = localStorage.getItem("ShoppingItems");
    var ShoppingItems = JSON.parse(Items);
    for (let i = 0; i < ShoppingItems.length; i++) {
      var item = ShoppingItems[i];
      var elements = document.querySelectorAll("[id='" + item.id + "']");
      for (let j = 0; j < elements.length; j++) {
        var element = elements[j];
        var shopCardButton = element.parentElement;
        element.setAttribute("class", "fa icon-close closeicon");
        shopCardButton.style.background = "rgb(255,0,94)";
      }
    }
  }

  changIcon(event, item) {
    var butplusItem = event.target;
    if (event.target.id == "shopCardResultButton") {
      butplusItem = event.target.firstChild;
    }
    var elements = document.querySelectorAll("[id='" + butplusItem.id + "']");
    var isAdd = false;
    for (let j = 0; j < elements.length; j++) {
      var butplus = elements[j];
      var shopCardButton = butplus.parentElement;
      if (butplus.classList[1] == "icon-plus2") {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        if (!isAdd) {
          isAdd = true;
          var resItems = addToStorage(ShoppingItems, item);
          localStorage.setItem("ShoppingItems", resItems);
        }
        butplus.setAttribute("class", "fa icon-close closeicon");
        shopCardButton.style.background = "rgb(255,0,94)";
      } else {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        var resItems = removeFromStorage(ShoppingItems, item);
        localStorage.setItem("ShoppingItems", resItems);
        butplus.setAttribute("class", "fa icon-plus2 plus");
        shopCardButton.style.background = "#651fff";
      }
    }
    if (localStorage.getItem("ShoppingItems") == "[]") {
      document.getElementById("redDotShopItem").style.display = "none";
    } else {
      document.getElementById("redDotShopItem").style.display = "inline-block";
    }
  }

  handleChangeSideBar(value) {
    console.log(value);
    this.setState({
      sidebarValue: value,
    });
    return value;
  }

  ResultOfRangeButton() {
    console.log(this.state.sidebarValue);
    var min = this.state.sidebarValue[0];
    var max = this.state.sidebarValue[1];
    var resultSearch = this.state.searchResultCarpet;
    var filteredSearchResult = new Array();
    for (let i = 0; i < resultSearch.length; i++) {
      if ((resultSearch[i].price <= max) & (resultSearch[i].price >= min)) {
        filteredSearchResult.push(resultSearch[i]);
      }
    }
    if (filteredSearchResult.length > 0) {
      this.setState({
        filteredSearchResult: filteredSearchResult,
        result: true,
      });
    } else {
      this.setState({ result: false });
    }
  }

  render() {
    var Result = true;
    if (this.state.searchResultCarpet == "") {
      Result = false;
    } else {
      Result = true;
    }
    var showresult = this.state.result;
    const { width } = this.state;
    const isMobile = width <= 978;
    if (!isMobile) {
      return (
        <Fragment>
          <Header></Header>
          {this.state.loading ? (
            <div className="main">
              {Result ? (
                <div>
                  <div className="row setsize ">
                    {this.state.Categories.map((item) => (
                      <Link
                        to={{
                          pathname: "/Result",
                          state: { searchData: item },
                        }}
                        className="col-sm-3 deleteUnderLink"
                      >
                        <div className="setcolor">
                          <i className={item.icon} id="iconCenter"></i>
                          <h5 id="titleCategories">{item.Name}</h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="addPrice">
                        <RangeSideBar
                          handleChangeSideBar={this.handleChangeSideBar}
                          maxPrice={this.state.maxPrice}
                        ></RangeSideBar>
                        <span className="min">0 ₽</span>
                        <span className="max">{this.state.maxPrice} ₽</span>
                        <button
                          className="priceSubmit"
                          onClick={this.ResultOfRangeButton}
                        >
                          представить
                        </button>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      {showresult ? (
                        <div>
                          <div className="row">
                            {this.state.filteredSearchResult.map((item) => (
                              <div className="col-sm-4 marginTopResult">
                                <div className="shopCardResult">
                                  <Link
                                    to={{
                                      pathname: "/Details/" + item.id,
                                      search: "?details=" + item.name,
                                    }}
                                    className="deleteUnderLink "
                                  >
                                    <p id="shopCardResultName">{item.name}</p>
                                    <img
                                      id="shopCardResultImage"
                                      src={carpet2}
                                    ></img>
                                  </Link>
                                  <div className="row shopCardResultRow">
                                    <span id="shopCardResultPrice">
                                      {item.price}
                                    </span>
                                    <button
                                      className="ml-auto mr-3"
                                      id="shopCardResultButton"
                                      onClick={(e) => this.changIcon(e, item)}
                                    >
                                      <i
                                        id={item.id}
                                        className="fas icon-plus2 plus"
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="paging">
                            <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Previous"
                                  >
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    1
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    2
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    3
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Next"
                                  >
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <img
                            className="rangebuttonimg"
                            src={noResult}
                            heigh="300"
                            width="250"
                          ></img>
                          <p className="rangebuttonText">No Result!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <img
                    className="noresultimg"
                    src={noResult}
                    heigh="300"
                    width="250"
                  ></img>
                  <p className="noresultText">No Result!</p>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
          <Footer></Footer>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Header></Header>
          {this.state.loading ? (
            <div className="main">
              {Result ? (
                <div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="addPrice">
                        <RangeSideBar
                          handleChangeSideBar={this.handleChangeSideBar}
                          maxPrice={this.state.maxPrice}
                        ></RangeSideBar>
                        <span className="min">0 ₽</span>
                        <span className="max">{this.state.maxPrice} ₽</span>
                        <button
                          className="priceSubmit"
                          onClick={this.ResultOfRangeButton}
                        >
                          представить
                        </button>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      {showresult ? (
                        <div>
                          <div className="row">
                            {this.state.filteredSearchResult.map((item) => (
                              <div className="col-6 marginTopResult">
                                <div className="shopCardResult">
                                  <Link
                                    to={{
                                      pathname: "/Details/" + item.id,
                                      search: "?details=" + item.name,
                                    }}
                                    className="deleteUnderLink "
                                  >
                                    <p id="shopCardResultName">{item.name}</p>
                                    <img
                                      id="shopCardResultImage"
                                      src={carpet2}
                                    ></img>
                                  </Link>
                                  <div className="row shopCardResultRow">
                                    <span id="shopCardResultPrice">
                                      {item.price}
                                    </span>
                                    <button
                                      className="ml-auto mr-3"
                                      id="shopCardResultButton"
                                      onClick={(e) => this.changIcon(e, item)}
                                    >
                                      <i
                                        id={item.id}
                                        className="fas icon-plus2 plus"
                                      ></i>{" "}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="paging">
                            <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Previous"
                                  >
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    1
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    2
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    3
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Next"
                                  >
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <img
                            className="rangebuttonimg"
                            src={noResult}
                            heigh="300"
                            width="250"
                          ></img>
                          <p className="rangebuttonText">No Result!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <img
                    className="noresultimg"
                    src={noResult}
                    heigh="300"
                    width="250"
                  ></img>
                  <p className="noresultText">No Result!</p>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
          <Footer></Footer>
        </Fragment>
      );
    }
  }
}
