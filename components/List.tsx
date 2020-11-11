import React from 'react';
import { Node } from 'data/nodes';

interface ListProps {
  nodes: Node[];
}

const List: React.FC<ListProps> = ({ nodes }) => {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.name}>
          <pre>{JSON.stringify(node)}</pre>
        </li>
      ))}
    </ul>
  );
};

export default List
