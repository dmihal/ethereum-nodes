import React from "react";
import { useTheme } from 'next-themes'

const Footer: React.FC = () => {
  const { theme} = useTheme()
  return (
    <div className="footer-container">
      <span className="social-div">
        <p>Find us here:</p>
        <span>
          <img src={theme === 'light'?"twitter-blue.svg" : "twitter.svg"} />
          <img src={theme === 'light'? "github-blue.svg": "github.svg" }/>
          <img src={theme === 'light'? "discord-blue.svg": "discord.svg"} />
        </span>
      </span>
      <span className="metrics-container">
        <p>All metrics (7)</p>
        <button className="show-button">show</button>
      </span>
      <button className="add-provider">+ Add your Provider</button>
      <style jsx>{`
        @media (max-width: 1129px) {
          .social-div {
            display: none;
          }

          .show-button {
            color: ${theme === 'light' ? "#FFFFFF" :"#0477F4" };
            border-style: none;
            background: none;
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
          }

          p {
            margin: 0;
            width: fit-content;
            padding: 0px;
            color: ${theme === 'light' ? "#0477F4": "#000000" };
            
          }

          .add-provider {
            display: none;
          }

          .metrics-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 2px 16px;
            justify-content: center;
            gap: 5px;
            background: ${theme === 'light' ? "#000000": "#FFFFFF"};
            border: 1px solid ${theme === 'light' ?"#0477F4" : "#DDDDDD"};
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
            border-radius: 24px;
            margin:auto;
          }
        }

        .footer-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
          position: sticky;
          bottom: 20px;
          padding: 0px 20px;
        }
        @media (min-width: 1130px) {
          .social-div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 7px;
            width: fit-content;
            color: ${theme === 'light'? "#0477F4" : "#000000"}
          }
          .social-div img {
            padding: 0 7px;
          }
        

        p {
          margin: 0;
          width: fit-content;
          padding: 0px;
        }
        .metrics-container {
          display: none;
        }

        .add-provider {
          width: fit-content;
          border: 1px solid #0477f4;
          border-radius: 40px;
          color: #0477f4;
          background: transparent;
          padding: 10px;
        }
      }
      `}</style>
    </div>
  );
};

export default Footer;
