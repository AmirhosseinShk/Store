import React, { Fragment } from "react";
import IconAskQuestion from "./asstes/svg/Asset4.svg";
import IconChecked from "./asstes/svg/checked.svg";
import "./asstes/css/askQuestion.css";
import Header from "./Header.js";
import Footer from "./Footer.js";

export default class AskQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.OpenMessage = this.OpenMessage.bind(this);
  }

  OpenMessage(event) {
    console.log(event.target.value);
    if (event.target.value == "bsubmitt") {
      this.setState({ isOpen: true });
      var x = document.getElementsByClassName("header")[0];
      x.setAttribute("id", "blur");
      var x = document.getElementsByClassName("main")[0];
      x.setAttribute("id", "blur");
      var x = document.getElementsByClassName("MainFooter")[0];
      x.setAttribute("id", "blur");
      document.getElementById("MessageSuccessfully").style.width = "35%";
      document
        .getElementById("MessageSuccessfully")
        .setAttribute("class", "shadowbackground");
      console.log(this.state.isOpen);
    } else {
      var x = document.getElementsByClassName("header")[0];
      x.setAttribute("id", "");
      var x = document.getElementsByClassName("main")[0];
      x.setAttribute("id", "");
      var x = document.getElementsByClassName("MainFooter")[0];
      x.setAttribute("id", "");
      document.getElementById("MessageSuccessfully").style.width = "0";
      document.getElementById("MessageSuccessfully").setAttribute("class", "");
    }
    event.preventDefault();
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div>
          <div class="main" onClick={this.OpenMessage}>
            <div class="row">
              <div class="col-sm-4">
                <img
                  class="IconLegalInfo"
                  width="200"
                  height="260"
                  src={IconAskQuestion}
                  alt="Icon Ask Question"
                ></img>
              </div>
              <div class="col-sm-8 textAskQuestion">
                <h4>Отправьте ваш запрос</h4>
                <p class="pAskQuestion">
                  задайте любой вопрос и оставьте свои контактные данные.
                </p>
                <textarea
                  class="typeQuestion"
                  placeholder="пример"
                  rows="5"
                  cols="23"
                ></textarea>
                <button
                  class="submitButton"
                  value="bsubmitt"
                  on
                  onClick={this.OpenMessage}
                >
                  представить
                </button>
              </div>
            </div>
          </div>
          <div id="MessageSuccessfully">
            <img
              class="IconMessage"
              src={IconChecked}
              alt="ok"
              height="200"
              width="100"
            ></img>
            <div class="row">
              <p class="pMessage">Ваш запрос был отправлено успешно</p>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </Fragment>
    );
  }
}
