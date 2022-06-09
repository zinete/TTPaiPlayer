/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-25 18:57:28
 * @ Modified by: zhenghui
 * @ Modified time: 2021-10-13 17:04:23
 * @ Description:
 */

import React from 'react';
import styled from 'styled-components/native';
import {StatusBar, Animated, Easing, Dimensions} from 'react-native';
import Main from '../../components/Main';
import {PlayBar} from '../../components/PlayBar';
import {Cover} from './widgets/Cover';
import musics from '../../data/music.json';
import {PageStackParamList, ProfileScreenNavigationProp} from '../../routers';
import {RouteProp} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import Touchable from '../../components/Touchable';
import songData from '../../data/playlist.json';

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

const ModelView = (top: any, hidePlay: () => void, props: any) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const songSlider = React.useRef<any>(null);
  const [songIndex, setSongIndex] = React.useState(0);

  const progress = useProgress();
  const playbackState = usePlaybackState();

  const [trackArtwork, setTrackArtwork] = React.useState<string | number>();
  const [trackTitle, setTrackTitle] = React.useState<string>();
  const [trackArtist, setTrackArtist] = React.useState<string>();

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
        props.MusicStore.music.getnowPlaysongInfo({title, artist, artwork});
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
    return () => {
      scrollX.removeAllListeners();
    };
  }, [scrollX]);

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
          scrollEnabled={false}
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
          {/* <LyriScrBox>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((currentValue, index) => {
              return <LyriText key={index}>歌词 {currentValue}</LyriText>;
            })}
          </LyriScrBox> */}
          <LyriScrBox>
            <LyriText>{trackArtist}</LyriText>
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
  const [top] = React.useState(new Animated.Value(1000));
  const playbackState = usePlaybackState();
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
    StatusBar.setBarStyle('light-content');
  }, []);

  const playIndex = async function (index: number) {
    await TrackPlayer.skip(index);
  };
  return (
    <>
      {ModelView(top, hidePlay, props)}
      <Main>
        <Home>
          <ScrollView>
            {musics.map((item, index) => (
              <Cover
                play={() => playIndex(index)}
                goDetail={() => props.navigation.push('MusicDetail')}
                key={index}
                cover={item.artwork}
                title={item.title}
                des={item.artist}
                url={item.url}
              />
            ))}
          </ScrollView>
        </Home>
        <PlayBar
          url={'1'}
          duration={0}
          artwork={props.MusicStore.music.nowPlaysongInfo.artwork}
          artist={props.MusicStore.music.nowPlaysongInfo.artist}
          title={props.MusicStore.music.nowPlaysongInfo.title}
          onPress={showPlay}
          checkMusic={() => {
            togglePlayback(playbackState);
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
