import React, { useState, useEffect } from "react";
import { Node as NodeType } from "data/nodes";
import Node from "./Node";

interface ListProps {
  nodes: NodeType[];
  selectedFilter: string;
}

const List: React.FC<ListProps> = ({ nodes, selectedFilter }) => {
  const [_nodes, setNodes] = useState(nodes);
  const [nullCheck, setNullCheck ]= useState([]);

  useEffect(() => {
    let infiniteNodes = nodes.filter((node) => node.loadTime === -1);
    let sortedNodes = nodes
      .filter((node) => node.loadTime !== -1)
      .sort((nodeA, nodeB) => nodeA.loadTime - nodeB.loadTime)
      .sort((node) => (node.status ? 0 : 1));
    setNodes([...sortedNodes, ...infiniteNodes]);
    setNullCheck(_nodes.filter((node) => node.price === selectedFilter) as [])

  }, [nodes]);



  return (
    <div className="wrapper">
      <div className="header">
        <p className="provider-tab">Provider</p>
        <p className="load-tab">Load time</p>
        <p className="price-tab">Pricing model</p>
        <p className="action-tab">Action</p>
      </div>

      {nullCheck.length === 0 ? (
        <span>
          <div className="undefined">None Found</div>
        </span>
      ) : (
        _nodes
          .filter((node) => node.price === selectedFilter)
          .map((node, index) => (
            <span key={node.name}>
              <Node node={node} index={index}/>
            </span>
          ))
      )}
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          min-width: 700px;
          max-width: 700px;
           margin:auto;
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
        .undefined {
          padding: 20px 20px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 100%;
          color: black;
          align-items: center;
          font-weight: 400;
          font-size: 16px;
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
          border-bottom: 1px solid #dddddd;
        }
      `}</style>
    </div>
  );
};

export default List;
