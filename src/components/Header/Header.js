import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

import './Header.css';
import Button from '../Button';

class Header extends Component {

  render() {
    return (
      <header className="header">
        <Link to="/">
          <img src={logo} className="header-logo" alt="Logo" />
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/announcements">All announcements</Link>
        </nav>
        <Button label="Add announcement" className="btn draw-border" onClick={this.props.toggleModal} />
      </header>
    );
  }
}

export default Header;
