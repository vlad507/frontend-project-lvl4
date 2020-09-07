import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../slices';

export default () => {
  const messages = useSelector(selectors.getMessagesForChannel);

  return (
    <div className="d-flex-column overflow-auto h-75 flex-fill">
      <div className="col-sm-12">
        {messages.map(({ userName, message, id }) => (
          <div key={id} className="d-flex-column flex-wrap">
            <h6>{userName}</h6>
            <p className="px-2">{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
