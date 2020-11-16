import React from 'react';
import { Node as NodeType } from 'data/nodes';

interface NodeProps {
  node: NodeType;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  const selectAll = (event: any) => event.target.select();

  return (
    <div className={`node ${node.status ? 'up' : 'down'}`}>
      <div className="top">
        <h2>{node.name}</h2>
        <span className="price">{node.price}</span>
      </div>
      <div>
        <span className={`status ${node.status ? 'up' : 'down'}`}>
          {node.status ? 'Working' : 'Down'}
        </span>
      </div>
      <div><a href={node.websiteURL || node.website}>{node.website}</a></div>
      <div>
        {node.endpoint ? (
          <input value={node.endpoint} className="endpoint" onClick={selectAll} />
        ) : 'Visit website to get API key'}
      </div>

      <style jsx>{`
        .node {
          margin: 4px;
          padding: 8px;
          border: solid 1px #888888;
          width: 250px;
          height: 140px;
        }
        .node.down {
          color: #999999;
        }
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        h2 {
          margin: 2px 0;
          font-size: 18px;
        }
        .price {
          color: #999999;
          font-size: 14px;
          white-space: pre-line;
          text-align: right;
        }
        .status {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          color: white;
        }
        .status.up {
          background: green;
        }
        .status.down {
          background: red;
        }
        .endpoint {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Node
