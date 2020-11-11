import React from 'react';
import { Node as NodeType } from 'data/nodes';

interface NodeProps {
  node: NodeType;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  const selectAll = (event: any) => event.target.select();

  return (
    <div className={`node ${node.status ? 'up' : 'down'}`}>
      <h2>{node.name}</h2>
      <div>
        <span className={`status ${node.status ? 'up' : 'down'}`}>
          {node.status ? 'Working' : 'Down'}
        </span>
      </div>
      <div><a href={node.website}>{node.website}</a></div>
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
        h2 {
          margin: 2px 0;
          font-size: 18px;
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
