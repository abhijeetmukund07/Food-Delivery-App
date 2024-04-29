import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-left ">
          <img src={assets.logo} alt="Logo"/>
          <p className="m-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero hic
          necessitatibus animi aliquid! Sint amet eum quidem est non expedita,
          numquam laboriosam cupiditate earum harum perspiciatis atque vero sunt
          consectetur.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook logo" />
            <img src={assets.twitter_icon} alt="twitter logo" />
            <img src={assets.linkedin_icon} alt="linkedin logo" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>About Us</Link>
            </li>
            <li>
              <Link>Delivery</Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div className="footer-content-right">
            <h2>Get in Touch</h2>
            <ul>
                <li><a href="tel: +919999955555 ">+91 99999-55555</a></li>
                <li><a href="mailto: contact@pomato.com?subject=Raise Query">contact@pomato.com</a></li>
            </ul>
        </div>
      </div>
        <hr />
        <p>Copyright 2024 ©️ pomato.com All Rights Reserved</p>
    </div>
  );
}

export default Footer;
