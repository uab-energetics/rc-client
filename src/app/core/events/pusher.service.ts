import { Injectable } from '@angular/core';

import * as Pusher from 'pusher-js';
import {environment} from '../../../environments/environment';

@Injectable()
export class PusherService {

  pusher: any;

  constructor() {
    this.pusher = new Pusher(environment.pusher.key, environment.pusher.config);
  }

}
