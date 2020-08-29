import React from 'react';
import { useSelector } from 'react-redux';

import gon from 'gon';

import ChannelList from './ChannelList.jsx';
import MessageForm from './MessageForm';
import MessageArea from './MessageArea';
import Modal from './modals';

export default () => {
  const { modal } = useSelector((state) => state);

  return (
    <>
      {modal.isShown && (
        Modal(modal)
      )}
      <div className="h-100">
        <div className="row h-100 pb-3">
          <div className="col-sm-4 border-right">
            <ChannelList channels={gon.channels} />
          </div>
          <div className="d-flex-column min-vh-100 mh-100 flex-fill m-2">
            <MessageArea />
            <MessageForm />
          </div>
        </div>
      </div>
    </>
  );
};
