/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-30 14:58:23
 * @ Modified by: zhenghui
 * @ Modified time: 2021-08-30 15:51:09
 * @ Description:
 */

import {makeAutoObservable} from 'mobx';

class MusicStore {
  playStatus = 1000;
  constructor() {
    makeAutoObservable(this);
  }

  showPlayer = () => {
    this.playStatus = 0;
  };
  hidePlayer = () => {
    this.playStatus = 1000;
  };
}

export default {
  music: new MusicStore(),
};
