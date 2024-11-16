import type { Response, Request } from '@waika_project/server';

export function notFound(_: Request, res: Response) {
  res.status(404).send({ error: "Sorry, can't find that" });
}
