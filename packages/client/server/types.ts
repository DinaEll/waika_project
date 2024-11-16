import type { Request, Response } from '@waika_project/server';

export type EntryServerRender = (
  req: Request,
  res: Response,
) => Promise<{ html: string; initialState: unknown; styles: string }>;
