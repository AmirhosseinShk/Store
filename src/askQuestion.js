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
  }

  componentDidMount() {
    if (localStorage.getItem("ShoppingItems") == "[]") {
      document.getElementById("redDotShopItem").style.display = "none";
    } else {
      document.getElementById("redDotShopItem").style.display = "inline-block";
    }
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div>
          <div className="main">
            <div className="row">
              <div className="col-sm-4">
                <img
                  className="IconLegalInfo"
                  width="200"
                  height="260"
                  src={IconAskQuestion}
                  alt="Icon Ask Question"
                ></img>
              </div>
              <div className="col-sm-8 textAskQuestion">
                <h4>Отправьте ваш запрос</h4>
                <p class="pAskQuestion">
                  задайте любой вопрос и оставьте свои контактные данные.
                </p>
                <textarea
                  className="typeQuestion"
                  placeholder="пример"
                  rows="5"
                  cols="23"
                ></textarea>
                <button
                  className="submitButton"
                  value="bsubmitt"
                  data-toggle="modal"
                  data-target="#submitComment"
                  data-dismiss="modal"
                >
                  представить
                </button>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="submitComment"
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
                        Ваш запрос был отправлено успешно
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
