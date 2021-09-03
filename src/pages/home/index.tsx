/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-25 18:57:28
 * @ Modified by: zhenghui
 * @ Modified time: 2021-09-02 19:01:25
 * @ Description:
 */

import React from 'react';
import styled from 'styled-components/native';
import {StatusBar, Animated, Easing, Dimensions} from 'react-native';
import Main from '../../components/Main';
import {PlayBar} from '../../components/PlayBar';
import {Cover} from './widgets/Cover';
import musics from '../../data/music';
import {PageStackParamList, ProfileScreenNavigationProp} from '../../routers';
import {RouteProp} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import Touchable from '../../components/Touchable';
import songData from '../../data/playlist.json';
import lyrir from 'lyric-parser';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
const screenWidth = Dimensions.get('window').width;

const setup = async () => {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  await TrackPlayer.add(songData);

  TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const togglePlayback = async (playbackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const ModelView = (top: any, hidePlay: () => void) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const songSlider = React.useRef<any>(null);
  const [songIndex, setSongIndex] = React.useState(0);

  const progress = useProgress();
  const playbackState = usePlaybackState();

  const [trackArtwork, setTrackArtwork] = React.useState<string | number>();
  const [trackTitle, setTrackTitle] = React.useState<string>();
  const [trackArtist, setTrackArtist] = React.useState<string>();
  var lrc = [
    '[ti:高尚]',
    '[ar:薛之谦]',
    '[al:高尚]',
    '[by:]',
    '[offset:0]',
    '[00:01.35]高尚 - 薛之谦',
    '[00:03.11]词：薛之谦',
    '[00:04.34]曲：周以力',
    '[00:07.55]',
    '[00:09.18]在阴郁的地方 积攒能量',
    '[00:15.77]',
    '[00:18.71]人交出了什么 能变个样',
    '[00:25.37]',
    '[00:28.67]奇形怪状 的人在生长',
    '[00:35.37]',
    '[00:38.63]我躲在人群中 头在晃',
    '[00:44.78]',
    '[00:48.73]刺破我的心脏 样本不算肮脏',
    '[00:54.45]别恐慌',
    '[00:57.09]',
    '[00:58.63]你看我虚荣模样 你该怎么补偿',
    '[01:04.53]',
    '[01:07.40]我多高尚 向自尊开了枪',
    '[01:16.00]',
    '[01:17.26]你同情的眼光 我特别的欣赏',
    '[01:22.49]',
    '[01:23.15]哀而不伤',
    '[01:26.42]',
    '[01:27.17]我多慌张 怕人闯入我围墙',
    '[01:35.62]',
    '[01:36.88]窥探五官不详 见我原本模样',
    '[01:42.01]',
    '[01:42.53]还能 模仿 任何形状',
    '[01:49.15]',
    '[02:00.55]越恶劣的情况 越要想象',
    '[02:07.31]',
    '[02:10.24]狼藏起反犬旁 像从了良',
    '[02:17.47]',
    '[02:20.72]张牙舞爪 的人在散谎',
    '[02:27.20]',
    '[02:29.92]愿形容我的词 别太荒唐',
    '[02:36.26]',
    '[02:40.88]贪念表现恰当 就像索要嫁妆',
    '[02:45.90]在情理上',
    '[02:48.80]',
    '[02:49.79]请当我孤芳自赏 还规矩条条框框',
    '[02:57.32]',
    '[02:59.28]我多高尚 向自尊开了枪',
    '[03:07.35]',
    '[03:08.86]你异样的眼光 我特别的欣赏',
    '[03:14.08]',
    '[03:14.71]让人难忘',
    '[03:18.63]我多风光 你别闯入我围墙',
    '[03:27.12]',
    '[03:28.33]你要什么真相 不就图个皮囊',
    '[03:33.42]',
    '[03:34.07]不如 让我 留在橱窗',
    '[03:40.09]',
    '[03:52.49]我多难忘 像秀色可餐的模样',
    '[04:00.91]',
    '[04:01.97]感谢你又打赏 你用词越恰当',
    '[04:07.87]我越膨胀',
    '[04:11.44]',
    '[04:11.99]我的疯狂 连我自己都看不上',
    '[04:20.44]',
    '[04:21.35]阴里怪气的愿望 那屈辱的轻伤',
    '[04:27.15]谁能给我 发个奖章',
    '[04:34.85]',
    '[04:43.45]我多向往 有个美丽的地方',
    '[04:52.21]',
    '[04:53.41]我最初的模样 没痛也不会痒',
    '[04:59.88]',
    '[05:00.96]能把赏赐 都烧光',
    '[05:10.86]制作人：周以力',
    '[05:11.93]编曲：周以力',
    '[05:12.73]大提琴：郎莹',
    '[05:13.53]鼓：尹森',
    '[05:14.43]贝斯：陈然然',
    '[05:14.63]吉他：张凇',
    '[05:14.80]Vocal录音室：江苏广电总台录音室',
    '[05:15.26]乐器录音室：北京录顶技录音室',
    '[05:15.72]乐器录音师：王晓海/鲍锐（鼓）',
    '[05:16.22]混音工程师：鲍锐@录顶技Studio',
    '[05:16.65]母带工程师：Friedemann Tishmeyer@Hambug Studio',
  ].join('\n');

  useTrackPlayerEvents(
    [
      Event.PlaybackQueueEnded,
      Event.PlaybackTrackChanged,
      Event.RemotePlay,
      Event.RemotePause,
    ],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack !== undefined
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {title, artist, artwork} = track || {};
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
      } else if (event.type === Event.RemotePause) {
        TrackPlayer.pause();
      } else if (event.type === Event.RemotePlay) {
        TrackPlayer.play();
      } else if (event.type === Event.PlaybackQueueEnded) {
        console.log('Event.PlaybackQueueEnded fired.');
      }
    },
  );
  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * screenWidth,
    });
    TrackPlayer.skipToNext();
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * screenWidth,
    });
    TrackPlayer.skipToPrevious();
  };
  React.useEffect(() => {
    scrollX.addListener(({value}) => {
      const nowSongIndex = Math.round(value / screenWidth);

      setSongIndex(nowSongIndex);
    });
    setup();

    // eslint-disable-next-line no-new

    return () => {
      scrollX.removeAllListeners();
    };
  }, [lrc, scrollX]);

  const rendersongCover = () => {
    return (
      <Animated.View
        style={{
          width: screenWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PlayCover>
          <PlayCoverImage
            resizeMode="stretch"
            source={{uri: `${trackArtwork}`}}
          />
        </PlayCover>
      </Animated.View>
    );
  };
  // 播放按钮
  let PlayIcon =
    playbackState === State.Playing
      ? require('../../assets/player/icon-start.png')
      : require('../../assets/player/icon-stop.png');
  return (
    <PlayModelViewAnimated style={{top: top}}>
      <PlayMain>
        <PlayHeader>
          <ClosePlay onPress={hidePlay} />
          <MusicTile> {trackTitle} </MusicTile>
          <ClosePlay onPress={hidePlay} />
        </PlayHeader>
        {/* cover */}
        <Animated.FlatList
          ref={songSlider}
          data={songData}
          renderItem={rendersongCover}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
        <LyriScrView>
          <LyriScrBox>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((currentValue, index) => {
              return <LyriText key={index}>歌词 {currentValue}</LyriText>;
            })}
          </LyriScrBox>
        </LyriScrView>
        <SilderBarView>
          <SliderTime>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </SliderTime>
          <SilderBar
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
            minimumTrackTintColor="#fff"
          />
          <SliderTime>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </SliderTime>
        </SilderBarView>

        <PlayBarSetting>
          {/* 喜欢 */}
          <Touchable>
            <PlayBarSettingIcon
              source={require('../../assets/player/hart.png')}
            />
          </Touchable>
          {/* 上一首 */}
          <Touchable onPress={skipToPrevious}>
            <PlayBarSettingIcon
              source={require('../../assets/player/icon-_2.png')}
            />
          </Touchable>
          {/* 播放、暂停 */}
          <Touchable onPress={() => togglePlayback(playbackState)}>
            <PlayBarSettingIcon source={PlayIcon} />
          </Touchable>
          {/* 下一首 */}
          <Touchable onPress={skipToNext}>
            <PlayBarSettingIcon
              source={require('../../assets/player/icon-_1.png')}
            />
          </Touchable>
          {/* 随机 */}
          <Touchable>
            <PlayBarSettingIcon
              source={require('../../assets/player/icon-_4.png')}
            />
          </Touchable>
        </PlayBarSetting>
      </PlayMain>
    </PlayModelViewAnimated>
  );
};

