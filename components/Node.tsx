import React from 'react';
import { Node as NodeType } from 'data/nodes';

interface NodeProps {
  node: NodeType;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  return (
    <div className="individual-node">
        <div className='provider'><p style={{padding:'0', margin:'0'}}>{node.name}</p></div>
      <div className="speed">
        <span >Load time: {node.loadTime < 0 ? '∞' : `${node.loadTime}ms`}</span>
      </div>
      <div className="price"><span>{node.price}</span></div>
      <div className="endpoint"><a href={node.websiteURL || node.website}>{node.price === 'Free' ? "Copy RPC URL" : "Get API key"}</a></div>
   

      <style jsx>{`

        .individual-node {

          padding: 20px 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          color: black;
          align-items: flex-start;
          font-family: "Inter";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;


        }
        .provider {
          width: 25%;

        }

        .speed {
          width: 25%;
        }

        .price {
          width: 25%;
        }

        .endpoint {
          display: flex;
          text-align: right;
          width: 25%;
          justify-content: end;
        }
        .endpoint a {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          text-decoration:none;
          color: #51BA86;
        }

        .endpoint a:hover {
          text-decoration:underline;
        }

      `}</style>
    </div>
  );
};

export default Node
