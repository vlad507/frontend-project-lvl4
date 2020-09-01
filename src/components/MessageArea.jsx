import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages, channels: { currentChannelId } } = state;
  const props = {
    messages,
    currentChannelId,
  };

  return props;
};

class MessageArea extends React.PureComponent {
  render() {
    const { messages, currentChannelId } = this.props;
    const currentChannelMessages = messages
      .filter((message) => message.channelId === currentChannelId);

    return (
      <div className="d-flex-column overflow-auto h-75 flex-fill">
        <div className="col-sm-12">
          {currentChannelMessages.map(({ userName, message, id }) => (
            <div key={id} className="d-flex-column flex-wrap">
              <h6>{userName}</h6>
              <p className="px-2">{message}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MessageArea);
