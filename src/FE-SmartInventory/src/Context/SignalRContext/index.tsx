import { createContext } from 'react';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';

const URL = import.meta.env.VITE_HUB_ADDRESS;

interface ISignalRContext {
  connection: SignalListener | null;
  setConnection: (connection: SignalListener) => void;
}

export const SignalRContext = createContext<ISignalRContext>({
  connection: null,
  setConnection: () => {},
});

export class SignalListener {
  static onChanged: boolean = false;

  public HubConnection: signalR.HubConnection | null;
  public commandNotify: (data: any) => void = () => {};
  public isConnected: boolean = false;

  public userId: string | null = null;
  public unitId: string | null = null;
  constructor() {
    this.HubConnection = null;
  }

  // public accessTokenFactory2 = (): string => this.accessTokenFactory;

  public async registerUser(idUser: string, unitId: string) {
    // console.log(idUser, unitId, this.HubConnection);
    // console.log(idUser && unitId && this.HubConnection === null);
    if (this.HubConnection === null) {
      console.log('Initializing SignalR connection...');
      this.userId = idUser;
      this.unitId = unitId;
      // this.accessTokenFactory = accessTokenFactory;
      const url = URL + `?userId=${idUser}&unitId=${unitId}`;

      this.HubConnection = new HubConnectionBuilder()
        .withUrl(url)
        .withAutomaticReconnect([10000, 10000, 10000, 10000])
        .configureLogging(LogLevel.Information)
        .build();
      this.registerEventListener();
      this.HubConnection?.start()
        .then(() => {
          this.isConnected = true;
          // this.HubConnection?.invoke('KioskOnline');
        })
        .catch((error) => {
          console.error('Error connecting to SignalR:', error);
          this.isConnected = false;
        });
    }
  }

  // }

  public registerEventListener() {
    if (this.HubConnection) {
      this.HubConnection.on('Notif', (data) => {
        this.commandNotify(data);
      });
    }
  }

  public async disconnect() {
    if (
      this.HubConnection &&
      this.HubConnection.state === HubConnectionState.Connected &&
      this.isConnected
    ) {
      await this.HubConnection.stop();
      this.HubConnection = null;
    } else {
      console.log('SignalR connection not established or already disconnected.');
    }
  }
}
