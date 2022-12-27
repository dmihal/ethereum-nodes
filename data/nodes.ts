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

const nodes: Node[] = [
  {
    name: 'Infura',
    endpoint: `https://mainnet.infura.io/v3/${process.env.NEXT_APP_INFURA}`,
    website: 'https://infura.io/',
    price: 'Freemium',
    status: false,
    secret: true,
    loadTime: -1,
  },
  {
    name: 'Alchemy',
    endpoint: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_APP_ALCHEMY}`,
    website: 'https://alchemyapi.io/',
    websiteURL: 'https://dashboard.alchemyapi.io/signup?referral=b9ca5e4c-a0cf-4b98-8735-6bca079da09b',
    price: 'Freemium',
    archive: true,
    status: false,
    secret: true,
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
    name: 'Flashbots Protect',
    endpoint: 'https://rpc.flashbots.net/',
    website: 'https://flashbots.net',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'RIVET',
    endpoint: `https://${process.env.NEXT_APP_RIVET}.eth.rpc.rivet.cloud/`,
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
    name: 'Cloudflare',
    endpoint: 'https://cloudflare-eth.com/',
    website: 'https://cloudflare-eth.com/',
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
    name: 'MyEtherWallet',
    endpoint: 'https://nodes.mewapi.io/rpc/eth',
    website: 'https://myetherwallet.com/',
    price: 'Free',
    status: false,
    loadTime: -1,
  },
  {
    name: 'LinkPool',
    endpoint: 'https://main-rpc.linkpool.io/',
    website: 'https://linkpool.io/',
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
    name: 'QuickNode',
    endpoint: `https://${process.env.NEXT_APP_QUIKNODE_NAME}.quiknode.pro/${process.env.NEXT_APP_QUIKNODE_KEY}/`,
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
    endpoint: `https://${process.env.NEXT_APP_CHAINSTACK_NODE}/`,
    website: 'https://chainstack.com/',
    price: 'Freemium\n(CC required)',
    authentication: process.env.NEXT_APP_CHAINSTACK_AUTH || null,
    status: false,
    loadTime: -1,
    secret: true,
  },
  {
    name: 'ArchiveNode',
    endpoint: `https://api.archivenode.io/${process.env.NEXT_APP_ARCHIVENODE}`,
    website: 'https://archivenode.io/',
    price: 'Free',
    archive: true,
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
    name: 'Ankr',
    price: 'free',
    endpoint: 'https://rpc.ankr.com/eth',
    website: 'https://ankr.com/',
    status: false,
    loadTime: -1,
  },
  {
    name: 'Nodereal',
    price: 'Freemium',
    endpoint: 'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7',
    website: 'https://nodereal.io/meganode',
    status: false,
    loadTime: -1,
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

async function getFetchTime(endpoint: string, authentication?: string | null): Promise<Status>{
  const headers: any = { 'Content-Type': 'application/json' };
  if (authentication) {
    headers['Authorization'] = `Basic ${base64.encode(authentication)}`
  }
  const start = Date.now();
  try{
    var result  = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id: "1",
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
        }),
      })
    if (result.status !== 200) {
      console.log(endpoint, 'failed')
      console.log(await result.text());
      return {
          status: false,
          loadTime: -1,
      };
    } else {
      let loadTime = finish(start, endpoint);
      console.log("success");
      console.log(endpoint);
      console.log(await result.text());
      return {
        status: true,
        loadTime:loadTime
      }
    }
  } catch (e: any) {
    console.warn(e.message || e);
    return {
      status: false,
      loadTime:-1,
    };
  }
}

const timer = (ms:number) => new Promise(res => setTimeout(res, ms))

async function checkNodeStatus(endpoint: string, authentication?: string | null): Promise<Status> {
  var totalLoadTime = 0
  var rounds = 6
  var timeInterval = 100 //ms
  
  for (var i = 0; i < rounds; i++) {
      await timer(timeInterval)
      var result = await getFetchTime(endpoint, authentication)
      if (result.status){
        if(i>0)
          totalLoadTime += result.loadTime
      }
      else{
        return({
          status: false,
          loadTime: -1
        })
      }
  }

  return({
    status: true,
    loadTime: totalLoadTime/(rounds-1)
  })
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
      let nodeInfo = await checkNodeStatusWithTimeout(node.endpoint!, 20000, node.authentication)
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
