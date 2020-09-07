/* eslint-disable no-shadow */

import { combineReducers, createSelector } from '@reduxjs/toolkit';

import channels, {
  actions as channelsActions, removeChannel, renameChannel, addNewChannel,
} from './channels';
import messages, { actions as messagesActions, sendMessage } from './messages';
import modal, { actions as modalActions } from './modal';

export default combineReducers({
  channels,
  messages,
  modal,
});

const getMessagesForChannel = createSelector(
  (state) => state.messages,
  (state) => state.channels.currentChannelId,
  (messages, currentChannelId) => messages
    .filter((m) => m.channelId === currentChannelId),
);

const asyncActions = {
  removeChannel,
  renameChannel,
  addNewChannel,
  sendMessage,
};

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

const selectors = {
  getMessagesForChannel,
};


export {
  actions,
  asyncActions,
  selectors,
};
