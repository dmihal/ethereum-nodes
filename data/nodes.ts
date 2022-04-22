import 'isomorphic-fetch';
import base64 from 'base-64';

export interface Node {
  name: string;
  endpoint: string | null;
  authentication?: string | null;
  archive?: boolean;
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
    archive: true,
    status: true,
    secret: true,
  },
  {
    name: 'Moralis',
    endpoint: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_KEY}/eth/mainnet/archive`,
    website: 'https://moralis.io/',
    price: 'Freemium',
    archive: true,
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
    name: 'Flashbots Protect',
    endpoint: 'https://rpc.flashbots.net/',
    website: 'https://flashbots.net',
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
    authentication: process.env.NEXT_APP_CHAINSTACK_AUTH || null,
    status: true,
    secret: true,
  },
  {
    name: 'ArchiveNode',
    endpoint: `https://api.archivenode.io/${process.env.NEXT_APP_ARCHIVENODE}`,
    website: 'https://archivenode.io/',
    price: 'Free',
    archive: true,
    status: true,
    secret: true,
  },
  {
    name: 'Flux',
    endpoint: 'https://ethereumnodelight.app.runonflux.io',
    website: 'https://runonflux.io/',
    price: 'Free',
    status: true,
  },
  {
    name: 'Omnia',
    price: 'Free',
    endpoint: `https://endpoints.omniatech.io/v1/eth/mainnet/${process.env.OMNIA_KEY}`,
    website: 'https://omniatech.io/',
    status: true,
    secret: true,
  },
];

function finish(start: number, endpoint: string) {
  const time = Date.now() - start;
  if (time > 1000) {
    console.log(`${endpoint} completed in ${time / 1000}s`)
  }
}

async function checkNodeStatus(endpoint: string, authentication?: string | null): Promise<boolean> {
  const start = Date.now();
  const headers: any = { 'Content-Type': 'application/json' };
  if (authentication) {
    headers['Authorization'] = `Basic ${base64.encode(authentication)}`
  }

  try {
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
    if (result.status !== 200) {
      console.log(endpoint, 'failed')
      console.log(await result.text());
      return false;
    }
    const json = await result.json();

    finish(start, endpoint);
    return !!json.result;
  } catch (e: any) {
    console.warn(e.message || e);

    finish(start, endpoint);
    return false;
  }
}

function checkNodeStatusWithTimeout(endpoint: string, timeout: number, authentication?: string | null): Promise<boolean> {
  return Promise.race([
    checkNodeStatus(endpoint, authentication),
    new Promise<boolean>((resolve) => setTimeout(() => {
      console.warn(`${endpoint} timed out`);
      resolve(false);
    }, timeout))
  ])
}

export function getNodes(): Promise<Node[]> {
  return Promise.all(nodes.map(async (node: Node) => {
    try {
      return {
        ...node,
        status: await checkNodeStatusWithTimeout(node.endpoint!, 4000, node.authentication),
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
