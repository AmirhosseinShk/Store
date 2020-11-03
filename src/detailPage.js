import React from "react";
import "./asstes/css/detailPage.css";
import "./asstes/css/MainPage.css";
import carpet from "./carpet.PNG";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";

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

class detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Categories: [
        { icon: "fa fa-phone fa-3x", Name: "Carpet" },
        { icon: "fa fa-shopping-bag fa-3x", Name: "Bags" },
        { icon: "fa fa-tshirt fa-3x", Name: "Clothes" },
        { icon: "fa fa-phone fa-3x", Name: "Handicrafts" },
      ],
      specifaction: [
        { x: "test", y: "test" },
        { x: "test", y: "test" },
        { x: "test", y: "test" },
        { x: "test", y: "test" },
      ],
      ItemShop: [
        { name: "test", price: "75.000$" },
        { name: "test", price: "75.000$" },
        { name: "test", price: "75.000$" },
        { name: "test", price: "75.000$" },
      ],
      totalprice: 0.0,
      deleteElement: [],
    };
    this.changIcon = this.changIcon.bind(this);
    this.openNav = this.openNav.bind(this);
    this.OpenPayPage = this.OpenPayPage.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.RegisterForm = this.RegisterForm.bind(this);
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
    var lengthX = x.length;
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
    }
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
    document.getElementById("priceDetail").style.width = "0";
    document.getElementById("priceDetail").setAttribute("class", "");
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
    console.log("fatemeh :)");
    var y = document.getElementById("deletesection");
    var yy = [];
    yy.push(y);
    this.setState({ deleteElement: yy });
    var x = document.getElementById("test");
    y.parentNode.replaceChild(x, y);
  }

  render() {
    return (
      <div>
        <div class="main">
          <div class="row ">
            <div class="col-4 ">
              <div class="shopCard producePhoto">
                <button
                  className="ml-auto mr-3"
                  id="shopCardButton"
                  onClick={this.changIcon}
                >
                  <i id="butplus" class="fas fa-plus"></i>
                </button>
                <div className="row ">
                  <img id="shopCardImage" src={carpet}></img>
                </div>
                <div class="row ">
                  <p>hsjshjhsj</p>
                </div>
                <div class="row ">
                  <p>hsjshjhsj</p>
                </div>
                <div class="row ">
                  <p>hsjshjhsj</p>
                </div>
              </div>
            </div>
            <div class="col-4 productText">
              <h2>persian carpet</h2>
              <div class="setBrand">
                <span>Brand: </span>
                <span class="colorText">test</span>
                <span class="setInventory">inventory: </span>
                <span class="colorText">test</span>
              </div>
              <div>
                <span>Brand: </span>
                <span class="colorText">test</span>
              </div>
              <div class="setSize">
                <span>size: </span>
                <br />
                <select class="selectBox">
                  <option value="grapefruit">120*8</option>
                  <option value="lime">145*26</option>
                  <option selected value="coconut">
                    80*10 m
                  </option>
                  <option value="mango">47*85 m</option>
                </select>
              </div>
            </div>
            <div class="col-4  cardMargin">
              <div class="shopCard payment">
                <button className="ml-auto mr-3" id="shopCardButton2">
                  75000$
                </button>
                <div className="row">
                  <h3 class="paymentMethod">Payment Method :</h3>
                  <form class="checkbox">
                    <input
                      class="radioBox radioMaster"
                      type="radio"
                      name="PaymentMethods"
                      value="Master-card"
                    />
                    <label for="Master-card"> Master-card</label>
                    <br />
                    <input
                      class="radioBox radioMaster"
                      type="radio"
                      name="PaymentMethods"
                      value="paypal"
                    />
                    <label for="Paypal"> Paypal</label>
                    <br />
                    <input
                      class="radioBox radioMaster"
                      type="radio"
                      name="PaymentMethods"
                      value="visa"
                    />
                    <label for="Visa"> Master-card</label>
                    <br />
                    <input
                      class="radioBox radioMaster"
                      type="radio"
                      name="PaymentMethods"
                      value="cash"
                    />
                    <label for="Master-card"> Master-card</label>
                    <br />
                  </form>
                </div>
                <button class="button_price" onClick={this.openNav}>
                  price detail
                </button>
                <br />
                <button class="button_order" onClick={this.OpenPayPage}>
                  {" "}
                  order
                </button>
              </div>
            </div>
          </div>
          <h5 class="specifaction">Specifactions</h5>
          <div class="row ">
            {this.state.specifaction.map((item) => (
              <div class="col-6">
                <div class="Specifactions">
                  <span class="title">{item.x}</span>
                  <span class="specifactionItem"> {item.y}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="popular">
            <h4>Popular products</h4>
            <Flickity
              className={"carousel"} // default ''
              elementType={"div"} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate // default false
              static // default false
            >
              {this.state.Categories.map((item) => (
                <div className="col-md-3 cardMargin">
                  <div class="shopCard">
                    <p id="shopCardName">{item.Name}</p>
                    <img id="shopCardImage" src={carpet}></img>
                    <div className="row shopCardRow">
                      <span id="shopCardPrice">785.000 ₽</span>
                      <button className="ml-auto mr-3" id="shopCardButton">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
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
            <i class="closebtn fa fa-times fa-2x" onClick={this.closeOrder}></i>
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
      </div>
    );
  }
}

export default detail;
