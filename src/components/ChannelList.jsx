import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { actions } from '../slices';

export default () => {
  const dispatch = useDispatch();
  const { setCurrentChannelId } = actions;
  const {
    channels: { channelsList, currentChannelId },
  } = useSelector((state) => state);
  const channels = channelsList;
  const changeChannel = (id) => () => {
    dispatch(setCurrentChannelId({ currentChannelId: id }));
  };

  const handleRemoveChannel = (id) => () => {
    dispatch(actions.showModal({ type: 'removeModal', data: { id } }));
  };

  const handleRenameChannel = (id, name) => () => {
    dispatch(actions.showModal({ type: 'renameModal', data: { id, name } }));
  };

  return (
    <>
      <h4 className="d-flex flex-row justify-content-around pt-2">
        {i18next.t('channels')}
        <button type="button" className="btn btn-block" onClick={() => dispatch(actions.showModal({ type: 'addModal' }))}>+</button>
      </h4>
      {channels.map(({ id, name, removable }) => {
        const isCurrentChannel = id === currentChannelId;
        const channelClass = cn({
          'bg-primary': isCurrentChannel,
        }, ['nav-link btn btn-block nav-pills nav-fill d-flex flex-row justify-content-between']);
        return (
          <div className="d-flex flex-row justify-content-center" key={id}>
            <button
              type="button"
              tabIndex="0"
              className={channelClass}
              onClick={changeChannel(id)}
            >
              <div className="container">
                <div className="row">
                  <div className="col-sm text-left text-truncate">
                    {name}
                  </div>
                  <span role="button" className="align-self-center close" onClick={handleRenameChannel(id, name)} aria-hidden="true">
                    <svg width="18px" height="18px" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
                      <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
                    </svg>
                  </span>
                  {removable && (
                    <span role="button" onClick={handleRemoveChannel(id)} className="close" aria-hidden="true">
                      ×
                    </span>
                  )}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </>
  );
};
