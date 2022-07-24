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
    case ApiMethod.GET:
      const responseFromGet = await fetch(
        `${process.env.API_ROUTE}${Endpoint.api.USER.ME}`,
        {
          method: req.method,
          headers: {
            [ApiHeader.CONTENT_TYPE]: ApiHeader.APPLICATION_JSON,
            [ApiHeader.AUTHORIZATION]: req.headers.authorization as string,
          },
        },
      );

      const userInfos = await responseFromGet.json();
      return res.status(200).json(userInfos);

    case ApiMethod.PUT:
      const responseFromPut = await fetch(
        `${process.env.API_ROUTE}${Endpoint.api.USER.ME}`,
        {
          method: ApiMethod.PUT,
          headers: {
            [ApiHeader.AUTHORIZATION]: `Bearer ${req.headers.authorization}`,
            [ApiHeader.CONTENT_TYPE]: ApiHeader.APPLICATION_JSON,
          },
          body: req.body,
        },
      );

      const { code, message } = await responseFromPut.json();
      return res.status(200).json({ code, message });

    default:
      break;
  }
}
