import React, { Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "./Header.js";
import Footer from "./Footer.js";

import carpet2 from "./asstes/Photos/carpet2.PNG";
import noResult from "./asstes/svg/noResult.svg";

import "./asstes/css/Result.css";

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    const searchData = props.location.search;
    console.log(searchData);
    var data = searchData.split("=")[1];
    this.state = {
      items: [
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
      ],
      Categories: [
        { icon: "fa icon-carpet", Name: "Carpet" },
        { icon: "fa icon-hand-bag", Name: "Bags" },
        { icon: "fa icon-jacket", Name: "Clothes" },
        { icon: "fa icon-page-1", Name: "Handicrafts" },
      ],
      result: true,
      searchConcept: data,
    };
  }

  componentDidMount() {
    var urlDb =
      "http://localhost:8080/Server/rest/getCarpets" + this.state.searchConcept;
    axios(urlDb).then(
      (result) => {
        var MostRecent = result.data.Carpets;
        console.log(MostRecent);
        console.log(MostRecent[1].name);
        this.setState({
          mostRecentCarpets: MostRecent,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ResultOfRangeButton() {
    this.setState({ result: false });
  }

  render() {
    var test;
    if (this.state.items == "") {
      test = false;
    } else {
      test = true;
    }
    var showresult = this.state.result;
    return (
      <Fragment>
        <Header></Header>
        <div class="main">
          {test ? (
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
                <div class="col-4">
                  <div class="addPrice">
                    <label for="customRange3">Price:</label>
                    <br />
                    <input
                      type="range"
                      class="test setradioxleft"
                      min="0"
                      max="60.000"
                      step="1"
                      id="customRange3"
                    />
                    <input
                      type="range"
                      class="test setradioxright"
                      min="61.000"
                      max="100.000"
                      step="1"
                      id="customRange3"
                    />
                    <span class="min">0 ₽</span>
                    <span class="max">60.000 ₽</span>
                    <button
                      class="priceSubmit"
                      onClick={this.ResultOfRangeButton}
                    >
                      {" "}
                      submit
                    </button>
                  </div>
                </div>
                <div class="col-8">
                  {showresult ? (
                    <div>
                      <div class="row">
                        {this.state.items.map((item) => (
                          <Link
                            to={{
                              pathname: "/Details",
                              state: { carpetDetails: item },
                            }}
                            className="col-sm-4 cardMarginResult deleteUnderLink"
                          >
                            <div class="shopCardResult">
                              <p id="shopCardResultName">{item.name}</p>
                              <img
                                id="shopCardResultImage"
                                src={item.src}
                              ></img>
                              <div className="row shopCardResultRow">
                                <span id="shopCardResultPrice">
                                  {item.price}
                                </span>
                                <button
                                  className="ml-auto mr-3"
                                  id="shopCardResultButton"
                                >
                                  <i class="fas fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </Link>
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
        <Footer></Footer>
      </Fragment>
    );
  }
}
