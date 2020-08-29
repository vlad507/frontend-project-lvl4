// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import io from 'socket.io-client';
import gon from 'gon';
import i18next from 'i18next';

import resources from './locales';
import Context from './context';
import App from './components/App';
import getUserName from './utils';
import reducer, { actions } from './redux';

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const socket = io(process.env.PORT);

  i18next.init(
    {
      lng: 'en',
      resources,
    },
  );

  const store = configureStore({
    reducer,
  });

  store.dispatch(actions.fetchMessagesSuccess({ messages: gon.messages }));

  store.dispatch(actions.fetchChannelsSuccess({ channels: gon.channels }));

  store.dispatch(actions.setCurrentChannelId({ currentChannelId: gon.currentChannelId }));

  socket.on('newMessage', ({ data }) => {
    store.dispatch(actions.fetchMessageSuccess({ message: data.attributes }));
  });

  socket.on('newChannel', ({ data }) => {
    store.dispatch(actions.fetchChannelSuccess({ channel: data.attributes }));
  });

  socket.on('renameChannel', ({ data }) => {
    store.dispatch(actions.renameChannelSuccess({ channel: data.attributes }));
  });

  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.removeChannelSuccess({ id: data.id }));
    store.dispatch(actions.setCurrentChannelId({ currentChannelId: gon.currentChannelId }));
  });

  ReactDOM.render(
    <Provider store={store}>
      <Context.Provider value={{ user: getUserName() }}>
        <App />
      </Context.Provider>
    </Provider>,
    document.querySelector('.container'),
  );
};
