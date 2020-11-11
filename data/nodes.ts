import 'isomorphic-fetch';

export interface Node {
  name: string;
  endpoint: string | null;
  secret?: boolean;
  website: string;
  status: boolean;
}

const nodes: Node[] = [
  {
    name: 'Infura',
    endpoint: `https://mainnet.infura.io/v3/${process.env.NEXT_APP_INFURA}`,
    website: 'https://infura.io/',
    status: true,
  },
  {
    name: 'Cloudflare',
    endpoint: 'https://cloudflare-eth.com/',
    website: 'https://cloudflare-eth.com/',
    status: true,
  },
];

async function checkNodeStatus(endpoint: string): Promise<boolean> {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: "1",
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
    }),
  });
  const json = await result.json();
  return !!json.result;
}

export function getNodes(): Promise<Node[]> {
  return Promise.all(nodes.map(async (node: Node) => {
    return {
      ...node,
      status: await checkNodeStatus(node.endpoint!),
      endpoint: node.secret ? null : node.endpoint,
    };
  }));
}
