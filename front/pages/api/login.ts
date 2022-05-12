import type { NextApiRequest, NextApiResponse } from 'next';

// helpers
import { Endpoint } from 'helpers/endpoints';

// enums
import { ApiHeader, ApiMethod } from 'enums/protocol.enum';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case ApiMethod.POST:
      try {
        const response = await fetch(
          `${process.env.API_ROUTE}${Endpoint.api.ACCOUNT_LOGIN}`,
          {
            method: ApiMethod.POST,
            headers: {
              [ApiHeader.CONTENT_TYPE]: ApiHeader.APPLICATION_JSON,
            },
            body: JSON.stringify(req.body),
          },
        );

        const data = await response.json();
        return res.status(200).json(data);
      } catch (error: any) {
        return res.status(500).json({ content: error.message });
      }

    default:
      break;
  }
}
