import type { NextApiRequest, NextApiResponse } from 'next';

// helpers
import { Endpoint } from 'helpers/endpoints';

// enums
import { ApiHeader, ApiMethod } from 'enums/protocol.enum';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let { auth } = req.query;
  auth = `/${auth}`;

  switch (req.method) {
    case ApiMethod.POST:
      try {
        const response = await fetch(
          `${process.env.API_ROUTE}${
            (auth === Endpoint.routes.LOGIN && Endpoint.api.ACCOUNT_LOGIN) ||
            (auth === Endpoint.routes.REGISTER && Endpoint.api.ACCOUNT_REGISTER)
          }`,
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
        return res.status(500).json(error.message);
      }

    default:
      break;
  }
}
