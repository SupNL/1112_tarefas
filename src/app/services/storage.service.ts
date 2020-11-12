import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async armazenar(key: string, value: any) : Promise<void> {
    Storage.set(
      {
        key,
        value: JSON.stringify(value)
      }
    )
  }

  carregar(key: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.get({ key }).then(res => {
        const object = JSON.parse(res.value);
        resolve(object);
      })
    })
  }
}
