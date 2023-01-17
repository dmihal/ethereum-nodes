import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      <span className="social-div">
        <p>Find us here:</p>
        <span>
        <img src="twitter.svg" />
        <img src="github.svg" />
        <img src="discord.svg" />
        </span>
      </span>
      <span style={{width:'400px'}}></span>
      <button className="add-provider">+ Add your Provider</button>
      <style jsx>{`
        .footer-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
          position:sticky;
          bottom: 20px;
          padding: 0px 20px;
         
        
        }
        .social-div {
          display: flex;
          align-items:center;
          justify-content: center;
          gap:7px;
        }
        .social-div img {
          padding: 0 7px;
        }

        p {
          margin: 0;
          width:fit-content;
        }
        .add-provider {
          border: 1px solid #0477f4;
          border-radius: 40px;
          color: #0477f4;
          background:transparent;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Footer;
