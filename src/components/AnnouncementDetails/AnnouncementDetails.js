import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './AnnouncementDetails.css';
import SimilarAnnouncements from '../SimilarAnnouncements';
import Spinner from '../Spinner';
import Button from '../Button';

class AnnouncementDetails extends Component {

  state = {
    currentAnnouncement: null,
    isLoaded: false,
    title: '',
    description: '',
    isEdit: false
  };

  componentDidMount() {
    this.updateAnnouncement();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.announcementsArray !== prevProps.announcementsArray) {
      this.updateAnnouncement();
    }

    if (this.props.itemId !== prevProps.itemId) {
      this.updateAnnouncement();
    }
  }

  updateAnnouncement = () => {
    const { announcementsArray, itemId, history } = this.props;
    const currentAnnouncement = announcementsArray.find(item => item.id === Number(itemId));

    if (!currentAnnouncement) {
      history.replace('/');
      return;
    }

    this.setState({
      currentAnnouncement,
      title: currentAnnouncement.title,
      description: currentAnnouncement.description,
      isLoaded: true
    });
  };

  onTitleChange = e => this.setState({ title: e.target.value });
  onDescriptionChange = e => this.setState({ description: e.target.value });
  toggleEdit = () => this.setState({ isEdit: true });


  onClick = (ev) => {


    const { title, description, currentAnnouncement: { id, dateAdded } } = this.state;

    if (title.trim()) {
      if (description.trim()) {
        this.props.onEditItem({
          id,
          title,
          description,
          dateAdded
        });

        this.setState({ isEdit: false });
      } else {
        alert('Enter a description');
      }
    } else {
      alert('Enter a title');
    }
  };

  onDeleteItem = () => {
    const { onDeleteItem, history, itemId } = this.props;

    onDeleteItem(itemId);
    history.replace('/announcements');
  };

  render() {
    const { isEdit, currentAnnouncement, title, description } = this.state;

    if (!this.state.isLoaded) {
      return <Spinner />;
    }

    const renderTitle = isEdit
      ? <input type="text"
               onChange={this.onTitleChange}
               placeholder="Title"
               value={title} />
      : title;

    const renderDescription = isEdit
      ? <textarea value={description}
                  onChange={this.onDescriptionChange}
                  rows={6}
                  maxLength="600"
                  placeholder="Description..." />
      : description;

    const confirmBtn = isEdit ? <Button label="Confirm" onClick={this.onClick} /> : null;
    const editBtn = !isEdit ? <Button label="Edit" onClick={this.toggleEdit} /> : null;

    return (
      <>
        <div className="announcement-details">
          <div className="announcement-details-title">{renderTitle}</div>
          <div className="announcement-details-description">{renderDescription}</div>
          <span className="announcement-details-date">{currentAnnouncement.dateAdded}</span>
          <div className="announcement-details-btn">
            {editBtn}
            {confirmBtn}
            <Button label="Delete" onClick={this.onDeleteItem} />
          </div>
        </div>
        <SimilarAnnouncements announcementsArray={this.props.announcementsArray}
                              currentAnnouncement={currentAnnouncement} />
      </>
    );
  }
}

export default withRouter(AnnouncementDetails);
