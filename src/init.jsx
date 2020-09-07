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
import setNameForNewUser from './utils';
import reducer, { actions } from './slices';

export default () => {
  i18next
    .init(
      {
        lng: 'en',
        resources,
      },
    )
    .then(() => {
      if (process.env.NODE_ENV !== 'production') {
        localStorage.debug = 'chat:*';
      }

      const socket = io(process.env.PORT);

      const preloadedState = {
        channels: {
          channelsList: gon.channels,
          currentChannelId: gon.currentChannelId,
        },
        messages: gon.messages,
      };

      const store = configureStore({
        reducer,
        preloadedState,
      });

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
        store.dispatch(
          actions.removeChannelSuccess({
            id: data.id,
            currentChannelId: gon.currentChannelId,
          }),
        );
      });

      const name = setNameForNewUser();

      ReactDOM.render(
        <Provider store={store}>
          <Context.Provider value={{ user: name }}>
            <App />
          </Context.Provider>
        </Provider>,
        document.querySelector('.container'),
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
};
