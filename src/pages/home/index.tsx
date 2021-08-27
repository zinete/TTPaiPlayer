/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-25 18:57:28
 * @ Modified by: zhenghui
 * @ Modified time: 2021-08-27 18:59:22
 * @ Description:
 */

import React from 'react';
import styled from 'styled-components/native';
import {StatusBar, Animated} from 'react-native';
import Main from '../../components/Main';
import {PlayBar} from '../../components/PlayBar';
import {Cover} from './widgets/Cover';
import SoundPlayer from 'react-native-sound-player';

async function getInfo() {
  // You need the keyword `async`
  try {
    const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
    console.log('getInfo', info); // {duration: 12.416, currentTime: 7.691}
  } catch (e) {
    console.log('There is no song playing', e);
  }
}

const ModelView = (top: any, hidePlay: () => void) => (
  <PlayModelViewAnimated style={{top: top}}>
    <ClosePlay onPress={hidePlay} />
  </PlayModelViewAnimated>
);

const HomePage = () => {
  const [top] = React.useState(new Animated.Value(1000));

  const showPlay = () => {
    Animated.timing(top, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const hidePlay = () => {
    Animated.timing(top, {
      toValue: 1000,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    try {
      SoundPlayer.loadUrl(
        'https://static.zinete.com/%E5%91%A8%E6%9D%B0%E4%BC%A6%3B%E8%94%A1%E4%BE%9D%E6%9E%97%20-%20%E7%BB%99%E6%88%91%E4%B8%80%E9%A6%96%E6%AD%8C%E7%9A%84%E6%97%B6%E9%97%B4%28live%29.mp3',
      );
      SoundPlayer.addEventListener('FinishedLoadingURL', s => {
        console.log(s);
      });
    } catch (error) {}
    StatusBar.setBarStyle('light-content');
  }, []);

  const MusicList = [
    {
      title: '不能说的秘密',
      des: '十一月的肖邦',
      cover: '',
      url: 'https://static.zinete.com/%E5%91%A8%E6%9D%B0%E4%BC%A6%3B%E8%94%A1%E4%BE%9D%E6%9E%97%20-%20%E7%BB%99%E6%88%91%E4%B8%80%E9%A6%96%E6%AD%8C%E7%9A%84%E6%97%B6%E9%97%B4%28live%29.mp3',
    },
  ];
  return (
    <>
      {ModelView(top, hidePlay)}
      <Main>
        <Home>
          <ScrollView>
            {MusicList.map((item, index) => (
              <Cover
                key={index}
                title={item.title}
                des={item.des}
                url={item.url}
              />
            ))}
          </ScrollView>
        </Home>
        <PlayBar
          onPress={showPlay}
          checkMusic={(e: boolean) => {
            if (e === true) {
              SoundPlayer.play();
              getInfo();
            } else {
              SoundPlayer.stop();
            }
          }}
        />
      </Main>
    </>
  );
};

const ScrollView = styled.ScrollView`
  height: 100%;
  padding: 0px 20px;
  /* margin-bottom: 100px; */
`;
const Home = styled.View`
  padding-bottom: 60px;
`;

const PlayModelView = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  background: #ffae00;
  z-index: 1000;
`;

const ClosePlay = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 20px;
  right: 32px;
  top: 50px;
  background: #fff;
`;
const PlayModelViewAnimated = Animated.createAnimatedComponent(PlayModelView);
export default HomePage;
