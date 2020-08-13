import React, { Component } from 'react';

import './Modal.css';
import Portal from '../Portal';

class Modal extends Component {
  render() {
    return (
      <Portal>
        <div className="modal">
          <div className="close-btn" onClick={this.props.onClose}/>
          {this.props.children}
        </div>
      </Portal>
    );
  }
}

export default Modal;
