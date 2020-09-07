// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: null,
  },
  reducers: {
    fetchChannelSuccess(state, { payload }) {
      const { channel } = payload;
      state.channelsList.push(channel);
    },
    removeChannelSuccess(state, { payload }) {
      const { id, currentChannelId } = payload;
      state.channelsList = state.channelsList.filter((channel) => channel.id !== id);
      state.currentChannelId = currentChannelId;
    },
    renameChannelSuccess(state, { payload }) {
      const { id, name } = payload.channel;
      const changedChannel = _.find(state.channelsList, (channel) => channel.id === id);
      changedChannel.name = name;
    },
    setCurrentChannelId(state, { payload }) {
      const { currentChannelId } = payload;
      state.currentChannelId = currentChannelId;
    },
  },
});

export const addNewChannel = (data) => async () => {
  await axios.post(routes.channelsPath(), {
    data: {
      attributes: data,
    },
  });
};

export const removeChannel = (id) => async () => {
  await axios.delete(routes.channelPath(id));
};

export const renameChannel = (data) => async () => {
  const { id } = data;

  await axios.patch(routes.channelPath(id), {
    data: {
      attributes: data,
    },
  });
};

const actions = { ...slice.actions };
export { actions };
export default slice.reducer;
