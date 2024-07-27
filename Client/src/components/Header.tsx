import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import '../style/style.css'; // Import the CSS file
import image1 from '../images/1.png'; // Adjust the path as needed
import image2 from '../images/2.png';
import image3 from '../images/3.png';
import bar from '../images/bar.png';
import image6 from '../images/6.png';
import logo from '../images/logo.png';

const Header = () => {
  const toggleMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    const menu = document.getElementById("navDropdownMenu");
    if (menu) {
      if (menu.className === "nav_dropdown_menu") {
        menu.className += " responsive";
      } else {
        menu.className = "nav_dropdown_menu";
      }
    }
  };

  return (
    <div>
      <div className="body_items">
        <div className="item_1">
        <img src={image6} alt="" />
        </div>
        <div className="item_2">
        
        </div>
        <div className="just_do_it">
          <p>Just<br />Do<br />It</p>
        </div>
      </div>

      <div className="container">
        <nav>
          <div className="left_nav">
            <div className="nav_logo">
            <img src={logo} alt="" />
            </div>
            <div className="nav_menu">
              <ul>
                <li>
                  <a href="#" className="link">HOME</a>
                  <div className="link_border"></div>
                </li>
                <li>
                  <a href="#" className="link">KIDS</a>
                  <div className="link_border"></div>
                </li>
                <li>
                  <a href="#" className="link">MEN</a>
                  <div className="link_border"></div>
                </li>
                <li>
                  <a href="#" className="link">WOMEN</a>
                  <div className="link_border"></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="right_nav">
            <div className="nav_cart_box">
              <i className="bx bx-cart"></i>
            </div>
            <div className="dropdown">
              <div className="menu_bars" onClick={toggleMenu}>
                <div className="menu_bars_btn">
                  <img src={bar} className="bar_1" alt="" />
                  <img src={bar} className="bar_2" alt="" />
                </div>
                <div className="nav_dropdown_menu" id="navDropdownMenu">
                  <ul>
                    <li>
                      <a href="#" className="link">HOME</a>
                      <div className="link_border"></div>
                    </li>
                    <li>
                      <a href="#" className="link">KIDS</a>
                      <div className="link_border"></div>
                    </li>
                    <li>
                      <a href="#" className="link">MEN</a>
                      <div className="link_border"></div>
                    </li>
                    <li>
                      <a href="#" className="link">WOMEN</a>
                      <div className="link_border"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="main">
          <div className="left_col">
            <div className="shoe_title">
              <p>Nike Air Jordan</p>
            </div>
            <div className="line">
              <hr />
            </div>
            <div className="shoe_description">
              <p>Nike Shoes E-commerce Web Template Shop - UpLabs, Nike introduces new consumer website - oregonlive.com</p>
            </div>
            <div className="cart">
              <button className="cart_btn">Add To Cart</button>
              <p className="price">$197.99</p>
            </div>

            <div className="shop_box">
              <div className="shop_item_container">
                <div className="shoe_img_box">
                  <img src={image2} className="shoe_img" alt="" />
                </div>
                <div className="shoe_name_price">
                  <h3>Nike Air Max</h3>
                  <p>$169.99</p>
                </div>
                <div className="add_to_shop">
                  <i className="bx bx-cart"></i>
                </div>
              </div>
              <div className="shop_item_container">
                <div className="shoe_img_box">
                  <img src={image3} className="shoe_img" alt="" />
                </div>
                <div className="shoe_name_price">
                  <h3>Nike Air Force</h3>
                  <p>$172.99</p>
                </div>
                <div className="add_to_shop">
                  <i className="bx bx-cart"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="right_col">
            <img src={image1} className="featured_img" alt="" />
            <div className="shopping_cart_btn">
              <i className="bx bx-cart"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
