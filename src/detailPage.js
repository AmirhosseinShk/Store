import React, { Fragment } from "react";
import axios from "axios";
import Flickity from "react-flickity-component";
import { Link } from "react-router-dom";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";

import Header from "./Header.js";
import Footer from "./Footer.js";
import configData from "./config.json";
import { addToStorage, removeFromStorage } from "./JsonHelperFunction.js";

import "./asstes/css/detailPage.css";
import "flickity/css/flickity.css";
import "./asstes/css/global.css";

import carpetTop from "./asstes/Photos/Capture_page2.PNG";
import carpet from "./asstes/Photos/carpet.PNG";
import close from "./asstes/svg/close.svg";
import IconChecked from "./asstes/svg/checked.svg";

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

function filmin(arr) {
  for (var i = 1; i < 61; i++) {
    arr[i - 1] = i;
  }
  return arr;
}

function filhour(arr) {
  for (var i = 1; i < 24; i++) {
    arr[i - 1] = i;
  }
  arr[23] = "00";
  return arr;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    var id = this.props.match.params.id;
    var Items = localStorage.getItem("ShoppingItems");
    var ShoppingItems;
    if (Items == null) {
      ShoppingItems = new Array();
      localStorage.setItem("ShoppingItems", JSON.stringify(ShoppingItems));
      localStorage.setItem("totalPrice", 0);
    } else {
      var ShoppingItems = JSON.parse(Items);
    }
    this.state = {
      ItemShop: ShoppingItems,
      itemDetails: null,
      totalprice: 0,
      Brand: "test",
      Inventory: "test",
      DeliveryTime: "test",
      CarpetName: "test",
      CarpetPrice: "999999",
      SrcImage: "",
      SrcImages: [
        "/Photos/carpet.PNG",
        "/Photos/carpet.PNG",
        "/Photos/carpet.PNG",
        "/Photos/carpet.PNG",
      ],
      CarpetPrice: 0,
      CarpetDisPrice: 0,
      deleteElement: [],
      popularCarpets: [],
      carpetSize: [],
      id: id,
      attributes: "",
      year: null,
      month: null,
      day: null,
      minute: [],
      hour: [],
      width: window.innerWidth,
      isBlur: true,
      name: "",
      address: "",
      email: "",
      phoneNumber: 0,
      selectedHour: 0,
      selectedMin: 0,
    };
    this.setValueCheckbox = this.setValueCheckbox.bind(this);
    this.changSelectedItemBeforLoadPage = this.changSelectedItemBeforLoadPage.bind(
      this
    );
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
    this.sendTourOrder = this.sendTourOrder.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeHour = this.handleChangeHour.bind(this);
    this.handleChangeMin = this.handleChangeMin.bind(this);
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

  componentDidMount() {
    var urlDb = configData.SERVER_URL + "getPopularCarpet";
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

    var urlDb = configData.SERVER_URL + "getCarpet/" + this.state.id;
    axios(urlDb).then(
      (result) => {
        var details = result.data;
        var sizeItem = new Array();
        for (var j = 0; j < details.size.length; j++) {
          sizeItem.push(details.size[j].replace("*", " x ") + " m");
        }

        var srcImageItem = new Array();
        for (var j = 0; j < details.imageSrcs.length; j++) {
          srcImageItem.push(details.imageSrcs[j]);
        }

        var attributes = JSON.parse(details.attributes);
        this.setState({
          carpetSize: sizeItem,
          attributes: attributes,
          Brand: details.brand,
          DeliveryTime: details.deliveryTime,
          Inventory: details.inventory,
          CarpetName: details.name,
          CarpetPrice: details.price,
          CarpetPrice: details.price,
          SrcImage: details.imageSrc,
          //SrcImages: details.imageSrcs,
          CarpetDisPrice: details.discountPrice,
          itemDetails: details,
        });
        console.log(details);
      },
      (error) => {
        console.log(error);
      }
    );
    this.refreshFlickity();

    if (localStorage.getItem("ShoppingItems") == "[]") {
      document.getElementById("redDotShopItem").style.display = "none";
    } else {
      document.getElementById("redDotShopItem").style.display = "inline-block";
    }

    var arrmin = filmin(this.state.minute);
    var arrhour = filhour(this.state.hour);
    this.setState({ minute: arrmin });
    this.setState({ hour: arrhour });
  }

  componentDidUpdate() {
    this.changSelectedItemBeforLoadPage();
  }

  componentWillReceiveProps(nextProps) {
    var currentID = nextProps.match.params.id;
    var urlDb = configData.SERVER_URL + "getPopularCarpet";
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

    var urlDb = configData.SERVER_URL + "getCarpet/" + currentID;
    axios(urlDb).then(
      (result) => {
        var details = result.data;
        var sizeItem = new Array();
        for (var j = 0; j < details.size.length; j++) {
          sizeItem.push(details.size[j]);
        }

        var srcImageItem = new Array();
        for (var j = 0; j < details.imageSrcs.length; j++) {
          srcImageItem.push(details.imageSrcs[j]);
        }

        var attributes = JSON.parse(details.attributes);

        this.setState({
          carpetSize: sizeItem,
          attributes: attributes,
          Brand: details.brand,
          DeliveryTime: details.deliveryTime,
          Inventory: details.Inventory,
          CarpetName: details.name,
          CarpetPrice: details.price,
          CarpetPrice: details.price,
          SrcImage: details.imageSrc,
          //SrcImages: details.imageSrcs,
          CarpetDisPrice: details.discountPrice,
          itemDetails: details,
          id: currentID,
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.refreshFlickity();
    var arrmin = filmin(this.state.minute);
    var arrhour = filhour(this.state.hour);
    this.setState({ minute: arrmin });
    this.setState({ hour: arrhour });
  }

  changSelectedItemBeforLoadPage() {
    var Items = localStorage.getItem("ShoppingItems");
    var ShoppingItems = JSON.parse(Items);
    var isFind = false;
    for (let i = 0; i < ShoppingItems.length; i++) {
      var item = ShoppingItems[i];
      if (item.id == this.state.id) {
        isFind = true;
      }
      var elements = document.querySelectorAll("[id='" + item.id + "']");
      for (let j = 0; j < elements.length; j++) {
        var element = elements[j];
        var shopCardButton = element.parentElement;
        element.setAttribute("class", "fa icon-close closeicon");
        shopCardButton.style.background = "rgb(255,0,94)";
      }
    }
    if (!isFind) {
      var element = document.getElementById(this.state.id);
      var shopCardButton = element.parentElement;
      element.setAttribute("class", "fa icon-plus2 plus");
      shopCardButton.style.background = "#651fff";
    }
  }

  refreshFlickity() {
    this.flkty.resize();
  }

  setValueCheckbox(event) {
    this.setState({ checkValue: "#" + event.target.value });
  }

  changIcon(event, item) {
    var butplusItem = event.target;
    if (event.target.id == "shopCardButton") {
      butplusItem = event.target.firstChild;
    }
    var elements = document.querySelectorAll("[id='" + butplusItem.id + "']");
    var reapeted = false;
    var ShoppingItems = localStorage.getItem("ShoppingItems");
    for (let j = 0; j < elements.length; j++) {
      var butplus = elements[j];
      var shopCardButton = butplus.parentElement;
      if (butplus.classList[1] == "icon-plus2") {
        if (!reapeted) {
          var resItems = addToStorage(ShoppingItems, item);
          localStorage.setItem("ShoppingItems", resItems);
          reapeted = true;
        }
        butplus.setAttribute("class", "fa icon-close closeicon");
        shopCardButton.style.background = "rgb(255,0,94)";
      } else {
        if (!reapeted) {
          var resItems = removeFromStorage(ShoppingItems, item);
          localStorage.setItem("ShoppingItems", resItems);
          reapeted = true;
        }
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

  checkId(Items, id) {
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].id == id) {
        return true;
      }
    }
  }

  calculateTotalPrice() {
    //Add current item to shoppint item
    var item = this.state.itemDetails;
    var ShoppingItems = localStorage.getItem("ShoppingItems");
    var parsedShoppingItems = JSON.parse(ShoppingItems);

    if (!this.checkId(parsedShoppingItems, item.id)) {
      var resItems = addToStorage(ShoppingItems, item);
      localStorage.setItem("ShoppingItems", resItems);
    }

    var Items = localStorage.getItem("ShoppingItems");
    var ShoppingItems = JSON.parse(Items);
    var totalPrice = 0;
    for (let i = 0; i < ShoppingItems.length; i++) {
      totalPrice += ShoppingItems[i].price;
    }
    this.setState({ totalprice: totalPrice, ItemShop: ShoppingItems });
  }

  handleBlur() {
    var header = document.getElementsByClassName("header")[0];
    var main = document.getElementsByClassName("main")[0];
    var footer = document.getElementsByClassName("MainFooter")[0];
    if (this.state.isBlur) {
      header.setAttribute("class", "header modalBlur");
      main.setAttribute("class", "main modalBlur");
      footer.setAttribute("class", "MainFooter modalBlur");
      this.setState({ isBlur: false });
    } else {
      header.setAttribute("class", "header");
      main.setAttribute("class", "main");
      footer.setAttribute("class", "MainFooter");
      this.setState({ isBlur: true });
    }
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangeAddress(e) {
    this.setState({ address: e.target.value });
  }

  handleChangeNumber(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  handleChangeHour(e) {
    this.setState({ selectedHour: e.target.value });
  }

  handleChangeMin(e) {
    this.setState({ selectedMin: e.target.value });
  }

  sendOrder() {
    var shoppingItems = this.state.ItemShop;
    var carpetsID = [];
    for (let i = 0; i < shoppingItems.length; i++) {
      carpetsID.push(shoppingItems[i].id);
    }

    console.log(this.state.totalprice);

    let data = {
      name: this.state.name,
      email: this.state.email,
      contactNumber: this.state.phoneNumber,
      address: this.state.address,
      carpetIds: carpetsID,
      totalAmount: this.state.totalprice,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    var dataJson = JSON.stringify(data);
    var urlDb = configData.SERVER_URL + "order";
    console.log(urlDb);
    axios
      .post(urlDb, dataJson, {
        headers: headers,
      })
      .then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  sendTourOrder() {
    var shoppingItems = this.state.ItemShop;
    var carpetsID = [];
    for (let i = 0; i < shoppingItems.length; i++) {
      carpetsID.push(shoppingItems[i].id);
    }

    console.log(this.state.totalprice);

    var date = this.state.year + ":" + this.state.month + ":" + this.state.day;
    var time = this.state.selectedHour + ":" + this.state.selectedMin;

    let data = {
      name: this.state.name,
      email: this.state.email,
      contactNumber: this.state.phoneNumber,
      date: date,
      time: time,
      carpetIds: carpetsID,
      totalAmount: this.state.totalprice,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    console.log(date);

    var dataJson = JSON.stringify(data);
    var urlDb = configData.SERVER_URL + "orderTour";
    console.log(urlDb);
    axios
      .post(urlDb, dataJson, {
        headers: headers,
      })
      .then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 978;
    if (!isMobile) {
      return (
        <Fragment>
          <Header></Header>
          <div>
            <div class="main">
              <div class="row itemCard">
                <div class="col-sm-5 cardMarginProduct">
                  <div class="shopCardProduct producePhoto">
                    <div className="row fixCardButton">
                      <button
                        id="shopCardButton"
                        onClick={(e) =>
                          this.changIcon(e, this.state.itemDetails)
                        }
                      >
                        <i id={this.state.id} class="fas icon-plus2 plus"></i>
                      </button>
                    </div>
                    {/* <div id="shopCardImage" className="row"> */}
                    <img id="cardImage" src={carpetTop}></img>
                    {/* </div> */}
                    <div class="row">
                      <div class="col marginLeft subPhotoMargin">
                        <img
                          className="subPhoto"
                          width="93"
                          height="73"
                          src={process.env.PUBLIC_URL + this.state.SrcImages[0]}
                        ></img>
                      </div>
                      <div class="col subPhotoMargin">
                        <img
                          className="subPhoto"
                          width="93"
                          height="73"
                          src={process.env.PUBLIC_URL + this.state.SrcImages[1]}
                        ></img>
                      </div>
                      <div class="col subPhotoMargin">
                        <img
                          className="subPhoto"
                          width="93"
                          height="73"
                          src={process.env.PUBLIC_URL + this.state.SrcImages[2]}
                        ></img>
                      </div>
                      <div class="col buttonImgDiv subPhotoMargin">
                        <div className="photoCard">
                          <img
                            className="subPhoto blurImg"
                            width="93"
                            height="73"
                            src={
                              process.env.PUBLIC_URL + this.state.SrcImages[3]
                            }
                          ></img>
                          <button
                            class="buttonImg"
                            data-toggle="modal"
                            data-target="#LargeImage"
                            onClick={this.handleBlur}
                          >
                            <i class="fas fa-ellipsis-h"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3 productText cardMarginProduct">
                  <h2>{this.state.CarpetName}</h2>
                  <div class="setBrand">
                    <span className="detailsHeader">марка : </span> {/*Brand*/}
                    <span class="colorText">{this.state.Brand}</span>
                    <span class="setInventory detailsHeader">
                      инвентарь :
                    </span>{" "}
                    {/*Inventory*/}
                    <span class="colorText">{this.state.Inventory}</span>
                  </div>
                  <div>
                    <span className="detailsHeader">срок поставки : </span>{" "}
                    {/*Delivery time*/}
                    <span class="colorText">{this.state.DeliveryTime}</span>
                  </div>
                  <div class="setSize">
                    <span className="detailsHeader">размер :</span> {/*Size*/}
                    <br />
                    <i className="down"></i>
                    <select
                      id="sizeList"
                      className="SelectButton"
                      name="CityBox"
                    >
                      {this.state.carpetSize.map((item) => (
                        <option Value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    class="live_tour"
                    data-toggle="modal"
                    data-target="#visa"
                    onClick={this.calculateTotalPrice}
                  >
                    живой тур {/*Live tour*/}
                  </button>
                </div>
                <div class="col-sm-4 cardMarginProduct">
                  <div class="shopCardProduct payment">
                    <div className="row">
                      <button className="ml-auto mr-3" id="shopCardButton2">
                        <span>{this.state.CarpetPrice}</span>
                      </button>
                    </div>
                    <h5 class="paymentMethod">Способ оплаты :</h5>
                    <fieldset class="checkbox" onChange={this.setValueCheckbox}>
                      <label>
                        <input
                          class="radioBox radioMaster"
                          type="radio"
                          name="paymentMethod"
                          value="Master-card"
                        />
                        <span for="Master-card">Master-card</span>
                      </label>
                      <label>
                        <input
                          class="radioBox radioMaster"
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                        />
                        <span for="Paypal">Paypal</span>
                      </label>
                      <label>
                        <input
                          class="radioBox radioMaster"
                          type="radio"
                          name="paymentMethod"
                          value="visa"
                        />
                        <span for="Visa">Visa</span>
                      </label>
                      <label>
                        <input
                          class="radioBox radioMaster"
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                        />
                        <span for="Master-card">наличные</span>
                      </label>
                      <br />
                    </fieldset>
                    <button
                      class="button_price"
                      data-toggle="modal"
                      data-target="#priceshow"
                      onClick={this.calculateTotalPrice}
                    >
                      детали цены
                    </button>
                    <br />
                    <button
                      class="button_order"
                      data-toggle="modal"
                      data-target={this.state.checkValue}
                      onClick={this.calculateTotalPrice}
                    >
                      заказ
                    </button>
                  </div>
                </div>
              </div>
              <h5 class="specifaction">Характеристики</h5>
              <div class="row ">
                {Object.keys(this.state.attributes).map((key) => (
                  <div class="col-sm-6">
                    <div class="Specifactions">
                      <span class="title">{key}</span>
                      <span class="specifactionItem">
                        {this.state.attributes[key]}
                      </span>
                    </div>
                  </div>
                ))}
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
                      <div class="shopCardProduct">
                        <Link
                          to={{
                            pathname: "/Details/" + item.id,
                            search: "?details=" + item.name,
                          }}
                          className="deleteUnderLink"
                        >
                          <p id="shopCardName">{item.name}</p>
                          <img id="shopCardImage" src={carpet}></img>
                        </Link>
                        <div className="row shopCardRow">
                          <span id="shopCardPrice">{item.price} ₽</span>
                          <button
                            className="ml-auto mr-3"
                            id="shopCardButton"
                            onClick={(e) => this.changIcon(e, item)}
                          >
                            <i id={item.id} class="fas icon-plus2 plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Flickity>
              </div>
            </div>
            <div
              class="modal fade"
              id="LargeImage"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <button
                type="button"
                class="close closebutton"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleBlur}
              >
                <img
                  className="closebtnDetailsPage"
                  aria-hidden="true"
                  src={close}
                  onClick={this.closeNav}
                ></img>
              </button>
              <div
                class="modal-dialog modal-dialog-centered modal-my-image"
                role="document"
              >
                <div class="modal-content modal-content-fix">
                  <div>
                    <Flickity
                      className={"carousel LargeImage"} // default ''
                      elementType={"div"} // default 'div'
                      options={flickityOptions} // takes flickity options {}
                      disableImagesLoaded={false} // default false
                      reloadOnUpdate // default false
                    >
                      {this.state.SrcImages.map((item) => (
                        <img
                          class="setImgLarge"
                          width="800"
                          height="500"
                          src={item}
                        />
                      ))}
                    </Flickity>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="priceshow"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div class="priceForm">
                      <div class="row">
                        <span class="titlePriceDetails">детали цены</span>
                      </div>
                      {this.state.ItemShop.map((item) => (
                        <div className="row">
                          <div class="col text-center">
                            <span className="itemsCash">{item.name} :</span>
                            <span class="price">{item.price} ₽</span>
                          </div>
                        </div>
                      ))}
                      <hr class="lineTotal"></hr>
                      <span class="totalamount">Итого :</span>
                      <span class="Tprice"> {this.state.totalprice} ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="visa"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div class="registerFormVisa">
                      <form>
                        <h6 class="titleformvisa" for="Name">
                          название <span class="starascii">&#42;</span>
                        </h6>
                        <input
                          class="visaInput"
                          type="text"
                          placeholder="название "
                          onChange={this.handleChangeName}
                          name="Name"
                          id="Name"
                          required
                        />
                        <br />
                        <h6 class="titleformvisa" for="Email">
                          электронное письмо<span class="starascii">&#42;</span>
                        </h6>
                        <input
                          class="visaInput"
                          type="text"
                          placeholder="электронное письмо"
                          onChange={this.handleChangeEmail}
                          name="Email"
                          id="Email"
                          required
                        />
                        <h6 class="titleformvisa">
                          Контактный телефон<span class="starascii">&#42;</span>
                        </h6>
                        <input
                          class="visaInput"
                          type="text"
                          placeholder="Контактный телефон"
                          onChange={this.handleChangeNumber}
                          name="number"
                          id="number"
                          required
                        ></input>
                        <h6 class="titleformvisa">
                          Дата<span class="starascii">&#42;</span>
                        </h6>
                        <div>
                          <DayPicker
                            defaultValue={"день"}
                            year={this.state.year} // mandatory
                            month={this.state.month} // mandatory
                            required={true} // default is false
                            value={this.state.day} // mandatory
                            onChange={(day) => {
                              // mandatory
                              this.setState({ day });
                            }}
                            id={"day"}
                            name={"day"}
                            classes={"classes"}
                            optionClasses={"day"}
                            id="dropdownDateDay"
                          />
                          <MonthPicker
                            defaultValue={"месяц"}
                            year={this.state.year} // mandatory
                            required={true} // default is false
                            value={this.state.month} // mandatory
                            onChange={(month) => {
                              // mandatory
                              this.setState({ month });
                            }}
                            id={"month"}
                            name={"month"}
                            classes={"classes"}
                            optionClasses={"month"}
                            id="dropdownDateMonth"
                          />

                          <YearPicker
                            defaultValue={"год"}
                            start={2020} // default is 1900
                            end={2020} // default is current year
                            reverse // default is ASCENDING
                            required={true} // default is false            // default is false
                            value={this.state.year} // mandatory
                            onChange={(year) => {
                              // mandatory
                              this.setState({ year });
                            }}
                            id={"year"}
                            name={"year"}
                            classes={"classes"}
                            optionClasses={"year"}
                            id="dropdownDateYear"
                          />
                        </div>
                        <h6 class="titleformvisa">
                          время<span class="starascii">&#42;</span>
                        </h6>
                        <select class="hour" onChange={this.handleChangeHour}>
                          <option selected disabled>
                            час
                          </option>
                          {this.state.hour.map((item) => (
                            <option Value={item}>{item}</option>
                          ))}
                        </select>
                        <select class="min" onChange={this.handleChangeMin}>
                          <option selected disabled>
                            минута
                          </option>
                          {this.state.minute.map((item) => (
                            <option Value={item}>{item}</option>
                          ))}
                        </select>
                        <button
                          class="buttonVisa"
                          data-toggle="modal"
                          data-target="#SubmitOrder"
                          data-dismiss="modal"
                          onClick={this.sendTourOrder}
                        >
                          представить
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="cash"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={this.closeNav}
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div class="registerFormCash">
                      <div class="row ItemOrder">
                        <span class="titlePriceDetails">детали цены</span>
                      </div>
                      {this.state.ItemShop.map((item) => (
                        <div className="row">
                          <div class="col text-center">
                            <span className="itemsCash">{item.name} :</span>
                            <span class="price">{item.price} ₽</span>
                          </div>
                        </div>
                      ))}
                      <hr class="lineTotal"></hr>
                      <span class="totalamountCash">Итого :</span>
                      <span class="price totalamountCash">
                        {this.state.totalprice} ₽
                      </span>
                      <br />
                      <div class="online">
                        (Вы должны оплатить таможенный сбор онлайн)
                      </div>
                      <button
                        class="pay"
                        data-toggle="modal"
                        data-target="#register"
                        data-dismiss="modal"
                      >
                        платить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="register"
              tabindex="-2"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <form class="addinformation">
                      <h6 className="inputsLable" for="Name">
                        название
                      </h6>
                      <input
                        class="inputs"
                        type="text"
                        placeholder="Matthew"
                        onChange={this.handleChangeName}
                        name="Name"
                        id="Name"
                        required
                      />
                      <br />
                      <h6 className="inputsLable" for="Email">
                        электронное письмо
                      </h6>
                      <input
                        class="inputs"
                        type="text"
                        placeholder="matyousefian@yahoo.com"
                        onChange={this.handleChangeEmail}
                        name="Email"
                        id="Email"
                        required
                      />
                      <br />
                      <h6 className="inputsLable" for="number">
                        Контактный телефон
                      </h6>
                      <input
                        class="inputs"
                        type="text"
                        placeholder="Контактный телефон"
                        onChange={this.handleChangeNumber}
                        name="number"
                        id="number"
                        required
                      />
                      <br />
                      <h6 className="inputsLable" for="address">
                        адрес
                      </h6>
                      <textarea
                        class=" inputsAddress"
                        type="text"
                        placeholder="Address"
                        onChange={this.handleChangeAddress}
                        name="address"
                        id="address"
                        required
                      />
                    </form>
                    <button
                      class="submit"
                      data-toggle="modal"
                      data-target="#SubmitOrder"
                      data-dismiss="modal"
                      onClick={this.sendOrder}
                    >
                      представить
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="SubmitOrder"
              tabindex="-2"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog topMarg" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div>
                      <img
                        className="IconMessageSubmit"
                        src={IconChecked}
                        alt="ok"
                        height="200"
                        width="100"
                      ></img>
                      <div class="row">
                        <p class="pMessage text-center">
                          ваш заказ был успешно отправлен
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Header></Header>
          <div>
            <div class="main">
              <div class="row itemCard">
                <button
                  id="shopCardButton"
                  className="col-auto mr-auto"
                  onClick={(e) => this.changIcon(e, this.state.itemDetails)}
                >
                  <i id={this.state.id} class="fas icon-plus2 plus"></i>
                </button>
                <button className="col-auto" id="shopCardButton2">
                  <span>{this.state.CarpetPrice}</span>
                </button>
                <div class="col-sm-5 cardMarginProduct">
                  <div class="shopCardProduct producePhoto">
                    <div className="row fixCardButton"></div>
                    {/* <div id="shopCardImage" className="row"> */}
                    <img id="cardImage" src={carpetTop}></img>
                    {/* </div> */}
                    <div class="row marginBot">
                      <div class="col-2 marginLeft subPhotoMargin">
                        <img
                          className="subPhoto"
                          src={process.env.PUBLIC_URL + this.state.SrcImages[0]}
                        ></img>
                      </div>
                      <div class="col-2 subPhotoMargin">
                        <img
                          className="subPhoto"
                          src={process.env.PUBLIC_URL + this.state.SrcImages[1]}
                        ></img>
                      </div>
                      <div class="col-2 subPhotoMargin">
                        <img
                          className="subPhoto"
                          src={process.env.PUBLIC_URL + this.state.SrcImages[2]}
                        ></img>
                      </div>
                      <div class="col-2 subPhotoMargin">
                        <div className="photoCardResize">
                          <img
                            className="subPhoto blurImg maxBoundPhoto"
                            src={
                              process.env.PUBLIC_URL + this.state.SrcImages[3]
                            }
                          ></img>
                          <button
                            class="buttonImgResize"
                            data-toggle="modal"
                            data-target="#LargeImage"
                            onClick={this.handleBlur}
                          >
                            <i class="fas fa-ellipsis-h"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3 productText cardMarginProduct">
                  <h2>{this.state.CarpetName}</h2>
                  <div class="setBrand">
                    <span>марка : </span> {/*Brand*/}
                    <span class="colorText">{this.state.Brand}</span>
                    <span class="setInventory">инвентарь :</span>{" "}
                    {/*Inventory*/}
                    <span class="colorText">{this.state.Inventory}</span>
                  </div>
                  <div>
                    <span>срок поставки : </span> {/*Delivery time*/}
                    <span class="colorText">{this.state.DeliveryTime}</span>
                  </div>
                  <div class="setSize">
                    <span>размер :</span> {/*Size*/}
                    <br />
                    <i className="down"></i>
                    <select
                      id="sizeList"
                      className="SelectButton"
                      name="CityBox"
                    >
                      {this.state.carpetSize.map((item) => (
                        <option Value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    class="live_tour"
                    data-toggle="modal"
                    data-target="#visa"
                    onClick={this.calculateTotalPrice}
                  >
                    живой тур {/*Live tour*/}
                  </button>
                </div>
                <div class="col-sm-4 cardMarginProduct">
                  <h5 class="paymentMethod">Способ оплаты :</h5>
                  <form class="checkbox" onChange={this.setValueCheckbox}>
                    <div className="row">
                      <div className="col-6">
                        <input
                          class="radioBox radioMaster"
                          type="radio"
                          name="paymentMethod"
                          value="Master-card"
                        />
                        <label class="paymentLable" for="Master-card">
                          Master-card
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          class="radioBox radioMaster"
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                        />
                        <label class="paymentLable" for="Paypal">
                          Paypal
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <input
                          class="radioBox radioMaster"
                          type="radio"
                          name="paymentMethod"
                          value="visa"
                        />
                        <label class="paymentLable" for="Visa">
                          Visa
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          class="radioBox radioMaster"
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                        />
                        <label class="paymentLable" for="Master-card">
                          наличные
                        </label>
                      </div>
                    </div>
                  </form>
                  <button
                    class="button_price"
                    data-toggle="modal"
                    data-target="#priceshow"
                    onClick={this.calculateTotalPrice}
                  >
                    детали цены
                  </button>
                  <br />
                  <button
                    class="button_order"
                    data-toggle="modal"
                    data-target={this.state.checkValue}
                    onClick={this.calculateTotalPrice}
                  >
                    заказ
                  </button>
                </div>
              </div>
              <h5 class="specifaction">Характеристики</h5>
              <div class="row ">
                {Object.keys(this.state.attributes).map((key) => (
                  <div class="col-sm-6">
                    <div class="Specifactions">
                      <span class="title">{key}</span>
                      <span class="specifactionItem">
                        {this.state.attributes[key]}
                      </span>
                    </div>
                  </div>
                ))}
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
                      <div class="shopCardProduct">
                        <Link
                          to={{
                            pathname: "/Details/" + item.id,
                            search: "?details=" + item.name,
                          }}
                          className="deleteUnderLink"
                        >
                          <p id="shopCardName">{item.name}</p>
                          <img id="shopCardImage" src={carpet}></img>
                        </Link>
                        <div className="row shopCardRow">
                          <span id="shopCardPrice">{item.price} ₽</span>
                          <button
                            className="ml-auto mr-3"
                            id="shopCardButton3"
                            onClick={(e) => this.changIcon(e, item)}
                          >
                            <i id={item.id} class="fas icon-plus2 plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Flickity>
              </div>
            </div>
            <div
              class="modal fade"
              id="LargeImage"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <button
                type="button"
                class="close closebutton"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleBlur}
              >
                <img
                  className="closebtnDetailsPage"
                  aria-hidden="true"
                  src={close}
                  onClick={this.closeNav}
                ></img>
              </button>
              <div
                class="modal-dialog modal-dialog-centered modal-my-image-mobile"
                role="document"
              >
                <div
                  class="modal-content modal-content-fix"
                  id="my-modal-image"
                >
                  <div>
                    <Flickity
                      className={"carousel LargeImage"} // default ''
                      elementType={"div"} // default 'div'
                      options={flickityOptions} // takes flickity options {}
                      disableImagesLoaded={false} // default false
                      reloadOnUpdate // default false
                    >
                      {this.state.SrcImages.map((item) => (
                        <img
                          class="setImgLarge"
                          width="800"
                          height="500"
                          src={item}
                        />
                      ))}
                    </Flickity>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="priceshow"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div class="priceForm">
                      <div class="row">
                        <span class="titlePriceDetails">детали цены</span>
                      </div>
                      {this.state.ItemShop.map((item) => (
                        <div className="row">
                          <div class="col text-center">
                            <span className="itemsCash">{item.name} :</span>
                            <span class="price">{item.price} ₽</span>
                          </div>
                        </div>
                      ))}
                      <hr class="lineTotal"></hr>
                      <span class="totalamount">Итого :</span>
                      <span class="Tprice"> {this.state.totalprice} ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="visa"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div class="registerFormVisa">
                      <form>
                        <h6 class="titleformvisa" for="Name">
                          название <span class="starascii">&#42;</span>
                        </h6>
                        <input
                          class="visaInput"
                          type="text"
                          placeholder="название "
                          onChange={this.handleChangeName}
                          name="Name"
                          id="Name"
                          required
                        />
                        <br />
                        <h6 class="titleformvisa" for="Email">
                          электронное письмо<span class="starascii">&#42;</span>
                        </h6>
                        <input
                          class="visaInput"
                          type="text"
                          placeholder="электронное письмо"
                          onChange={this.handleChangeEmail}
                          name="Email"
                          id="Email"
                          required
                        />
                        <h6 class="titleformvisa">
                          Контактный телефон<span class="starascii">&#42;</span>
                        </h6>
                        <input
                          class="visaInput"
                          type="text"
                          placeholder="Контактный телефон"
                          onChange={this.handleChangeNumber}
                          name="number"
                          id="number"
                        ></input>
                        <h6 class="titleformvisa">
                          Дата<span class="starascii">&#42;</span>
                        </h6>
                        <div>
                          <DayPicker
                            defaultValue={"Day"}
                            year={this.state.year} // mandatory
                            month={this.state.month} // mandatory
                            required={true} // default is false
                            value={this.state.day} // mandatory
                            onChange={(day) => {
                              // mandatory
                              this.setState({ day });
                            }}
                            id={"day"}
                            name={"day"}
                            classes={"classes"}
                            optionClasses={"option classes"}
                            id="dropdownDateDay"
                          />
                          <MonthPicker
                            defaultValue={"month"}
                            year={this.state.year} // mandatory
                            required={true} // default is false
                            value={this.state.month} // mandatory
                            onChange={(month) => {
                              // mandatory
                              this.setState({ month });
                            }}
                            id={"month"}
                            name={"month"}
                            classes={"classes"}
                            optionClasses={"option classes"}
                            id="dropdownDateMonth"
                          />

                          <YearPicker
                            defaultValue={"2020"}
                            start={2020} // default is 1900
                            end={2020} // default is current year
                            reverse // default is ASCENDING
                            required={true} // default is false            // default is false
                            value={this.state.year} // mandatory
                            onChange={(year) => {
                              // mandatory
                              this.setState({ year });
                            }}
                            id={"year"}
                            name={"year"}
                            classes={"classes"}
                            optionClasses={"option classes"}
                            id="dropdownDateYear"
                          />
                        </div>
                        <h6 class="titleformvisa">
                          время<span class="starascii">&#42;</span>
                        </h6>
                        <select class="hour" onChange={this.handleChangeHour}>
                          <option selected disabled>
                            час
                          </option>
                          {this.state.hour.map((item) => (
                            <option Value={item}>{item}</option>
                          ))}
                        </select>
                        <select class="min" onChange={this.handleChangeMin}>
                          <option selected disabled>
                            минута
                          </option>
                          {this.state.minute.map((item) => (
                            <option Value={item}>{item}</option>
                          ))}
                        </select>
                        <button
                          class="buttonVisa"
                          data-toggle="modal"
                          data-target="#SubmitOrder"
                          data-dismiss="modal"
                          onClick={this.sendTourOrder}
                        >
                          представить
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="cash"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={this.closeNav}
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div class="registerFormCash">
                      <div class="row ItemOrder">
                        <span class="titlePriceDetails">детали цены</span>
                      </div>
                      {this.state.ItemShop.map((item) => (
                        <div className="row">
                          <div class="col text-center">
                            <span className="itemsCash">{item.name} :</span>
                            <span class="price">{item.price} ₽</span>
                          </div>
                        </div>
                      ))}
                      <hr class="lineTotal"></hr>
                      <span class="totalamountCash">Итого :</span>
                      <span class="price totalamountCash">
                        {this.state.totalprice} ₽
                      </span>
                      <br />
                      <div class="online">
                        (Вы должны оплатить таможенный сбор онлайн)
                      </div>
                      <button
                        class="pay"
                        data-toggle="modal"
                        data-target="#register"
                        data-dismiss="modal"
                      >
                        платить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="register"
              tabindex="-2"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <form class="addinformation">
                      <h6 className="inputsLable" for="Name">
                        название
                      </h6>
                      <input
                        class="inputs"
                        type="text"
                        placeholder="Matthew"
                        onChange={this.handleChangeName}
                        name="Name"
                        id="Name"
                        required
                      />
                      <br />
                      <h6 className="inputsLable" for="Email">
                        электронное письмо
                      </h6>
                      <input
                        class="inputs"
                        type="text"
                        placeholder="matyousefian@yahoo.com"
                        onChange={this.handleChangeEmail}
                        name="Email"
                        id="Email"
                        required
                      />
                      <br />
                      <h6 className="inputsLable" for="number">
                        Контактный телефон
                      </h6>
                      <input
                        class="inputs"
                        type="text"
                        placeholder="Контактный телефон"
                        onChange={this.handleChangeNumber}
                        name="number"
                        id="number"
                        required
                      />
                      <br />
                      <h6 className="inputsLable" for="address">
                        адрес
                      </h6>
                      <textarea
                        class=" inputsAddress"
                        type="text"
                        placeholder="Address"
                        onChange={this.handleChangeAddress}
                        name="address"
                        id="address"
                        required
                      />
                    </form>
                    <button
                      class="submit"
                      data-toggle="modal"
                      data-target="#SubmitOrder"
                      data-dismiss="modal"
                      onClick={this.sendOrder}
                    >
                      представить
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="SubmitOrder"
              tabindex="-2"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog topMarg" role="document">
                <div class="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      class="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span class="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div>
                      <img
                        className="IconMessageSubmit"
                        src={IconChecked}
                        alt="ok"
                        height="200"
                        width="100"
                      ></img>
                      <div class="row">
                        <p class="pMessage text-center">
                          ваш заказ был успешно отправлен
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </Fragment>
      );
    }
  }
}

export default DetailPage;
