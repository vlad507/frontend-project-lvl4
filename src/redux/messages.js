// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

import routes from '../routes';

export const sendMessage = (data) => async () => {
  const { channelId } = data;

  await axios.post(routes.channelMessagesPath(channelId), {
    data: {
      attributes: _.omit(data, 'channelId'),
    },
  });
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { byId: {}, allIds: [], messageSendingState: 'none' },
  reducers: {
    fetchMessagesSuccess(state, { payload }) {
      state.byId = _.keyBy(payload.messages, 'id');
      state.allIds = payload.messages.map((message) => message.id);
    },
    fetchMessageSuccess(state, { payload }) {
      const { message } = payload;
      const { id } = message;
      state.byId[id] = message;
      state.allIds.push(id);
    },
  },
});

const actions = { ...messagesSlice.actions };
export { actions };
export default messagesSlice.reducer;
