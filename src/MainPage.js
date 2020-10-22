import React from "react";
import "./Css/MainPage.css";
import LargeHorizontal from "./2.PNG";
import Vertical from "./1.PNG";
import SmallHorizontal from "./3.png";
import carpet from "./carpet.PNG";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdbreact";

export default class register extends React.Component {
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
              length={3}
              slide={true}
              showControls={true}
              showIndicators={true}
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
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </MDBCardText>
                          <MDBBtn color="primary">MDBBtn</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="3">
                      <MDBCard className="mb-2">
                        <MDBCardImage
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>MDBCard title</MDBCardTitle>
                          <MDBCardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </MDBCardText>
                          <MDBBtn color="primary">MDBBtn</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="3">
                      <MDBCard className="mb-2">
                        <MDBCardImage
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>MDBCard title</MDBCardTitle>
                          <MDBCardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </MDBCardText>
                          <MDBBtn color="primary">MDBBtn</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="2">
                    <MDBCol md="4">
                      <MDBCard className="mb-2">
                        <MDBCardImage
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(60).jpg"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>MDBCard title</MDBCardTitle>
                          <MDBCardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </MDBCardText>
                          <MDBBtn color="primary">MDBBtn</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBCard className="mb-2">
                        <MDBCardImage
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(47).jpg"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>MDBCard title</MDBCardTitle>
                          <MDBCardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </MDBCardText>
                          <MDBBtn color="primary">MDBBtn</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBCard className="mb-2">
                        <MDBCardImage
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(48).jpg"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>MDBCard title</MDBCardTitle>
                          <MDBCardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </MDBCardText>
                          <MDBBtn color="primary">MDBBtn</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="3">
                    <MDBCol md="4">
                      <MDBCard className="mb-2">
                        <MDBCardImage
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(53).jpg"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>MDBCard title</MDBCardTitle>
                          <MDBCardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </MDBCardText>
                          <MDBBtn color="primary">MDBBtn</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBCard className="mb-2">
                        <MDBCardImage
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(45).jpg"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>MDBCard title</MDBCardTitle>
                          <MDBCardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </MDBCardText>
                          <MDBBtn color="primary">MDBBtn</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBCard className="mb-2">
                        <MDBCardImage
                          className="img-fluid"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(41).jpg"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>MDBCard title</MDBCardTitle>
                          <MDBCardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </MDBCardText>
                          <MDBBtn color="primary">MDBBtn</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBCarouselItem>
                </MDBRow>
              </MDBCarouselInner>
            </MDBCarousel>
          <div class="container my-4">
            <hr class="my-4" />
            <div
              id="multi-item-example"
              class="carousel slide carousel-multi-item"
              data-ride="carousel"
            >
              <div class="controls-top">
                <a
                  class="btn-floating"
                  href="#multi-item-example"
                  data-slide="prev"
                >
                  <i class="fa fa-chevron-left"></i>
                </a>
                <a
                  class="btn-floating"
                  href="#multi-item-example"
                  data-slide="next"
                >
                  <i class="fa fa-chevron-right"></i>
                </a>
              </div>

              <ol class="carousel-indicators">
                <li
                  data-target="#multi-item-example"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li data-target="#multi-item-example" data-slide-to="1"></li>
                <li data-target="#multi-item-example" data-slide-to="2"></li>
              </ol>

              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4 clearfix d-none d-md-block">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4 clearfix d-none d-md-block">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4 clearfix d-none d-md-block">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(47).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4 clearfix d-none d-md-block">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(48).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(53).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4 clearfix d-none d-md-block">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(45).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4 clearfix d-none d-md-block">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(51).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container text-center my-3">

          <div class="container">
  <h2>Carousel Example</h2>  
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
    {/* <!-- Indicators --> */}
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    {/* <!-- Wrapper for slides --> */}
    <div class="carousel-inner">
      <div class="item active">
        <img src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(2).jpg" alt="Los Angeles"/>
      </div>

      <div class="item">
        <img src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(4).jpg" alt="Chicago"/>
      </div>
    
      <div class="item">
        <img src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(6).jpg" alt="New york"/>
      </div>
    </div>

    {/* <!-- Left and right controls --> */}
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
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
