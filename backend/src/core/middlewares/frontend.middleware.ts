import { rootPath } from './../constants/root.path';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

const resolvePath = (file: string) => join(rootPath, `public/dist/${file}`);

export function FrontendMiddleware (req: Request, res: Response, next: NextFunction) {
  const  { url } = req;
  if (url.indexOf('api') === 1) {
    // it starts with /api --> continue with execution
    next();
  } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
    // it has a file extension --> resolve the file
    res.sendFile(resolvePath(url));
  } else {
    // in all other cases, redirect to the index.html!
    res.sendFile(resolvePath('index.html'));
  }
}