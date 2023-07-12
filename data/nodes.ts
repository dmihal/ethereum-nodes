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
  loadTime: number;
}

// Others to add:
// https://ethereumnodelight.app.runonflux.io
// https://eth-mainnet.nodereal.io/v1/
// https://eth-mainnet.public.blastapi.io
// https://api.securerpc.com/v1
// https://eth-mainnet.rpcfast.com
// https://1rpc.io/eth

const nodes: Node[] = [
  {
    name: 'Infura',
    endpoint: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    website: 'https://infura.io/',
    price: 'Freemium',
    status: false,
    secret: true,
    loadTime: -1,
  },
  {
    name: 'Alchemy',
    endpoint: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
    website: 'https://alchemyapi.io/',
    websiteURL: 'https://dashboard.alchemyapi.io/signup?referral=b9ca5e4c-a0cf-4b98-8735-6bca079da09b',
    price: 'Freemium',
    archive: true,
    status: false,
    secret: true,
    loadTime: -1,
  },
  {
    name: 'Ankr',
    endpoint: 'https://rpc.ankr.com/eth',
    website: 'https://ankr.com/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'AVADO',
    endpoint: 'https://mainnet.eth.cloud.ava.do/',
    website: 'https://ava.do',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'Blast',
    endpoint: 'https://eth-mainnet.public.blastapi.io',
    website: 'https://blastapi.io/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'Blockscout',
    endpoint: 'https://mainnet-nethermind.blockscout.com/',
    website: 'https://blockscout.com',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'Cloudflare',
    endpoint: 'https://cloudflare-eth.com/',
    website: 'https://cloudflare-eth.com/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'Flashbots Protect',
    endpoint: 'https://rpc.flashbots.net/',
    website: 'https://flashbots.net',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'LlamaNodes',
    endpoint: 'https://eth.llamarpc.com',
    website: 'https://llamanodes.com/',
    price: 'Freemium',
    archive: true,
    status: false,
    loadTime: -1,
  },
  {
    name: 'Moralis',
    endpoint: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_KEY}/eth/mainnet/archive`,
    website: 'https://moralis.io/',
    price: 'Freemium',
    archive: true,
    status: false,
    secret: true,
    loadTime: -1,
  },
  {
    name: 'MyCrypto',
    endpoint: 'https://api.mycryptoapi.com/eth',
    website: 'https://mycrypto.com/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'OnFinality',
    endpoint: `https://eth.api.onfinality.io/rpc?apikey=${process.env.ONFINALITY_KEY}`,
    website: 'https://onfinality.io/',
    price: 'Freemium',
    status: false,
    loadTime: -1,
    secret: true,
  },
  {
    name: 'Payload',
    endpoint: 'https://rpc.payload.de',
    website: 'https://payload.de/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'RIVET',
    endpoint: `https://${process.env.RIVET_KEY}.eth.rpc.rivet.cloud/`,
    website: 'https://rivet.cloud/',
    price: 'Freemium',
    status: false,
    secret: true,
    loadTime: -1,
  },
  {
    name: 'Pocket Network',
    endpoint: 'https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79',
    website: 'https://pokt.network/',
    price: 'Freemium',
    status: false,
    loadTime: -1,
  },
  {
    name: 'Public Node',
    endpoint: 'https://ethereum.publicnode.com',
    website: 'https://ethereum.publicnode.com/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'MyEtherWallet',
    endpoint: 'https://nodes.mewapi.io/rpc/eth',
    website: 'https://myetherwallet.com/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'LinkPool',
    endpoint: 'https://main-light.eth.linkpool.io/',
    website: 'https://linkpool.io/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'QuickNode',
    endpoint: `https://${process.env.QUIKNODE_NAME}.discover.quiknode.pro/${process.env.QUIKNODE_KEY}/`,
    website: 'https://quicknode.com/',
    price: 'Free trial',
    status: false,
    loadTime: -1,
    secret: true,
  },
  {
    name: 'AnyBlock',
    endpoint: `https://api.anyblock.tools/ethereum/ethereum/mainnet/rpc/${process.env.NEXT_APP_ANYBLOCK}/`,
    website: 'https://anyblock.tools/',
    price: 'Freemium',
    status: false,
    loadTime: -1,
    secret: true,
  },
  {
    name: 'Chainstack',
    endpoint: `https://${process.env.CHAINSTACK_NODE}/`,
    website: 'https://chainstack.com/',
    price: 'Freemium\n(CC required)',
    authentication: process.env.CHAINSTACK_AUTH || null,
    status: false,
    loadTime: -1,
    secret: true,
  },
  {
    name: 'Flux',
    endpoint: 'https://ethereumnodelight.app.runonflux.io',
    website: 'https://runonflux.io/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'Omnia',
    price: 'Free',
    endpoint: `https://endpoints.omniatech.io/v1/eth/mainnet/${process.env.OMNIA_KEY}`,
    website: 'https://omniatech.io/',
    status: false,
    loadTime: -1,
    secret: true,
  },
  {
    name: 'Nodereal',
    price: 'Freemium',
    endpoint: 'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7',
    website: 'https://nodereal.io/meganode',
    status: false,
    loadTime: -1,
  },
  {
    name: 'GetBlock',
    price: 'Freemium',
    endpoint: `https://eth.getblock.io/${process.env.GETBLOCK_KEY}/mainnet/`,
    website: 'https://getblock.io/',
    websiteURL: 'https://account.getblock.io/sign-in?ref=ZGJlZGZhOGMtZmFmMy01OWYyLWI5M2MtMWJmNGE1NWQ4MzNi',
    status: false,
    loadTime: -1,
    secret: true,
  },
];

