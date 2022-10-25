import store from '@/store';
import WebRocket from '@hetrodo/webrocket/lib/WebRocket';
import WebRocketMethod from '@hetrodo/webrocket/lib/WebRocketMethod';
import WebSocketAdapter from '@hetrodo/webrocket/lib/WebSocketAdapter';

export default class Api {
  private readonly ws: WebSocket;

  private readonly wr: WebRocket;

  private readonly waitWebSocket: Promise<void>;

  constructor(hostname: string) {
    this.ws = new WebSocket(hostname);
    this.wr = new WebRocket(new WebSocketAdapter(this.ws));

    this.waitWebSocket = new Promise<void>((resolve, reject) => {
      this.ws.onopen = () => { resolve(); };
      this.ws.onerror = () => { reject(); };
    });

    this.wr.on(WebRocketMethod.post, 'v1/people', async (request, respond) => {
      store.commit('SET_PEOPLE', request.data);

      respond({
        msg: 'Ok',
      });
    });
  }

  get people(): Promise<string[]> {
    return new Promise((resolve) => {
      this.waitWebSocket.then(() => {
        this.wr.get<string[]>('v1/people?name=Robert')
          .then(({ data }) => {
            resolve(data);
          })
          .catch(Promise.reject);
      });
    });
  }
}
