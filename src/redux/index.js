// @ts-check

import { combineReducers } from 'redux';

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

export {
  actions,
  asyncActions,
};
