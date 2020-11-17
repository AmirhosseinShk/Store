import React from "react";
import "./asstes/css/Footer.css";
import "./asstes/css/global.css";
import { Link } from "react-router-dom";

function footer() {
  return (
    <div className="MainFooter">
      <div className="row">
        <div className="col-4" id="SpaceFooter">
          <i id="SearchIcon" className="fa fa-phone"></i>
          <span className="information3"> +7 909 555 454-9</span>
          <br className="line" />
          <i id="SearchIcon" className="fa fa-envelope"></i>
          <span className="information3"> testshop@yahoo.com</span>
          <br class="line" />
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <span class="information2">Moscow, st. Prishvina, 26. </span>
          <br></br>
          <span class="information">
            TVK. 2nd floor, pavilion B1. m.Bibirevo{" "}
          </span>
          <br></br>
          <span class="information">Mon-Sun 9.00-21.00 Moscow time</span>
        </div>

        <div class="col-auto" id="SpaceFooters">
          <spam class="headerOfFooter">Products</spam>
          <br class="line" />
          <a href="#" class="ItemFooter deleteUnderLink">
            Clothes
          </a>
          <br class="line" />
          <a href="#" class="ItemFooter deleteUnderLink">
            Carpet
          </a>
          <br class="line" />
          <a href="#" class="ItemFooter deleteUnderLink">
            Handicrafts
          </a>
          <br class="line" />
          <a href="#" class="ItemFooter deleteUnderLink">
            Bags
          </a>
        </div>
        <div class="col-auto" id="SpaceFooters">
          <spam class="headerOfFooter">About us</spam>
          <br class="line" />
          <Link to={{ pathname: "/AboutUs" }} className="ItemFooter deleteUnderLink">
            Introduction
          </Link>
          <br class="line" />
          <Link to={{ pathname: "/LegalInfo" }} className="ItemFooter deleteUnderLink">
            Legal Info
          </Link>
          <br class="line" />
          <Link to={{ pathname: "/Policy" }} className="ItemFooter deleteUnderLink">
            Policy
          </Link>
        </div>
        <div class="col-auto" id="SpaceFooters">
          <spam class="headerOfFooter">Support</spam>
          <br class="line" />
          <a href="#" class="ItemFooter deleteUnderLink">
            Conditions
          </a>
          <br class="line" />
          <Link to={{ pathname: "/Questions" }} className="ItemFooter deleteUnderLink">
            FAQ
          </Link>
        </div>

        <div class="col-auto" id="SpaceFooters">
          <spam class="headerOfFooter">Payment</spam>
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
}
export default footer;
