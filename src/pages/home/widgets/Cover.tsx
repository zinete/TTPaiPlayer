/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-27 15:41:07
 * @ Modified by: zhenghui
 * @ Modified time: 2021-08-30 15:25:46
 * @ Description:
 */

import React from 'react';
import SoundPlayer from 'react-native-sound-player';
import styled from 'styled-components/native';
import Touchable from '../../../components/Touchable';

type coverPropsType = {
  url: string;
  title: string;
  des: string;
  goDetail: () => void;
};
export const Cover: React.FC<coverPropsType> = (props: any) => {
  return (
    <Touchable onPress={props.goDetail}>
      <CoverMain>
        <Card>
          <CoverImage />
          <DesBox>
            <Title>{props.title}</Title>
            <Des>{props.des}</Des>
          </DesBox>
          <Play onPress={() => SoundPlayer.playUrl(props.url)}>
            <PlayText>play</PlayText>
          </Play>
        </Card>
      </CoverMain>
    </Touchable>
  );
};

const DesBox = styled.View``;
const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 32px;
`;

const Des = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

const CoverImage = styled.View`
  width: 60px;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  margin-right: 10px;
`;
const CoverMain = styled.View`
  margin-bottom: 14px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
`;

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  height: 60px;
`;

const Play = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`;
const PlayText = styled.Text`
  color: #fff;
`;
