import React, { Fragment } from "react";
import axios from "axios";

import Header from "./Header.js";
import Footer from "./Footer.js";
import { addToStorage, removeFromStorage } from "./JsonHelperFunction.js";

import configData from "./config.json";

import "./asstes/css/shoppingItem.css";
import carpet2 from "./asstes/Photos/carpet2.PNG";
import IconChecked from "./asstes/svg/checked.svg";

export default class ShoppingItem extends React.Component {
  constructor(props) {
    super(props);
    var Items = localStorage.getItem("ShoppingItems");
    var ShoppingItems = JSON.parse(Items);
    var isDisable = true;
    var totalPrice = 0;
    for (let i = 0; i < ShoppingItems.length; i++) {
      totalPrice += ShoppingItems[i].price;
      isDisable = false;
    }
    this.state = {
      items: ShoppingItems,
      totalPrice: totalPrice,
      width: window.innerWidth,
      isDisable: isDisable,
      name: "",
      address: "",
      email: "",
      phoneNumber: 0,
    };
    this.changIcon = this.changIcon.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
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
    if (localStorage.getItem("ShoppingItems") == "[]") {
      document.getElementById("redDotShopItem").style.display = "none";
    } else {
      document.getElementById("redDotShopItem").style.display = "inline-block";
    }
  }

  changIcon(event, item) {
    var butplusItem = event.target;
    var totalPrice = this.state.totalPrice;
    if (event.target.id === "shopCardShoppingButton") {
      butplusItem = event.target.firstChild;
    }
    var elements = document.querySelectorAll("[id='" + butplusItem.id + "']");
    for (let j = 0; j < elements.length; j++) {
      var butplus = elements[j];
      var shopCardButton = butplus.parentElement;
      if (butplus.classList[1] === "icon-plus2") {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        var resItems = addToStorage(ShoppingItems, item);
        totalPrice += item.price;
        localStorage.setItem("ShoppingItems", resItems);
        butplus.setAttribute("class", "fa icon-close closeicon");
        shopCardButton.style.background = "rgb(255,0,94)";
      } else {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        var resItems = removeFromStorage(ShoppingItems, item);
        totalPrice -= item.price;
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
    this.state = {
      totalPrice: totalPrice,
    };
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

  sendOrder() {
    var shoppingItems = this.state.items;
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

  render() {
    const { width } = this.state;
    const isMobile = width <= 978;
    if (!isMobile) {
      return (
        <Fragment>
          <Header></Header>
          <div className="main">
            <div className="row">
              {this.state.items.map((item) => (
                <div className="col-md-3 cardMargin">
                  <div className="shopCardShopping">
                    <p id="shopCardShoppingName">{item.name}</p>
                    <img
                      id="shopCardShoppingImage"
                      src={carpet2}
                      alt="carpet"
                    ></img>
                    <div className="row shopCardShoppingRow">
                      <span id="shopCardShoppingPrice">{item.price}</span>
                      <button
                        className="ml-auto mr-3"
                        id="shopCardShoppingButton"
                        onClick={(e) => this.changIcon(e, item)}
                      >
                        <i
                          id={item.id}
                          className="fas icon-close closeicon"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="row">
              <div class="col text-center">
                <button
                  disabled={this.state.isDisable}
                  className="order"
                  data-toggle="modal"
                  data-target="#cash"
                >
                  заказ
                </button>
              </div>
            </div>
            <div
              className="modal fade"
              id="cash"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      className="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span className="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div className="registerFormCash">
                      <div className="row ItemOrder">
                        <span className="titlePriceDetails">детали цены</span>
                      </div>
                      {this.state.items.map((item) => (
                        <div className="row">
                          <div class="col text-center">
                            <span className="itemsCash">{item.name} :</span>
                            <span className="price">{item.price} ₽</span>
                          </div>
                        </div>
                      ))}
                      <hr className="lineTotal"></hr>
                      <span className="totalamountCash">Итого :</span>
                      <span className="price totalamountCash">
                        {" "}
                        {this.state.totalprice} ₽
                      </span>
                      <br />
                      <button
                        className="pay"
                        data-toggle="modal"
                        data-target="#register"
                      >
                        платить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="register"
                tabindex="-2"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content" id="my-modal">
                    <div>
                      <button
                        type="button"
                        className="close setsizetimes"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span className="times" aria-hidden="true">
                          &times;
                        </span>
                      </button>
                      <form className="addinformation">
                        <h6 className="inputsLable" for="Name">
                          название
                        </h6>
                        <input
                          className="inputs"
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
                          className="inputs"
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
                          className="inputs"
                          type="text"
                          placeholder="Contact Number"
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
                          className=" inputsAddress"
                          type="text"
                          placeholder="Address"
                          onChange={this.handleChangeAddress}
                          name="address"
                          id="address"
                          required
                        />
                      </form>
                      <button
                        className="submit"
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
                          className="IconMessage"
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
          </div>
          <Footer></Footer>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Header></Header>
          <div className="main">
            <div className="row">
              {this.state.items.map((item) => (
                <div className="col-6 cardMargin">
                  <div className="shopCardShopping">
                    <p id="shopCardShoppingName">{item.name}</p>
                    <img
                      id="shopCardShoppingImage"
                      src={carpet2}
                      alt="carpet"
                    ></img>
                    <div className="row shopCardShoppingRow">
                      <span id="shopCardShoppingPrice">{item.price}</span>
                      <button
                        className="ml-auto mr-3"
                        id="shopCardShoppingButton"
                        onClick={(e) => this.changIcon(e, item)}
                      >
                        <i
                          id={item.id}
                          className="fas icon-close closeicon"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="row">
              <div class="col text-center">
                <button
                  disabled={this.state.isDisable}
                  className="order"
                  data-toggle="modal"
                  data-target="#cash"
                >
                  заказ
                </button>
              </div>
            </div>
            <div
              className="modal fade"
              id="cash"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      className="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span className="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <div className="registerFormCash">
                      <div className="row ItemOrder">
                        <span className="titlePriceDetails">детали цены</span>
                      </div>
                      {this.state.items.map((item) => (
                        <div className="row">
                          <div class="col text-center">
                            <span className="itemsCash">{item.name} :</span>
                            <span className="price">{item.price} ₽</span>
                          </div>
                        </div>
                      ))}
                      <hr className="lineTotal"></hr>
                      <span className="totalamountCash">Итого :</span>
                      <span className="price totalamountCash">
                        {" "}
                        {this.state.totalprice} ₽
                      </span>
                      <br />
                      <button
                        className="pay"
                        data-toggle="modal"
                        data-target="#register"
                      >
                        платить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="register"
                tabindex="-2"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content" id="my-modal">
                    <div>
                      <button
                        type="button"
                        className="close setsizetimes"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span className="times" aria-hidden="true">
                          &times;
                        </span>
                      </button>
                      <form className="addinformation">
                        <h6 className="inputsLable" for="Name">
                          название
                        </h6>
                        <input
                          className="inputs"
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
                          className="inputs"
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
                          className="inputs"
                          type="text"
                          placeholder="Contact Number"
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
                          className=" inputsAddress"
                          type="text"
                          placeholder="Address"
                          onChange={this.handleChangeAddress}
                          name="address"
                          id="address"
                          required
                        />
                      </form>
                      <button
                        className="submit"
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
                          className="IconMessage"
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
          </div>
          <Footer></Footer>
        </Fragment>
      );
    }
  }
}
