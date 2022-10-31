import React from 'react';
import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import { getNodes, Node } from 'data/nodes';
import List from 'components/List';

interface HomeProps {
  nodes: Node[];
}

export const Home: NextPage<HomeProps> = ({ nodes }) => {
  return (
    <div className="container">
      <Head>
        <title>Ethereum Nodes</title>
        <link rel="icon" href="/favicon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet" />
      
        <meta property="og:title" content="Ethereum Nodes" />
        <meta property="og:image" content="https://ethereumnodes.com/api/screenshot" />
        <meta property="og:description" content="List of free Ethereum JSON-RPC endpoints" />

        <meta name="twitter:title" content="Ethereum Nodes" />
        <meta name="twitter:description" content="List of free Ethereum JSON-RPC endpoints" />
        <meta name="twitter:image" content={`https://ethereumnodes.com/api/screenshot?${(new Date()).getDate()}`} />
        <meta name="twitter:card" content="summary_large_image" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-186QH0S5W3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());gtag('config', 'G-186QH0S5W3');`
          }}
        />
      </Head>

      <main>
        <h1 className="title">Ethereum Nodes</h1>


        <div>
          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="true">Tweet</a>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>

        <List nodes={nodes} />
      </main>

      <footer>
        <div>Created by <a href="https://twitter.com/dmihal" target="twitter">David Mihal</a></div>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: auto;
          border-top: 1px solid lightGray;
          text-align: center;
          padding: 2rem 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
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

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Noto Sans TC', sans-serif;
          background: #eeeeee;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const nodes = await getNodes();

  return { props: { nodes, revalidate: 60 } };
};

export default Home
