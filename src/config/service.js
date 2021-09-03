/**
 * @ Author: zhenghui
 * @ Create Time: 2021-09-03 16:01:39
 * @ Modified by: zhenghui
 * @ Modified time: 2021-09-03 16:35:33
 * @ Description:
 */

import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {});
  TrackPlayer.play();
  TrackPlayer.addEventListener('remote-pause', () => {});
  TrackPlayer.pause();
};
