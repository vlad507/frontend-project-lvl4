import React from 'react';

export default class ChannelList extends React.PureComponent {
  render() {
    const { channels } = this.props;
    return (
      <div className="h-100">
        <div className="row h-100 pb-3">
          <div className="col-3 border-right">
            <span>Channels</span>
            <ul className="nav flex-column nav-pills nav-fill">
              {channels.map(({ id, name }) => (
                <li calssName="nav-item" key={id}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
