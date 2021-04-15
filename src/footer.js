import React from "react";
import "./asstes/css/Footer.css";
import "./asstes/css/global.css";
import "./asstes/icons/fontello4/css/fontello.css";
import { Link } from "react-router-dom";

export default class header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
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

  render() {
    const { width } = this.state;
    const isMobile = width <= 978;
    if (!isMobile) {
      return (
        <div className="MainFooter">
          <div className="row">
            <div className="col-sm-4" id="SpaceFooter">
              <i id="SearchIcon" className="icon-phone-call"></i>
              <span className="information3"> +7 909 555 454-9</span>
              <br className="line" />
              <i id="SearchIcon" className="icon-mail"></i>
              <span className="information3"> testshop@yahoo.com</span>
              <br class="line" />
              <i class="icon-location" aria-hidden="true"></i>
              <span class="information2">Moscow, st. Prishvina, 26. </span>
              <br></br>
              <span class="information">
                TVK. 2nd floor, pavilion B1. m.Bibirevo{" "}
              </span>
              <br></br>
              <span class="information">Mon-Sun 9.00-21.00 Moscow time</span>
            </div>

            <div class="col-sm-auto" id="SpaceFooters">
              <span class="headerOfFooter">товар</span>
              <br class="line" />
              <a href="#" class="ItemFooter deleteUnderLink">
                ткани
              </a>
              <br class="line" />
              <a href="#" class="ItemFooter deleteUnderLink">
                ковер
              </a>
              <br class="line" />
              <a href="#" class="ItemFooter deleteUnderLink">
                Ремесла
              </a>
              <br class="line" />
              <a href="#" class="ItemFooter deleteUnderLink">
                сумки
              </a>
            </div>
            <div class="col-sm-auto" id="SpaceFooters">
              <span class="headerOfFooter">насчет нас</span>
              <br class="line" />
              <Link
                to={{ pathname: "/AboutUs" }}
                className="ItemFooter deleteUnderLink"
              >
                введение
              </Link>
              <br class="line" />
              <Link
                to={{ pathname: "/LegalInfo" }}
                className="ItemFooter deleteUnderLink"
              >
                легальная информация
              </Link>
              <br class="line" />
              <Link
                to={{ pathname: "/Policy" }}
                className="ItemFooter deleteUnderLink"
              >
                политика
              </Link>
            </div>
            <div class="col-sm-auto" id="SpaceFooters">
              <span class="headerOfFooter">Поддержка</span>
              <br class="line" />
              <a href="#" class="ItemFooter deleteUnderLink">
                условия
              </a>
              <br class="line" />
              <Link
                to={{ pathname: "/Questions" }}
                className="ItemFooter deleteUnderLink"
              >
                часто задаваемые вопросы
              </Link>
            </div>

            <div class="col-sm-auto" id="SpaceFooters">
              <span class="headerOfFooter">оплата</span>
              <br class="line" />
              <a href="#" class="ItemFooter deleteUnderLink">
                Visa
              </a>
              <br class="line" />
              <a href="#" class="ItemFooter deleteUnderLink">
                Master-card
              </a>
              <br class="line" />
              <a href="#" class="ItemFooter deleteUnderLink">
                Paypal
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="MainFooter">
          <div className="row ShowFooter">
            <div className="col-6 marginItems">
              <h3>товар</h3>
              <a className="item deleteUnderLink" href="#">
                ткани
              </a>
              <br></br>
              <a className="item deleteUnderLink" href="#">
                ковер
              </a>
              <br></br>
              <a className="item deleteUnderLink" href="#">
                Ремесла
              </a>
              <br></br>
              <a className="item deleteUnderLink" href="#">
                сумки
              </a>
            </div>
            <div className="col-6 marginItems">
              <h3>насчет нас</h3>
              <Link
                to={{ pathname: "/AboutUs " }}
                className="item deleteUnderLink"
              >
                введение
              </Link>
              <br></br>
              <Link
                to={{ pathname: "/LegalInfo " }}
                className="item deleteUnderLink"
              >
                легальная информация
              </Link>
              <br></br>
              <Link
                to={{ pathname: "/Policy" }}
                className="item deleteUnderLink"
              >
                политика
              </Link>
            </div>
          </div>
          <div className="row ShowFooter ">
            <div className="col-6 marginItems">
              <h3>поддержка</h3>
              <a className="item deleteUnderLink" href="#">
                условия
              </a>
              <br></br>
              <Link to={{ pathname: "/FAQ" }} className="item deleteUnderLink">
                часто задаваемые вопросы
              </Link>
            </div>
            <div className="col-6 marginItems">
              <h3>оплаты</h3>
              <a className="item deleteUnderLink" href="#">
                Visa
              </a>
              <br></br>
              <a className="item deleteUnderLink" href="#">
                Master-card
              </a>
              <br></br>
              <a className="item deleteUnderLink" href="#">
                Paypal
              </a>
            </div>
          </div>

          <div className="col-sm-4" id="information">
            <i id="SearchIcon" className="icon-phone-call"></i>
            <span className="information3"> +7 909 555 454-9</span>
            <br className="line" />
            <i id="SearchIcon" className="icon-mail"></i>
            <span className="information3"> testshop@yahoo.com</span>
            <br class="line" />
            <i class="icon-location" aria-hidden="true"></i>
            <span class="information2">Moscow, st. Prishvina, 26. </span>
            <br></br>
            <span class="information">
              TVK. 2nd floor, pavilion B1. m.Bibirevo{" "}
            </span>
            <br></br>
            <span class="information">Mon-Sun 9.00-21.00 Moscow time</span>
          </div>
        </div>
      );
    }
  }
}
