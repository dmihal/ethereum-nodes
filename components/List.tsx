import React from 'react';
import { Node as NodeType } from 'data/nodes';
import Node from './Node';

interface ListProps {
  nodes: NodeType[];
}

const List: React.FC<ListProps> = ({ nodes }) => {
  const _nodes = nodes.sort((node) => node.status ? 0 : 1);

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
