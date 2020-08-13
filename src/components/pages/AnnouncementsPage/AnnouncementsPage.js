import React, { Component } from 'react';

import './AnnouncementsPage.css';
import AnnouncementsList from '../../AnnouncementsList';
import InputSearch from '../../InputSearch';

class AnnouncementsPage extends Component {

  state = {
    inputValue: '',
    announcementsArray: []
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.announcementsArray !== prevProps.announcementsArray) {
      this.setState({
        inputValue: ''
      });
    }
  }

  updateData = config => {
    this.setState(config);
  };

  showAllAnnouncements = () => {
    this.setState({
      inputValue: ''
    });
  };

  render() {
    const { announcementsArray, onDeleteItem } = this.props;

    return (
      <div className="announcements">
        <InputSearch inputValue={this.state.inputValue}
                     update={this.updateData}
                     announcementsArray={announcementsArray} />
        <h2 className="announcement-title"
            onClick={this.showAllAnnouncements}>
          All announcements:
        </h2>
        <AnnouncementsList
          announcementsArray={this.state.inputValue ? this.state.announcementsArray : announcementsArray}
          onDeleteItem={onDeleteItem} />
      </div>
    );
  }
}

export default AnnouncementsPage;
