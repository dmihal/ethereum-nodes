import React from 'react';
import { Node as NodeType } from 'data/nodes';

interface NodeProps {
  node: NodeType;
  index: number;
}

const Node: React.FC<NodeProps> = ({ node, index }) => {
  

  const copyContent = async (text:string) => {
    if(node.price === 'Free') {
    try {
      await navigator.clipboard.writeText(text);
      let copied:HTMLElement = document.getElementById(index.toString()) as HTMLElement
      copied.innerText = "Copied!"
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
}
  
  return (
   

    <div className="individual-node">
        <div className='provider'><p style={{padding:'0', margin:'0'}}>{node.name}</p></div>
      <div className="speed">
        <span >Load time: {node.loadTime < 0 ? '∞' : `${node.loadTime}ms`}</span>
      </div>
      <div className="price"><span>{node.price}</span></div>
      <button onClick={() => copyContent(node.endpoint as string)} className="endpoint"><a id={index.toString()}  href={node.price === 'Free' ? void(0) : node.website}>{node.price === 'Free' ? "Copy RPC URL" : "Get API key"}</a></button>
    
      <style jsx>{`

        .individual-node {

          padding: 20px 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          color: black;
          align-items: flex-start;
          font-weight: 400;
          font-size: 16px;


        }
        .provider {
          width: 25%;

        }

        // .undefined {
        //   width:100%;
        //   color: black;
        //   display: flex;
        //   flex-direction: row;
        //   justify-content: center;
        //   align-items:center;

        // }

      
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
          background:none;
          border:none;
        }
        .endpoint a {
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
