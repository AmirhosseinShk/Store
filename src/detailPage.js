import React, { Fragment } from "react";
import axios from "axios";
import Flickity from "react-flickity-component";
import { Link } from "react-router-dom";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";

import Header from "./Header.js";
import Footer from "./Footer.js";

import "./asstes/css/detailPage.css";
import "flickity/css/flickity.css";

import carpetTop from "./asstes/Photos/Capture_page2.PNG";
import carpet from "./asstes/Photos/carpet.PNG";
import littleCarpet from "./asstes/Photos/littleCarpet.PNG";

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
  console.log(arr);
  return arr;
}

function filhour(arr) {
  for (var i = 1; i < 24; i++) {
    arr[i - 1] = i;
  }
  arr[23] = "00";
  console.log(arr);
  return arr;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    const carpetDetails = props.location.search;
    var id = carpetDetails.split("id=")[1];
    this.state = {
      ItemShop: [
        { name: "test", price: "75.000$" },
        { name: "test", price: "75.000$" },
        { name: "test", price: "75.000$" },
        { name: "test", price: "75.000$" },
      ],
      totalprice: 0.0,
      Brand: "test",
      Inventory: "test",
      DeliveryTime: "test",
      CarpetName: "test",
      SrcImage: "",
      SrcImages: [],
      CarpetPrice: 0,
      CarpetDisPrice: 0,
      deleteElement: [],
      popularCarpets: [],
      carpetSize: [],
      id: id,
      attributes: "",
      checkValue: "",
      year: null,
      month: null,
      day: null,
      minute: [],
      hour: [],
    };
    this.changIcon = this.changIcon.bind(this);
    this.openNav = this.openNav.bind(this);
    this.OpenPayPage = this.OpenPayPage.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.RegisterForm = this.RegisterForm.bind(this);
    this.ShowImgLarge = this.ShowImgLarge.bind(this);
    this.setValueCheckbox = this.setValueCheckbox.bind(this);
    this.CloseShowImgLarge = this.CloseShowImgLarge.bind(this);
  }

  componentDidMount() {
    var urlDb = "http://localhost:8080/Server/rest/getPopularCarpet";
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
    console.log(this.state.popularCarpets);

    var urlDb = "http://localhost:8080/Server/rest/getCarpet/" + this.state.id;
    axios(urlDb).then(
      (result) => {
        var details = result.data;
        console.log(details);
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
          SrcImage: details.imageSrc,
          SrcImages: details.imageSrcs,
          CarpetDisPrice: details.discountPrice,
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

  refreshFlickity() {
    this.flkty.resize();
  }

  setValueCheckbox(event) {
    this.setState({ checkValue: "#" + event.target.value });
  }

  changIcon() {
    var classname = document.getElementById("butplus").classList;
    if (classname[1] == "fa-plus") {
      document.getElementById("butplus").setAttribute("class", "fa fa-times");
      document.getElementById("shopCardButton").style.background =
        "rgb(255,0,94)";
      document
        .getElementById("NewItem")
        .setAttribute("class", "fa fa-circle fa-xs");
    } else {
      document.getElementById("butplus").setAttribute("class", "fa fa-plus");
      document.getElementById("shopCardButton").style.background = "#651fff";
      document.getElementById("NewItem").setAttribute("class", "");
    }
  }

  ShowImgLarge() {
    var x = document.getElementsByClassName("header")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("main")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id", "blur");
    console.log(document.getElementById("panelImg"));
    document.getElementById("panelImg").style.width = "45%";
  }

  CloseShowImgLarge() {
    var x = document.getElementsByClassName("header")[0];
    x.setAttribute("id", null);
    var x = document.getElementsByClassName("main")[0];
    x.setAttribute("id", null);
    var x = document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id", null);
    console.log(document.getElementById("panelImg"));
    document.getElementById("panelImg").style.width = "0";
  }

  openNav() {
    var x = document.getElementsByClassName("header")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("main")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByName("PaymentMethods");
    var totalPrice = 0.0;
    for (var i = 0; i < this.state.ItemShop.length; i++) {
      totalPrice = totalPrice + parseFloat(this.state.ItemShop[i].price);
    }
    this.setState({ totalprice: totalPrice });
    /*var lengthX = x.length;
    var selectRadio = "";
    for (var i = 0; i < lengthX; i++) {
      if (x[i].checked) {
        console.log(x[i].value);
        selectRadio = x[i].value;
      }
    }

    if (selectRadio == "cash") {
      document.getElementById("priceDetail").style.width = "35%";
      document
        .getElementById("priceDetail")
        .setAttribute("class", "shadowbackground");
    }*/
  }

  OpenPayPage() {
    var x = document.getElementsByClassName("header")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("main")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByName("PaymentMethods");
    var totalPrice = 0.0;
    for (var i = 0; i < this.state.ItemShop.length; i++) {
      totalPrice = totalPrice + parseFloat(this.state.ItemShop[i].price);
    }
    this.setState({ totalprice: totalPrice });
    var lengthX = x.length;
    var selectRadio = "";
    for (var i = 0; i < lengthX; i++) {
      if (x[i].checked) {
        console.log(x[i].value);
        selectRadio = x[i].value;
      }
    }

    if (selectRadio == "cash") {
      document.getElementById("Order").style.width = "35%";
      document
        .getElementById("Order")
        .setAttribute("class", "shadowbackground");
    }
  }

  closeNav() {
    var x = document.getElementsByClassName("header")[0];
    x.setAttribute("id", null);
    var x = document.getElementsByClassName("main")[0];
    x.setAttribute("id", null);
    var x = document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id", null);
  }

  closeOrder() {
    var before = document.getElementById("test");
    var btn = document.getElementById("deletesection");
    before.parentNode.replaceChild(btn, before);
    document.getElementById("Order").style.width = "0";
    document.getElementById("Order").setAttribute("class", "");
    var x = document.getElementsByClassName("header")[0];
    x.setAttribute("id", null);
    var x = document.getElementsByClassName("main")[0];
    x.setAttribute("id", null);
    var x = document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id", null);
  }

  RegisterForm() {
    var y = document.getElementById("deletesection");
    var yy = [];
    yy.push(y);
    this.setState({ deleteElement: yy });
    var x = document.getElementById("test");
    y.parentNode.replaceChild(x, y);
  }

  test() {
    const modal = document.getElementsByClassName("modal")[2];
    modal.style.display = "block";
    modal.style.display = "none";
    modal.setAttribute("class", " ");
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div>
          <div class="main">
            <div class="row itemCard">
              <div class="col-sm-5 cardMarginProduct">
                <div class="shopCardProduct producePhoto">
                  <div className="row fixCardButton">
                    <button id="shopCardButton" onClick={this.changIcon}>
                      <i id="butplus" class="fas fa-plus"></i>
                    </button>
                  </div>
                  {/* <div id="shopCardImage" className="row"> */}
                  <img id="cardImage" src={carpetTop}></img>
                  {/* </div> */}
                  <div class="row">
                    <div class="col marginLeft subPhotoMargin">
                      <img className="subPhoto" src={littleCarpet}></img>
                    </div>
                    <div class="col subPhotoMargin">
                      <img className="subPhoto" src={littleCarpet}></img>
                    </div>
                    <div class="col subPhotoMargin">
                      <img className="subPhoto" src={littleCarpet}></img>
                    </div>
                    <div class="col buttonImgDiv subPhotoMargin">
                      <img
                        className="subPhoto blurImg"
                        src={littleCarpet}
                      ></img>
                      <button class="buttonImg" onClick={this.ShowImgLarge}>
                        ...
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-3 productText cardMarginProduct">
                <h2>Persian carpet / no44</h2>
                <div class="setBrand">
                  <span>Brand : </span>
                  <span class="colorText">{this.state.Brand}</span>
                  <span class="setInventory">Inventory : </span>
                  <span class="colorText">{this.state.Inventory}</span>
                </div>
                <div>
                  <span>Delivery time : </span>
                  <span class="colorText">{this.state.DeliveryTime}</span>
                </div>
                <div class="setSize">
                  <span>Size :</span>
                  <br />
                  <i className="down"></i>
                  <select id="sizeList" className="SelectButton" name="CityBox">
                    {this.state.carpetSize.map((item) => (
                      <option Value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <button class="live_tour" onClick={this.openNav}>
                  Live tour
                </button>
              </div>
              <div class="col-sm-4 cardMarginProduct">
                <div class="shopCardProduct payment">
                  <div className="row">
                    <button className="ml-auto mr-3" id="shopCardButton2">
                      <span>785.000 ₽</span>
                    </button>
                  </div>
                  <h5 class="paymentMethod">Payment Method :</h5>
                  <form class="checkbox">
                    <input
                      class="radioBox radioMaster"
                      type="radio"
                      name="PaymentMethods"
                      value="Master-card"
                    />
                    <label class="paymentLable" for="Master-card">
                      {" "}
                      Master-card
                    </label>
                    <br />
                    <input
                      class="radioBox radioMaster"
                      type="radio"
                      name="PaymentMethods"
                      value="paypal"
                    />
                    <label class="paymentLable" for="Paypal">
                      {" "}
                      Paypal
                    </label>
                    <br />
                    <input
                      class="radioBox radioMaster"
                      type="radio"
                      name="PaymentMethods"
                      value="visa"
                    />
                    <label class="paymentLable" for="Visa">
                      Visa
                    </label>
                    <br />
                    <input
                      class="radioBox radioMaster"
                      type="radio"
                      name="PaymentMethods"
                      value="cash"
                    />
                    <label class="paymentLable" for="Master-card">
                      Cash
                    </label>
                    <br />
                  </form>
                  <button class="button_price" onClick={this.openNav}>
                    Price details
                  </button>
                  <br />
                  <button class="button_order" onClick={this.OpenPayPage}>
                    Order
                  </button>
                </div>
              </div>
            </div>
            <h5 class="specifaction">Specifactions</h5>
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
              <h4>Popular products</h4>
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
                  <Link
                    to={{ pathname: "/Details", state: { area: item } }}
                    className="col-md-3 deleteUnderLink"
                  >
                    <div class="shopCardProduct">
                      <p id="shopCardName">{item.name}</p>
                      <img id="shopCardImage" src={carpet}></img>
                      <div className="row shopCardRow">
                        <span id="shopCardPrice">{item.price} ₽</span>
                        <button className="ml-auto mr-3" id="shopCardButton">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </Flickity>
            </div>
          </div>
          <div id="priceDetail">
            <i class="closebtn fa fa-times fa-2x" onClick={this.closeNav}></i>
            <div class="row">
              <span class="titlePriceDetails">Price Details</span>
            </div>
            {this.state.ItemShop.map((item) => (
              <div class="row">
                <span class="items">{item.name} :</span>
                <span class="price">{item.price}</span>
              </div>
            ))}
            <hr class="lineTotal"></hr>
            <span class="totalamount">Total amout :</span>
            <span class="price"> {this.state.totalprice} $</span>
          </div>

          <div id="Order">
            <div id="deletesection">
              <i
                class="closebtn fa fa-times fa-2x"
                onClick={this.closeOrder}
              ></i>
              <div class="row ItemOrder">
                <span class="titlePriceDetails">Price Details</span>
              </div>
              {this.state.ItemShop.map((item) => (
                <div class="row">
                  <span class="items">{item.name} :</span>
                  <span class="price">{item.price}</span>
                </div>
              ))}
              <hr class="lineTotal"></hr>
              <span class="totalamount">Total amout :</span>
              <span class="price"> {this.state.totalprice} $</span>
              <br />
              <button class="pay" onClick={this.RegisterForm}>
                Pay now
              </button>
            </div>
          </div>
          <div id="test" class="formRegister">
            <i class="closebtn fa fa-times fa-2x" onClick={this.closeOrder}></i>
            <form class="addinformation">
              <h6 for="Name">Name</h6>
              <input
                class="inputs"
                type="text"
                placeholder="Enter Name"
                name="Name"
                id="Name"
                required
              />
              <br />
              <h6 for="Email">Email</h6>
              <input
                class="inputs"
                type="text"
                placeholder="Enter Email"
                name="Email"
                id="Email"
                required
              />
              <br />
              <h6 for="number">Contact Number</h6>
              <input
                class="inputs"
                type="text"
                placeholder="Contact Number"
                name="number"
                id="number"
                required
              />
              <br />
              <h6 for="address">َAddress</h6>
              <textarea
                class=" inputsAddress"
                type="text"
                placeholder="Address"
                name="address"
                id="address"
                required
              />
            </form>
          </div>
          <div class="showImg" id="panelImg">
            <button onClick={this.CloseShowImgLarge}> close </button>
            <Flickity
              className={"carousel"} // default ''
              elementType={"div"} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate // default false
            >
              <img
                class="setImgLarge"
                width="600"
                height="250"
                src={carpetTop}
              />
              <img
                class="setImgLarge"
                src={carpetTop}
                width="600"
                height="250"
              />
              <img
                class="setImgLarge"
                src={carpetTop}
                width="600"
                height="250"
              />
            </Flickity>
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
                    onClick={this.closeNav}
                  >
                    <span class="times" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                  <div class="priceForm">
                    <div class="row ">
                      <span class="titlePriceDetails">Price Details</span>
                    </div>
                    {this.state.ItemShop.map((item) => (
                      <div class="row">
                        <span class="items">{item.name} :</span>
                        <span class="price">{item.price}</span>
                      </div>
                    ))}
                    <hr class="lineTotal"></hr>
                    <span class="totalamount">Total amout :</span>
                    <span class="Tprice"> {this.state.totalprice} $</span>
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
                        Name<span class="starascii">&#42;</span>
                      </h6>
                      <input
                        class="visaInput"
                        type="text"
                        placeholder="Enter Name"
                        name="Name"
                        id="Name"
                        required
                      />
                      <br />
                      <h6 class="titleformvisa" for="Email">
                        Email<span class="starascii">&#42;</span>
                      </h6>
                      <input
                        class="visaInput"
                        type="text"
                        placeholder="Enter Email"
                        name="Email"
                        id="Email"
                        required
                      />
                      <h6 class="titleformvisa">
                        Contact number<span class="starascii">&#42;</span>
                      </h6>
                      <input type="text" class="visaInput"></input>
                      <h6 class="titleformvisa">
                        Tour date<span class="starascii">&#42;</span>
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
                            console.log(day);
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
                            console.log(month);
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
                            console.log(year);
                          }}
                          id={"year"}
                          name={"year"}
                          classes={"classes"}
                          optionClasses={"option classes"}
                          id="dropdownDateYear"
                        />
                      </div>
                      <h6 class="titleformvisa">
                        Tour Time<span class="starascii">&#42;</span>
                      </h6>
                      <select class="hour">
                        <option selected disabled>
                          hour
                        </option>
                        {this.state.hour.map((item) => (
                          <option Value={item}>{item}</option>
                        ))}
                      </select>
                      <select class="min">
                        <option selected disabled>
                          minutes
                        </option>
                        {this.state.minute.map((item) => (
                          <option Value={item}>{item}</option>
                        ))}
                      </select>
                      <button class="buttonVisa">submit</button>
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
                      <span class="titlePriceDetails">Price Details</span>
                    </div>
                    {this.state.ItemShop.map((item) => (
                      <div class="row">
                        <span class="items">{item.name} :</span>
                        <span class="price">{item.price}</span>
                      </div>
                    ))}
                    <hr class="lineTotal"></hr>
                    <span class="totalamount">Total amout :</span>
                    <span class="price"> {this.state.totalprice} $</span>
                    <br />
                    <button
                      class="pay"
                      data-toggle="modal"
                      data-target="#register"
                      onClick={this.test}
                    >
                      Pay now
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
                    <h6 for="Name">Name</h6>
                    <input
                      class="inputs"
                      type="text"
                      placeholder="Enter Name"
                      name="Name"
                      id="Name"
                      required
                    />
                    <br />
                    <h6 for="Email">Email</h6>
                    <input
                      class="inputs"
                      type="text"
                      placeholder="Enter Email"
                      name="Email"
                      id="Email"
                      required
                    />
                    <br />
                    <h6 for="number">Contact Number</h6>
                    <input
                      class="inputs"
                      type="text"
                      placeholder="Contact Number"
                      name="number"
                      id="number"
                      required
                    />
                    <br />
                    <h6 for="address">َAddress</h6>
                    <textarea
                      class=" inputsAddress"
                      type="text"
                      placeholder="Address"
                      name="address"
                      id="address"
                      required
                    />
                  </form>
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

export default DetailPage;
