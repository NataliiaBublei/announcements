import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './ModalAddAnnouncement.css';
import Modal from '../Modal';
import Button from '../Button';

class ModalAddAnnouncement extends Component {

  static initialState = {
    title: '',
    description: ''
  };

  state = ModalAddAnnouncement.initialState;

  onTitleChange = e => this.setState({ title: e.target.value });
  onDescriptionChange = e => this.setState({ description: e.target.value });

  getDate() {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en', { year: 'numeric', day: '2-digit', month: 'short' });
  }

  onSubmit = (ev) => {
    ev.preventDefault();

    if (this.state.title.trim()) {
      if (this.state.description.trim()) {
        this.props.onAddItem({
          id: uuidv4(),
          ...this.state,
          dateAdded: this.getDate()
        });

        this.setState(ModalAddAnnouncement.initialState);
      } else {
        alert('Enter a description');
      }
    } else {
      alert('Enter a title');
    }

    this.props.history.replace('/announcements');
  };

  render() {
    const { onClose } = this.props;

    return (
      <Fragment>
        <Modal onClose={onClose}>
          <form className="form-container" onSubmit={this.onSubmit} onDragExit={onClose}>
            <h3 className="title">Create a new announcement:</h3>
            <input
              type="text"
              onChange={this.onTitleChange}
              placeholder="Title"
              value={this.state.title}
            />
            <textarea
              value={this.state.description}
              onChange={this.onDescriptionChange}
              rows={6}
              maxLength="600"
              placeholder="Description..."
            />
            <Button label="Cancel" className="form-btn red" onClick={onClose} />
            <Button label="Add" className="form-btn" type="submit" />
          </form>
        </Modal>
      </Fragment>
    );
  }
}

export default withRouter(ModalAddAnnouncement);
