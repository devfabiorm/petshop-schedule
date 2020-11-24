import express from 'express';
import routes from '../app/routes';

export default function () {
  const customExprtess = express();

  customExprtess.use(express.urlencoded({ extended: true }));
  customExprtess.use(express.json());

  customExprtess.use(routes);

  return customExprtess;
}