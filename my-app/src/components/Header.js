import React from "react";
import fullIcon from "../assets/fullE_icon.png";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="logo-name">
        <img
          src={fullIcon}
          alt="Ícone da Full Engenharia"
          style={{ width: "50px" }}
        />
        <p>
          <strong>GRUPO FULL</strong>
        </p>
      </div>

      <h1>FULL PLANS BI</h1>
    </header>
  );
};

export default Header;
