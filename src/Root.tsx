/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-30 14:32:55
 * @ Modified by: zhenghui
 * @ Modified time: 2021-08-30 15:48:04
 * @ Description:
 */

import * as React from 'react';

import Routes from './routers/index';
import Store from './stores/index';
import {Provider} from 'mobx-react';

const Root = () => {
  return (
    <>
      <Provider {...Store}>
        <Routes />
      </Provider>
    </>
  );
};

export default Root;
