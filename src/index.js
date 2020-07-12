// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import ReactDOM from 'react-dom';
import React from 'react';

import ChannelList from './ChannelList.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

ReactDOM.render(
  <ChannelList channels={gon.channels}/>,
  document.querySelector('.container'),
);
