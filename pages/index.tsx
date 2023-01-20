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
  const [priceModel, setPriceModel] = useState("Free");
  return (
    <>
      <Nav />
      <div >
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
            <p className="filterBy">
              {" "}
              Filter by pricing model
            </p>
            <span className="button-group">
              <button
                onClick={() => setPriceModel("Free")}
                className={priceModel === "Free" ? "toggled" : "toggle-button"}
              >
                Free
              </button>
              <button
                onClick={() => setPriceModel("Freemium")}
                className={
                  priceModel === "Freemium" ? "toggled" : "toggle-button"
                }
              >
                Freemium
              </button>
              <button
                onClick={() => setPriceModel("Free trial")}
                className={
                  priceModel === "Free trial" ? "toggled" : "toggle-button"
                }
              >
                Free trial
              </button>
              <button
                onClick={() => setPriceModel("Paid")}
                className={priceModel === "Paid" ? "toggled" : "toggle-button"}
              >
                Paid
              </button>
            </span>
          </div>

          <List nodes={nodes} selectedFilter={priceModel} key={priceModel} />
        </main>

        <style jsx>{`
        @media (max-width: 420px) {
          main {
            width:300px;
            margin:auto;
            max-width: 300px;
            overflow-x:scroll;
            padding: 2rem 0 3rem;
            flex: 1;
            margin:auto;
            display: flex;
            flex-direction: column;
            // align-items: center;
          }
          .filterBy {
            display:none;
          }
        

          .button-group {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 4px 16px 4px 4px;
            margin: 32px 0px;
            gap: 1px;
            background: #ffffff;
            border: 1px solid #919191;
            border-radius: 32px;
          }

         
        }



        @media (min-width: 421px) {
          main {
            padding: 2rem 0 3rem;
            flex: 1;
            position: relative;
            display: flex;
            flex-direction: column;
            margin:auto;
            width:90vw;
           
            overflow-x:scroll;
          }

          .button-group {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 4px 16px 4px 4px;
            margin: 32px 0px;
            gap: 16px;
            background: #ffffff;
            border: 1px solid #919191;
            border-radius: 32px;
          }
        
        

          .filterBy {
            color: black;
            margin: 0;
          }
        }

    

          .toggle-button {
            border-style: none;
            background: none;
            padding: 4px 8px;
          }

          .toggled {
            background: #82c5a3;
            border-radius: 50px;
            border-style: none;
            padding: 4px 8px;
            color: white;
          }

          .url {
            background: #ffffff;
            border: 1px solid #e7e7e7;
            border-radius: 32px;
            padding: 4px 16px;
            width:fit-content;
            margin:0 auto 10px auto;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }
          .sub-title {
            font-weight: 400;
            font-size: 16px;
            line-height: 150%;
            text-align: center;
            color: #091636;
            max-width: 500px;
            margin:0 auto 10px auto;
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
            margin:auto;
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
            margin:auto;
            width: fit-content;
          }

          .model-details {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 16px;
          }

      

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const nodes = await getNodes();

  return { props: { nodes, revalidate: 60 * 5 } };
};

export default Home;
