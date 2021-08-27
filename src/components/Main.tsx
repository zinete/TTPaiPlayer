/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-27 15:31:31
 * @ Modified by: zhenghui
 * @ Modified time: 2021-08-27 17:12:04
 * @ Description: 主体包裹 左右间距 背景颜色
 */

import React from 'react';
import styled from 'styled-components/native';

type mainpropsType = {};

const Main: React.FC<mainpropsType> = props => {
  return (
    <Body>
      <Content>{props.children}</Content>
    </Body>
  );
};

const Body = styled.SafeAreaView`
  background: #191919;
  flex: 1;
  height: 100%;
  position: relative;
`;

const Content = styled.View``;

export default Main;
