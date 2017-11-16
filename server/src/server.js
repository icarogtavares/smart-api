import throng from 'throng'
import { startApp } from './bin/boot'

const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: startApp
});