interface IProps {
  navigation: ProfileScreenNavigationProp;
  route: RouteProp<PageStackParamList, 'MusicDetail'>;
  MusicStore: any;
}

const HomePage = (props: IProps) => {
  // const {playStatus, hidePlayer, showPlayer} = props.MusicStore.music;
  const [top] = React.useState(new Animated.Value(0));

  const showPlay = () => {
    Animated.timing(top, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.linear),
      useNativeDriver: false,
    }).start();
  };
  const hidePlay = () => {
    Animated.timing(top, {
      toValue: 1000,
      duration: 250,
      easing: Easing.in(Easing.linear),
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    try {
      // SoundPlayer.loadUrl(
      //   'https://static.zinete.com/%E5%91%A8%E6%9D%B0%E4%BC%A6%3B%E8%94%A1%E4%BE%9D%E6%9E%97%20-%20%E7%BB%99%E6%88%91%E4%B8%80%E9%A6%96%E6%AD%8C%E7%9A%84%E6%97%B6%E9%97%B4%28live%29.mp3',
      // );
      // SoundPlayer.addEventListener('FinishedLoadingURL', s => {
      //   console.log(s);
      // });
      console.log(props.MusicStore.music, 'props');
    } catch (error) {}
    StatusBar.setBarStyle('light-content');
  }, [props]);

  return (
    <>
      {ModelView(top, hidePlay)}
      <Main>
        <Home>
          <ScrollView>
            {musics.map((item, index) => (
              <Cover
                goDetail={() => props.navigation.push('MusicDetail')}
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
            } else {
            }
          }}
        />
      </Main>
    </>
  );
};

