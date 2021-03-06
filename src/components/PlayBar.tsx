/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-27 16:32:13
 * @ Modified by: zhenghui
 * @ Modified time: 2021-09-03 11:02:29
 * @ Description:
 */

import React from 'react';
import styled from 'styled-components/native';
import Touchable from './Touchable';
type playBarProps = {
  onPress?: () => void;
  checkMusic?: (e: boolean) => void;
  url: String;
  title: String;
  artist: String;
  artwork: String;
  duration: Number;
};

const PlayMusicState = (
  setPlaystatus: (playStatus: boolean) => void,
  playStatus: boolean,
  props: any,
) => {
  if (typeof props.checkMusic === 'function') {
    setPlaystatus(!playStatus);
    props.checkMusic(playStatus);
  }
};

export const PlayBar: React.FC<playBarProps> = props => {
  const [playStatus, setPlaystatus] = React.useState(false);

  let playTextstatus = playStatus ? '播放' : '暂停';
  return (
    <PlayBarMain>
      <Touchable onPress={props.onPress}>
        <PlayCover
          source={{
            url: props.artwork,
          }}
        />
      </Touchable>
      <PlayMusic>
        <MusicTitle>{props.title}</MusicTitle>
        <MusicDes>{props.artist}</MusicDes>
      </PlayMusic>
      <PlayIcon
        activeOpacity={0.8}
        onPress={() => PlayMusicState(setPlaystatus, playStatus, props)}>
        <PlayText>{playTextstatus}</PlayText>
      </PlayIcon>
    </PlayBarMain>
  );
};

const PlayBarMain = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 60px;
  flex-direction: row;
  align-items: center;
  background: #000;
`;

const PlayIcon = styled.TouchableOpacity`
  width: 60px;
  height: 100%;
  background: #fff;
  align-items: center;
  justify-content: center;
`;

const PlayText = styled.Text`
  color: #000;
  font-weight: bold;
`;
const PlayCover = styled.Image`
  width: 60px;
  height: 100%;
  background: #fff;
`;
const PlayMusic = styled.View`
  flex: 1;
  margin: 0px 10px;
`;

const MusicTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  line-height: 24px;
`;
const MusicDes = styled.Text`
  font-size: 12px;
  color: #fff;
  line-height: 22px;
  font-weight: 500;
`;
