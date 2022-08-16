import { NextApiRequest, NextApiResponse } from 'next';
import { getNodes } from 'data/nodes';
import { wrapHandler } from 'utils/api';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await getNodes();

  res.setHeader(
    'Cache-Control',
    `max-age=0, s-maxage=${60 * 15}, stale-while-revalidate=${60 * 5}`
  );
  res.json({
    success: true,
    data,
  });
};

export default wrapHandler(handler);