const SilderBarView = styled.View`
  margin: 0px 32px;
  flex-direction: row;
  align-items: center;
`;

const SilderBar = styled.Slider`
  flex: 1;
  margin: 0px 10px;
`;

const SliderTime = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #80848d;
`;

const PlayBarSetting = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 32px 32px;
`;

const PlayBarSettingIcon = styled.Image`
  width: 32px;
  height: 32px;
`;
const LyriScrBox = styled.View`
  align-items: center;
  margin-top: 32px;
`;
const LyriScrView = styled.ScrollView`
  margin: 20px 0px;
`;
const LyriText = styled.Text`
  color: #fff;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;
const PlayCover = styled.View`
  width: 100%;
  height: 300px;
  margin-top: 38px;
  box-shadow: 2px 2px 15px rgba(5, 54, 56, 0.534);
  padding: 0px 50px;
`;
const PlayCoverImage = styled.Image`
  height: 100%;
  border-radius: 5px;
`;
const MusicTile = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: normal;
`;
const PlayHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px;
  margin-top: 10px;
`;
const PlayMain = styled.SafeAreaView`
  flex: 1;
  z-index: 999;
`;
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
  background: #16191c;
  z-index: 1000;
`;

const ClosePlay = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  right: 0;
  border-radius: 10px;
  justify-content: flex-end;
  background: #fff;
`;
const PlayModelViewAnimated = Animated.createAnimatedComponent(PlayModelView);

export default inject('MusicStore')(observer(HomePage));
