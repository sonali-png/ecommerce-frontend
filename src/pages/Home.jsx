import React from "react";
import footwear_banner from "../images/footwear.jpg";
import men_banner from "../images/men.jpg";
import women_banner from "../images/women.jpg";
import kids_banner from "../images/kids.jpg";
import jwellery_banner from "../images/jwellery.jpg";
import "../css/layout.css";

export default function Home() {
    return (
        <div className="bgf-home-wrapper">
            <div className="bgf-banner-list">
                <div className="bgf-banner">
                    <a href="/products/women">
                        <img src={women_banner} alt="women banner" />
                    </a>
                    <span>Women</span>
                </div>
                <div className="bgf-banner">
                    <a href="/products/men">
                        <img src={men_banner} alt="men banner" />                        
                    </a>
                    <span>Men</span>
                </div>
                <div className="bgf-banner">
                    <a href="/products/kids">
                        <img src={kids_banner} alt="kids banner" />                       
                    </a>
                    <span>Kids</span>
                </div>
                <div className="bgf-banner">
                    <a href="/products/jwellery">
                        <img src={jwellery_banner} alt="jwellery banner" /> 
                    </a>
                    <span>Jwellery</span>
                </div>
                <div className="bgf-banner">
                    <a href="/products/footwear">
                        <img src={footwear_banner} alt="footwear banner" />
                    </a>
                    <span>Footwear</span>   
                </div>
            </div>
        </div>
    );
}