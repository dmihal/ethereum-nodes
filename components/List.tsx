import React, { useState, useEffect } from "react";
import { Node as NodeType } from "data/nodes";
import Node from "./Node";

interface ListProps {
  nodes: NodeType[];
}

const List: React.FC<ListProps> = ({ nodes }) => {
  const [_nodes, setNodes] = useState(nodes);
  useEffect(() => {
    let infiniteNodes = nodes.filter((node) => node.loadTime === -1);
    let sortedNodes = nodes
      .filter((node) => node.loadTime !== -1)
      .sort((nodeA, nodeB) => nodeA.loadTime - nodeB.loadTime)
      .sort((node) => (node.status ? 0 : 1));
    setNodes([...sortedNodes, ...infiniteNodes]);
  }, [nodes]);

  return (
    <div className="wrapper">
      <div className="header">
        <p className="provider-tab">Provider</p>
        <p className="load-tab">Load time</p>
        <p className="price-tab">Pricing model</p>
        <p className="action-tab">Action</p>
      </div>

      {_nodes.map((node) => (
        <span key={node.name}>
          <Node node={node} />
        </span>
      ))}
      <style jsx>{`
        .wrapper {
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 700px;
          border: 1px solid #c9e6d7;
          background: #ffffff;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
            drop-shadow(0px 0px 32px rgba(3, 17, 10, 0.13));
          border-radius: 10px;
        }
        .header {
          padding: 10px 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          background: #0a311e;
          border-radius: 10px 10px 0 0;
          color: #ffffff;
          align-items: flex-start;
          font-family: "Inter";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
        }
        .provider-tab {
          width: 25%;
        }

        .load-tab {
          width: 25%;
        }

        .price-tab {
          width: 25%;
        }

        .action-tab {
          display: flex;
          text-align: right;
          width: 25%;
          justify-content: end;
        }

        span {
          display: block;
          width: 100%;
          border-bottom:1px solid #DDDDDD;
        }
      `}</style>
    </div>
  );
};

export default List;
