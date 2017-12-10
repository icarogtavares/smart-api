import { configureExpress } from './middlewares'
import debug from 'debug'
import * as mqtt from '../mqtt'

export const startApp = (id) => {
  const smartDebug = debug(`smart-api:server:${id}:`);
  
  var app = configureExpress();
  app.listen(app.get('port'), () => {
    smartDebug(`Listening on port ${app.get('port')}`);
  });

  mqtt.startConnection();
}