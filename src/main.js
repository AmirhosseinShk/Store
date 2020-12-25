import React, { Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Flickity from "react-flickity-component";

import Header from "./Header.js";
import Footer from "./Footer.js";
import configData from "./config.json";
import { addToStorage, removeFromStorage } from "./JsonHelperFunction.js";

import "./asstes/css/MainPage.css";
import "./asstes/css/global.css";
import "flickity/css/flickity.css";
import "./asstes/icons/fontello/css/fontello.css";

import LargeHorizontal from "./asstes/Photos/LargeHorizontal.PNG";
import Vertical from "./asstes/Photos/Vertical.PNG";
import SmallHorizontal from "./asstes/Photos/SmallHorizontal.png";
import carpet2 from "./asstes/Photos/carpet2.PNG";

const flickityOptions = {
  initialIndex: 0,
  accessibility: true,
  cellAlign: "left",
  dragThreshold: 3,
  freeScrollFriction: 2,
  percentPosition: true,
  resize: true,
  draggable: true,
  pageDots: false,
  setGallerySize: true,
  // prevNextButtons: false,
  // namespaceJQueryEvents: true,
  arrowShape: { x0: 10, x1: 40, y1: 30, x2: 50, y2: 30, x3: 20 },
  //pauseAutoPlayOnHover: false,
};

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    var ShoppingItems = localStorage.getItem("ShoppingItems");
    if (ShoppingItems == null) {
      ShoppingItems = new Array();
      localStorage.setItem("ShoppingItems", JSON.stringify(ShoppingItems));
      localStorage.setItem("totalPrice", 0);
    }
    this.state = {
      Categories: [
        { icon: "fa icon-carpet", Name: "ковер" },
        { icon: "fa icon-hand-bag", Name: "сумки" },
        { icon: "fa icon-jacket", Name: "ткани" },
        { icon: "fa icon-page-1", Name: "Ремесла" },
      ],
      mostRecentCarpets: [],
      popularCarpets: [],
    };
    this.refreshFlickity = this.refreshFlickity.bind(this);
    this.changSelectedItemBeforLoadPage = this.changSelectedItemBeforLoadPage.bind(
      this
    );
  }

  componentDidMount() {
    var urlDb = configData.SERVER_URL + "getMostRecent";
    axios(urlDb).then(
      (result) => {
        var MostRecent = result.data.Carpets;
        this.setState({
          mostRecentCarpets: MostRecent,
        });
      },
      (error) => {
        console.log(error);
      }
    );

    urlDb = configData.SERVER_URL + "getPopularCarpet";
    axios(urlDb).then(
      (result) => {
        var popular = result.data.Carpets;
        this.setState({
          popularCarpets: popular,
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.refreshFlickity();
  }

  componentDidUpdate() {
    this.changSelectedItemBeforLoadPage();
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
        element.setAttribute("class", "fa fa-times");
        shopCardButton.style.background = "rgb(255,0,94)";
      }
    }
  }

  changIcon(event, item) {
    var butplusItem = event.target;
    if (event.target.id === "shopCardButton") {
      butplusItem = event.target.firstChild;
    }
    var elements = document.querySelectorAll("[id='" + butplusItem.id + "']");
    var isAdd = false;
    for (let j = 0; j < elements.length; j++) {
      var butplus = elements[j];
      var shopCardButton = butplus.parentElement;
      if (butplus.classList[1] === "fa-plus") {
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

  refreshFlickity() {
    this.flkty.resize();
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div className="main">
          <div className="row" style={{ height: "80%" }}>
            <div className="col-sm-9">
              <img
                className="HorizontalImge"
                src={LargeHorizontal}
                alt="picture1"
              ></img>
              <div className="row">
                <div className="col-sm-9">
                  <h4 className="category">Категории</h4>
                  <div className="row">
                    {this.state.Categories.map((item) => (
                      <Link
                        to={{
                          pathname: "/Result",
                          search: "?search=" + item.Name,
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
                </div>
                <div className="col-sm-3">
                  <img
                    className="HorizontalImge2"
                    src={SmallHorizontal}
                    alt="picture3"
                  ></img>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <img className="VerticalImge" src={Vertical} alt="picture1"></img>
            </div>
          </div>
          <div className="recent">
            <h4>самый последний</h4>
            <Flickity
              flickityRef={(c) => (this.flkty = c)}
              className={"carousel"} // default ''
              elementType={"div"} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate={true} // default false
              static={false} // default false
            >
              {this.state.mostRecentCarpets.map((item) => (
                <div className="col-md-3">
                  <div className="shopCard">
                    <Link
                      to={{
                        pathname: "/Details/" + item.id,
                        search: "?details=" + item.name,
                      }}
                      className="deleteUnderLink"
                    >
                      <p id="shopCardName">{item.name}</p>
                      <img id="shopCardImage" src={carpet2} alt="carpet"></img>
                    </Link>
                    <div className="row shopCardRow">
                      <span id="shopCardPrice">{item.price} ₽</span>
                      <button
                        className="ml-auto mr-3 shopCardButton"
                        id="shopCardButton"
                        onClick={(e) => this.changIcon(e, item)}
                      >
                        <i id={item.id} className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Flickity>
          </div>
          <div className="popular">
            <h4>популярный продукт</h4>
            <Flickity
              flickityRef={(c) => (this.flkty = c)}
              className={"carousel"} // default ''
              elementType={"div"} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate={true} // default false
              static={false} // default false
            >
              {this.state.popularCarpets.map((item) => (
                <div className="col-md-3">
                  <div className="shopCard">
                    <Link
                      to={{
                        pathname: "/Details/" + item.id,
                        search: "?details=" + item.name,
                      }}
                      className="deleteUnderLink"
                    >
                      <p id="shopCardName">{item.name}</p>
                      <img id="shopCardImage" src={carpet2} alt="carpet"></img>
                    </Link>
                    <div className="row shopCardRow">
                      <span id="shopCardPrice">{item.price} ₽</span>
                      <button
                        className="ml-auto mr-3 shopCardButton"
                        onClick={(e) => this.changIcon(e, item)}
                      >
                        <i id={item.id} className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Flickity>
          </div>
        </div>
        <Footer></Footer>
      </Fragment>
    );
  }
}

export default MainPage;