function finish(start: number, endpoint: string) {
  const time = Date.now() - start;
  if (time > 1000) {
    console.log(`${endpoint} completed in ${time / 1000}s`)
  }
  return time;
}

interface Status {
  status: boolean
  loadTime: number
}

async function checkNodeStatus(endpoint: string, authentication?: string | null): Promise<Status> {
  const start = Date.now();
  const headers: any = { 'Content-Type': 'application/json' };
  if (authentication) {
    headers['Authorization'] = `Basic ${base64.encode(authentication)}`
  }

  try {
    var result
    try{
      result = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id: "1",
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
        }),
      })
    }catch(err) {
      return {
        status: false,
        loadTime: -1,
      };
    };
    
    if (result.status !== 200) {
      console.log(endpoint, 'failed')
      console.log(await result.text());
      return {
        status: false,
        loadTime: -1,
      };
    }
    const json = await result.json();

    let loadTime = finish(start, endpoint);
    return {
      status: !!json.result,
      loadTime
    };
  } catch (e: any) {
    console.warn(e.message || e);

    let loadTime = finish(start, endpoint);
    return {
      status: false,
      loadTime
    };
  }
}

function checkNodeStatusWithTimeout(endpoint: string, timeout: number, authentication?: string | null) {
  return Promise.race([
    checkNodeStatus(endpoint, authentication),
    new Promise<Status>((resolve) => setTimeout(() => {
      console.warn(`${endpoint} timed out`);
      resolve({ status: false, loadTime: -1 });
    }, timeout))
  ])
}

export function getNodes(): Promise<Node[]> {
  return Promise.all(nodes.map(async (node: Node) => {
    try {
      let nodeInfo = await checkNodeStatusWithTimeout(node.endpoint!, 4000, node.authentication)
      return {
        ...node,
        status: nodeInfo.status,
        loadTime: nodeInfo.loadTime,
        endpoint: node.secret ? null : node.endpoint,
      };
    } catch (e) {
      console.warn(e);
      return {
        ...node,
        status: false,
        loadTime: -1,
        endpoint: node.secret ? null : node.endpoint,
      };
    }
  }));
}
