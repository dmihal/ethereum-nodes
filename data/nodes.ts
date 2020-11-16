import 'isomorphic-fetch';
import base64 from 'base-64';

export interface Node {
  name: string;
  endpoint: string | null;
  authentication?: string;
  price?: string;
  secret?: boolean;
  website: string;
  websiteURL?: string;
  status: boolean;
}

const nodes: Node[] = [
  {
    name: 'Infura',
    endpoint: `https://mainnet.infura.io/v3/${process.env.NEXT_APP_INFURA}`,
    website: 'https://infura.io/',
    price: 'Freemium',
    status: true,
    secret: true,
  },
  {
    name: 'Alchemy',
    endpoint: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_APP_ALCHEMY}`,
    website: 'https://alchemyapi.io/',
    websiteURL: 'https://dashboard.alchemyapi.io/signup?referral=b9ca5e4c-a0cf-4b98-8735-6bca079da09b',
    price: 'Freemium',
    status: true,
    secret: true,
  },
  {
    name: 'MyCrypto',
    endpoint: 'https://api.mycryptoapi.com/eth',
    website: 'https://mycrypto.com/',
    price: 'Free',
    status: true,
  },
  {
    name: '1inch',
    endpoint: 'https://web3.1inch.exchange/',
    website: 'https://1inch.exchange/',
    price: 'Free',
    status: true,
  },
  {
    name: 'RIVET',
    endpoint: `https://${process.env.NEXT_APP_RIVET}.eth.rpc.rivet.cloud/`,
    website: 'https://rivet.cloud/',
    price: 'Freemium',
    status: true,
    secret: true,
  },
  {
    name: 'Pocket Network',
    endpoint: 'https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79',
    website: 'https://pokt.network/',
    price: 'Freemium',
    status: true,
  },
  {
    name: 'Cloudflare',
    endpoint: 'https://cloudflare-eth.com/',
    website: 'https://cloudflare-eth.com/',
    price: 'Free',
    status: true,
  },
  {
    name: 'Blockscout',
    endpoint: 'https://mainnet-nethermind.blockscout.com/',
    website: 'https://blockscout.com',
    price: 'Free',
    status: true,
  },
  {
    name: 'MyEtherWallet',
    endpoint: 'https://nodes.mewapi.io/rpc/eth',
    website: 'https://myetherwallet.com/',
    price: 'Free',
    status: true,
  },
  {
    name: 'LinkPool',
    endpoint: 'https://main-rpc.linkpool.io/',
    website: 'https://linkpool.io/',
    price: 'Free',
    status: true,
  },
  {
    name: 'AVADO',
    endpoint: 'https://mainnet.eth.cloud.ava.do/',
    website: 'https://ava.do',
    price: 'Free',
    status: true,
  },
  {
    name: 'Quiknode',
    endpoint: `https://${process.env.NEXT_APP_QUIKNODE_NAME}.quiknode.pro/${process.env.NEXT_APP_QUIKNODE_KEY}/`,
    website: 'https://www.quiknode.io/',
    price: 'Paid',
    status: true,
    secret: true,
  },
  {
    name: 'AnyBlock',
    endpoint: `https://api.anyblock.tools/ethereum/ethereum/mainnet/rpc/${process.env.NEXT_APP_ANYBLOCK}/`,
    website: 'https://anyblock.tools/',
    price: 'Freemium',
    status: true,
    secret: true,
  },
  {
    name: 'Chainstack',
    endpoint: `https://${process.env.NEXT_APP_CHAINSTACK_NODE}/`,
    website: 'https://chainstack.com/',
    price: 'Freemium\n(CC required)',
    authentication: process.env.NEXT_APP_CHAINSTACK_AUTH,
    status: true,
    secret: true,
  },
  {
    name: 'ArchiveNode',
    endpoint: `https://api.archivenode.io/${process.env.NEXT_APP_ARCHIVENODE}`,
    website: 'https://archivenode.io/',
    price: 'Free',
    status: true,
    secret: true,
  },
];

async function checkNodeStatus(endpoint: string, authentication?: string): Promise<boolean> {
  const headers: any = { 'Content-Type': 'application/json' };
  if (authentication) {
    headers['Authorization'] = `Basic ${base64.encode(authentication)}`
  }

  const result = await fetch(endpoint, {
    method: 'POST',
    headers,
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
    try {
      return {
        ...node,
        status: await checkNodeStatus(node.endpoint!, node.authentication),
        endpoint: node.secret ? null : node.endpoint,
      };
    } catch (e) {
      console.warn(e);
      return {
        ...node,
        status: false,
        endpoint: node.secret ? null : node.endpoint,
      };
    }
  }));
}
