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
    console.log(searchData);
    var data = searchData.split("=")[1];
    this.state = {
      mostRecentCarpets: [],
      Categories: [
        { icon: "fa icon-carpet", Name: "ковер" },
        { icon: "fa icon-hand-bag", Name: "сумки" },
        { icon: "fa icon-jacket", Name: "ткани" },
        { icon: "fa icon-page-1", Name: "Ремесла" },
      ],
      loading: false,
      result: true,
      searchConcept: data,
    };
    this.changSelectedItemBeforLoadPage = this.changSelectedItemBeforLoadPage.bind(
      this
    );
  }

  componentDidUpdate() {
    this.changSelectedItemBeforLoadPage();
  }

  componentDidMount() {
    console.log("here");
    var urlDb =
      configData.SERVER_URL + "getCarpets/" + this.state.searchConcept;
    axios(urlDb).then(
      (result) => {
        var MostRecent = result.data.Carpets;
        this.setState({
          mostRecentCarpets: MostRecent,
          loading: true,
        });
      },
      (error) => {
        this.setState({
          loading: true,
        });
        console.log(error);
      }
    );
  }

  changSelectedItemBeforLoadPage() {
    var Items = localStorage.getItem("ShoppingItems");
    var ShoppingItems = JSON.parse(Items);
    console.log(ShoppingItems);
    for (let i = 0; i < ShoppingItems.length; i++) {
      var item = ShoppingItems[i];
      console.log(item);
      console.log(item.id);
      var elements = document.querySelectorAll("[id='" + item.id + "']");
      console.log(elements);
      for (let j = 0; j < elements.length; j++) {
        var element = elements[j];
        var shopCardButton = element.parentElement;
        element.setAttribute("class", "fa fa-times");
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
      if (butplus.classList[1] == "fa-plus") {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        if (!isAdd) {
          isAdd = true;
          var resItems = addToStorage(ShoppingItems, item);
          localStorage.setItem("ShoppingItems", resItems);
        }
        butplus.setAttribute("class", "fa fa-times");
        shopCardButton.style.background = "rgb(255,0,94)";
      } else {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        var resItems = removeFromStorage(ShoppingItems, item);
        localStorage.setItem("ShoppingItems", resItems);
        butplus.setAttribute("class", "fa fa-plus");
        shopCardButton.style.background = "#651fff";
      }
    }
  }

  ResultOfRangeButton() {
    this.setState({ result: false });
  }

  render() {
    var Result = true;
    console.log(this.state.mostRecentCarpets);
    if (this.state.mostRecentCarpets == "") {
      Result = false;
    } else {
      Result = true;
    }
    var showresult = this.state.result;
    return (
      <Fragment>
        <Header></Header>
        {this.state.loading ? (
          <div class="main">
            {Result ? (
              <div>
                <div class="row setsize ">
                  {this.state.Categories.map((item) => (
                    <Link
                      to={{
                        pathname: "/Result",
                        state: { searchData: item },
                      }}
                      class="col-sm-3 deleteUnderLink"
                    >
                      <div class="setcolor">
                        <i class={item.icon} id="iconCenter"></i>
                        <h5 id="titleCategories">{item.Name}</h5>
                      </div>
                    </Link>
                  ))}
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="addPrice">
                      <RangeSideBar></RangeSideBar>
                      <span class="min">0 ₽</span>
                      <span class="max">60.000 ₽</span>
                      <button
                        class="priceSubmit"
                        onClick={this.ResultOfRangeButton}
                      >
                        {" "}
                        представить
                      </button>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    {showresult ? (
                      <div>
                        <div class="row">
                          {this.state.mostRecentCarpets.map((item) => (
                            <div className="col-sm-4 marginTopResult">
                              <div class="shopCardResult">
                                <Link
                                  to={{
                                    pathname: "/Details",
                                    search:
                                      "?details=" +
                                      item.name +
                                      "&id=" +
                                      item.id,
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
                                    <i id={item.id} class="fas fa-plus"></i>{" "}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div class="paging">
                          <nav aria-label="Page navigation example">
                            <ul class="pagination">
                              <li class="page-item">
                                <a
                                  class="page-link"
                                  href="#"
                                  aria-label="Previous"
                                >
                                  <span aria-hidden="true">&laquo;</span>
                                  <span class="sr-only">Previous</span>
                                </a>
                              </li>
                              <li class="page-item">
                                <a class="page-link" href="#">
                                  1
                                </a>
                              </li>
                              <li class="page-item">
                                <a class="page-link" href="#">
                                  2
                                </a>
                              </li>
                              <li class="page-item">
                                <a class="page-link" href="#">
                                  3
                                </a>
                              </li>
                              <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                                  <span class="sr-only">Next</span>
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <img
                          class="rangebuttonimg"
                          src={noResult}
                          heigh="300"
                          width="250"
                        ></img>
                        <p class="rangebuttonText">No Result!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <img
                  class="noresultimg"
                  src={noResult}
                  heigh="300"
                  width="250"
                ></img>
                <p class="noresultText">No Result!</p>
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
