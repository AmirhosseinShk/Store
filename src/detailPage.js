import React from "react";
import axios from "axios";
import "./asstes/css/detailPage.css";
import carpetTop from "./asstes/Photos/Capture_page2.PNG";
import carpet from "./asstes/Photos/carpet.PNG";
import littleCarpet from "./asstes/Photos/littleCarpet.PNG";
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
        { x: "Quality", y: "test" },
        { x: "Shape", y: "test" },
        { x: "Quality", y: "test" },
        { x: "Shape", y: "test" },
      ],
      ItemShop: [
        { name: "test", price: "75.000$" },
        { name: "test", price: "75.000$" },
        { name: "test", price: "75.000$" },
        { name: "test", price: "75.000$" },
      ],
      totalprice: 0.0,
      deleteElement: [],
      popularCarpets: []
    };
    this.changIcon = this.changIcon.bind(this);
    this.openNav = this.openNav.bind(this);
    this.OpenPayPage = this.OpenPayPage.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.RegisterForm = this.RegisterForm.bind(this);
    this.ShowImgLarge = this.ShowImgLarge.bind(this);
  }


  componentDidMount() {
    var urlDb = "http://localhost:8080/Server/rest/getPoularCarpet";
    axios(urlDb).then(
      (result) => {
        var popular = result.data.Carpets;
        console.log(popular);
        console.log(popular[1].name);
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

  refreshFlickity() {
    console.log("here");
    this.flkty.resize();
    console.log("here");
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

  ShowImgLarge(){
    var x = document.getElementsByClassName("header")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("main")[0];
    x.setAttribute("id", "blur");
    var x = document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id", "blur");
    console.log(document.getElementById("panelImg"));
     document.getElementById("panelImg").style.width = "45%";
    
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
          <div class="row itemCard">
            <div class="col-5 cardMarginProduct">
              <div class="shopCardProduct producePhoto">
                <div className="row">
                  <button id="shopCardButton" onClick={this.changIcon}>
                    <i id="butplus" class="fas fa-plus"></i>
                  </button>
                </div>
                <div id="shopCardImage" className="row ">
                  <img id="cardImage" src={carpetTop}></img>
                </div>
                 <div class="row">
                   <div class="col-3">
                  <img src={littleCarpet} ></img>
                  </div>
                  <div class="col-3">
                  <img src={littleCarpet} ></img>
                  </div>
                  <div class="col-3">
                  <img src={littleCarpet} ></img>
                  </div>
                  <div class="col-3 buttomImgDiv">
                  <img src={littleCarpet} class="blurImg" ></img>
                  <button class="buttonImg" onClick={this.ShowImgLarge}>...</button>
                  </div>
                </div> 
              </div>
            </div>
            <div class="col-3 productText cardMarginProduct">
              <h2>Persian carpet / no44</h2>
              <div class="setBrand">
                <span>Brand : </span>
                <span class="colorText">Test</span>
                <span class="setInventory">Inventory : </span>
                <span class="colorText">Test</span>
              </div>
              <div>
                <span>Delivery time : </span>
                <span class="colorText">Test</span>
              </div>
              <div class="setSize">
                <span>Size :</span>
                <br />
                <i className="down"></i>
                <select id="" className="SelectButton" name="CityBox">
                  <option Value="Tehran">80 x 10 m</option>
                  <option Value="Mashhad">90 x 25 m</option>
                  <option Value="Esfehan">250 x 100 m</option>
                </select>
              </div>
              <button class="live_tour" onClick={this.openNav}>
                Live tour
              </button>
            </div>
            <div class="col-4 cardMarginProduct">
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
              flickityRef={(c) => (this.flkty = c)}
              className={"carousel"} // default ''
              elementType={"div"} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate={true} // default false
              static={false} // default false
            >
              {this.state.popularCarpets.map((item) => (
                <div className="col-md-3 cardMargin">
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
        <div class="showImg" id="panelImg">
        <Flickity 
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
    >
      <img class="setImgLarge" width="600" height="250" src={carpetTop}/>
      <img class="setImgLarge"src={carpetTop} width="600" height="250"/>
      <img  class="setImgLarge"src={carpetTop} width="600" height="250"/>
    </Flickity>
      </div>
      </div>
    );
  }
}

export default detail;
