import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import { getNodes, Node } from 'data/nodes';
import List from 'components/List';

interface HomeProps {
  nodes: Node[];
}

export const Home: NextPage<HomeProps> = ({ nodes }) => {
  return (
    <div className="container">

      <main>
        <h1 className="title">Ethereum Nodes</h1>

        <div>
          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="true">Tweet</a>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>

        <List nodes={nodes} />
      </main>

      <style jsx>{`
        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
    </div>
  );
};


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const nodes = await getNodes();

  return { props: { nodes, revalidate: 60 * 5 } };
};

export default Home
