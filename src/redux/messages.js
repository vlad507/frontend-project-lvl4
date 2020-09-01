// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

import routes from '../routes';
import { actions as channelsActions } from './channels';

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
  initialState: [],
  reducers: {
    fetchMessageSuccess(state, { payload }) {
      const { message } = payload;
      state.push(message);
    },
  },
  extraReducers: {
    [channelsActions.removeChannelSuccess.toString()]: (state, { payload: { id } }) => state
      .filter(({ channelId }) => channelId !== id),
  },
});

const actions = { ...messagesSlice.actions };
export { actions };
export default messagesSlice.reducer;
