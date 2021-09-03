/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-30 14:58:23
 * @ Modified by: zhenghui
 * @ Modified time: 2021-09-03 17:47:49
 * @ Description:
 */

import {makeAutoObservable, runInAction} from 'mobx';

class MusicStore {
  playStatus = 1000;
  nowPlaysongInfo = {};
  constructor() {
    makeAutoObservable(this);
  }

  showPlayer = () => {
    this.playStatus = 0;
  };
  hidePlayer = () => {
    this.playStatus = 1000;
  };

  getnowPlaysongInfo = ({title, artist, artwork}: any) => {
    runInAction(() => {
      this.nowPlaysongInfo = {
        title,
        artist,
        artwork,
      };
    });
  };
}

export default {
  music: new MusicStore(),
};
