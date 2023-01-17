import React, { useState } from "react";
import { NextPage, GetStaticProps } from "next";
import { getNodes, Node } from "data/nodes";
import List from "components/List";
import Nav from "components/Nav";
import Footer from "components/Footer";

interface HomeProps {
  nodes: Node[];
}

export const Home: NextPage<HomeProps> = ({ nodes }) => {
  const [priceModel, setPriceModel] = useState("free");
  return (
    <>
      <Nav />
      <div className="container">
        <main>
          <p className="url">https://ethereumnodes.com</p>
          <div>
            <h1 className="title">Ethereum Nodes</h1>
            <p className="sub-title">
              Don’t get stuck on centralized RPC. There are many alternatives
              that keep you safe!
            </p>
          </div>

          <div>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              data-show-count="true"
              className="share"
            >
              <img src="share.png" />
              <p style={{ color: "white", margin: "0" }}>Share</p>
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
            ></script>
          </div>

          <div className="model-details">
            <p style={{ color: "black", margin: "0" }}>
              {" "}
              Filter by pricing model
            </p>
            <span className="button-group">
              <button
                onClick={() => setPriceModel("free")}
                className={priceModel === "free" ? "toggled" : "toggle-button"}
              >
                Free
              </button>
              <button
                onClick={() => setPriceModel("freemium")}
                className={priceModel === "freemium" ? "toggled" : "toggle-button"}
              >
                Freemium
              </button>
              <button
                onClick={() => setPriceModel("free trial")}
                className={priceModel === "free trial" ? "toggled" : "toggle-button"}
              >
                Free trial
              </button>
              <button
                onClick={() => setPriceModel("paid")}
                className={priceModel === "paid" ? "toggled" : "toggle-button"}
              >
                Paid
              </button>
            </span>
          </div>

          <List nodes={nodes} />
        </main>
        

        <style jsx>{`
          main {
            padding: 2rem 0 3rem;
            flex: 1;
            position:relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .toggle-button {
            border-style:none;
            background:none;
            padding: 4px 8px;
          }

          .toggled {
            background: #82c5a3;
            border-radius: 50px;
            border-style:none;
            padding: 4px 8px;
            color:white;

          }

          .url {
            background: #ffffff;
            border: 1px solid #e7e7e7;
            border-radius: 32px;
            padding: 4px 16px;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }
          .sub-title {
            font-family: "Inter";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 150%;
            text-align: center;
            color: #091636;
            max-width: 500px;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0 0 16px;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
            max-width: 800px;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
            margin: 4px 0 20px;
          }

          .share {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 8px 16px;
            gap: 10px;
            background: #51ba86;
            border-radius: 40px;
            border-style: none;
            text-decoration: none;
          }

          .model-details {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 16px;
          }

          .button-group {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 4px 16px 4px 4px;
            margin:32px 0px;
            gap: 16px;
            background: #ffffff;
            border: 1px solid #919191;
            border-radius: 32px;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
      </div>
      <Footer/>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const nodes = await getNodes();

  return { props: { nodes, revalidate: 60 * 5 } };
};

export default Home;
