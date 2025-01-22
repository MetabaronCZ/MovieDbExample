import { Db } from 'db';

declare global {
  namespace Express {
    interface Locals {
      db: Db;
    }
  }
}
