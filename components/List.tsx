import React, { useState, useEffect } from 'react';
import { Node as NodeType } from 'data/nodes';
import Node from './Node';

interface ListProps {
  nodes: NodeType[];
}

const List: React.FC<ListProps> = ({ nodes }) => {
  const [_nodes, setNodes] = useState(nodes);
  useEffect(() => {
    let infiniteNodes = nodes.filter((node) => node.loadTime === -1);
    let sortedNodes = nodes.filter(
      (node) => node.loadTime !== -1
    ).sort((nodeA, nodeB) => nodeA.loadTime - nodeB.loadTime).sort(node => node.status ? 0 : 1);
    setNodes([...sortedNodes, ...infiniteNodes]);
  }, [nodes]);

  return (
    <ul>
      {_nodes.map((node) => (
        <li key={node.name}>
          <Node node={node} />
        </li>
      ))}
      <style jsx>{`
        ul {
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          justify-content: center;
        }
        li {
          display: block;
        }
      `}</style>
    </ul>
  );
};

export default List
