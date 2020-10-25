import React from "react";
import "./asstes/css/MainPage.css";
import LargeHorizontal from "./2.PNG";
import Vertical from "./1.PNG";
import SmallHorizontal from "./3.png";
import carpet from "./carpet.PNG";
import "./asstes/css/carousel.css";
import "mdbreact/dist/js/jquery";
import "mdbreact/dist/js/popper";
import "mdbreact/dist/js/bootstrap";
import "mdbreact/dist/js/mdb";

import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdbreact";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Categories: [
        { icon: "fa fa-phone fa-3x", Name: "Carpet" },
        { icon: "fa fa-shopping-bag fa-3x", Name: "Bags" },
        { icon: "fa fa-tshirt fa-3x", Name: "Clothes" },
        { icon: "fa fa-phone fa-3x", Name: "Handicrafts" },
      ],
    };
  }

  render() {
    return (
      <div class="main">
        <div class="row" style={{ height: "80%" }}>
          <div class="col-9">
            <img
              class="HorizontalImge"
              src={LargeHorizontal}
              alt="picture1"
            ></img>
            <div class="row">
              <div class="col-9">
                <h2 class="category">Categories</h2>
                <div class="row">
                  {this.state.Categories.map((item) => (
                    <div class="col-3">
                      <div class="setcolor">
                        <i class={item.icon} id="iconCenter"></i>
                        <h5 id="titleCategories">{item.Name}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="col-3">
                <img
                  class="HorizontalImge2"
                  src={SmallHorizontal}
                  alt="picture3"
                ></img>
              </div>
            </div>
          </div>
          <div class="col-3">
            <img class="VerticalImge" src={Vertical} alt="picture1"></img>
          </div>
        </div>
        <div className="recent">
          <h4>Most Recent</h4>
          <MDBCarousel
            activeItem={1}
            length={2}
            slide={true}
            showControls={true}
            showIndicators={false}
            multiItem
          >
            <MDBCarouselInner>
              <MDBRow>
                <MDBCarouselItem itemId="1">
                  <MDBCol md="3">
                    <MDBCard className="mb-2">
                      <MDBCardImage
                        className="img-fluid"
                        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>MDBCard title</MDBCardTitle>
                        <MDBCardText>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </MDBCardText>
                        <MDBBtn color="primary">MDBBtn</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                  {this.state.Categories.map((item) => (
                    <MDBCol md="3">
                      <div class="card shopCard">
                        <p id="shopCardName">{item.Name}</p>
                        <img src={carpet}></img>
                        <div className="row">
                          <span id="shopCardPrice">785.000 ₽</span>
                          <button className="ml-auto mr-3" id="shopCardButton">
                            test
                          </button>
                        </div>
                      </div>
                    </MDBCol>
                  ))}
                </MDBCarouselItem>
              </MDBRow>
            </MDBCarouselInner>
          </MDBCarousel>
          <h4>TESTTTTTTT</h4>
          <div
            id="carousel-example-multi"
            class="carousel slide carousel-multi-item v-2"
            data-ride="carousel"
          >
            <div class="controls-top">
              <a
                class="btn-floating"
                href="#carousel-example-multi"
                data-slide="prev"
              >
                <i class="fas fa-chevron-left"></i>
              </a>
              <a
                class="btn-floating"
                href="#carousel-example-multi"
                data-slide="next"
              >
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>

            <ol class="carousel-indicators">
              <li
                data-target="#carousel-example-multi"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#carousel-example-multi" data-slide-to="1"></li>
              <li data-target="#carousel-example-multi" data-slide-to="2"></li>
              <li data-target="#carousel-example-multi" data-slide-to="3"></li>
              <li data-target="#carousel-example-multi" data-slide-to="4"></li>
              <li data-target="#carousel-example-multi" data-slide-to="5"></li>
            </ol>

            <div class="carousel-inner v-2" role="listbox">
              <div class="carousel-item active">
                <div class="col-12 col-md-4">
                  <div class="card mb-2">
                    <img
                      class="card-img-top"
                      src="https://mdbootstrap.com/img/Photos/Others/img (36).jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title font-weight-bold">Card title</h4>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a class="btn btn-primary btn-md btn-rounded">Button</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="col-12 col-md-4">
                  <div class="card mb-2">
                    <img
                      class="card-img-top"
                      src="https://mdbootstrap.com/img/Photos/Others/img (34).jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title font-weight-bold">Card title</h4>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a class="btn btn-primary btn-md btn-rounded">Button</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="col-12 col-md-4">
                  <div class="card mb-2">
                    <img
                      class="card-img-top"
                      src="https://mdbootstrap.com/img/Photos/Others/img (38).jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title font-weight-bold">Card title</h4>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a class="btn btn-primary btn-md btn-rounded">Button</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="col-12 col-md-4">
                  <div class="card mb-2">
                    <img
                      class="card-img-top"
                      src="https://mdbootstrap.com/img/Photos/Others/img (29).jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title font-weight-bold">Card title</h4>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a class="btn btn-primary btn-md btn-rounded">Button</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="col-12 col-md-4">
                  <div class="card mb-2">
                    <img
                      class="card-img-top"
                      src="https://mdbootstrap.com/img/Photos/Others/img (30).jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title font-weight-bold">Card title</h4>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a class="btn btn-primary btn-md btn-rounded">Button</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="col-12 col-md-4">
                  <div class="card mb-2">
                    <img
                      class="card-img-top"
                      src="https://mdbootstrap.com/img/Photos/Others/img (27).jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title font-weight-bold">Card title</h4>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a class="btn btn-primary btn-md btn-rounded">Button</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="row shopRow">
            <button className="col-1">test</button>
            {this.state.Categories.map((item) => (
              <div class="col">
                <div class="shopCard">
                  <p id="shopCardName">{item.Name}</p>
                  <img src={carpet}></img>
                  <span id="shopCardPrice">785.000 ₽</span>
                </div>
              </div>
            ))}
            <button className="col-1">test</button>
          </div> */}
        </div>
      </div>
    );
  }
}

export default MainPage;
