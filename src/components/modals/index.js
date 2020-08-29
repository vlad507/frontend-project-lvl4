/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modalMapper = {
  addModal: () => <Add />,
  removeModal: (modalData) => <Remove id={modalData.id} />,
  renameModal: (modalData) => <Rename id={modalData.id} name={modalData.name} />,
};

export default ({ type, data }) => {
  if (!modalMapper[type]) return null;
  const Component = modalMapper[type](data);
  return Component;
};
