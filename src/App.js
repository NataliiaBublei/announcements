import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';
import { announcements } from './constants/announcements';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import AnnouncementDetails from './components/AnnouncementDetails';
import AnnouncementsPage from './components/pages/AnnouncementsPage';
import ModalAnnouncement from './components/ModalAddAnnouncement';
import Spinner from './components/Spinner';

class App extends Component {

  state = {
    announcementsArray: null,
    isModalOpen: false,
    isLoaded: false
  };

  componentDidMount() {
    const loadAnnouncementsArray = () => {
      if (localStorage.getItem('announcementsArray') === null) {
        localStorage.setItem('announcementsArray', JSON.stringify(announcements));
      }

      return JSON.parse(localStorage.getItem('announcementsArray'));
    };

    this.setState({
      announcementsArray: loadAnnouncementsArray(),
      isLoaded: true
    });
  }

  componentDidUpdate() {
    localStorage.setItem('announcementsArray', JSON.stringify(this.state.announcementsArray));
  }

  toggleModal = () => {
    this.setState(state => ({
      isModalOpen: !state.isModalOpen
    }));
  };

  onAddItem = label => {
    this.setState(prevState => ({
      announcementsArray: [label, ...prevState.announcementsArray],
      isModalOpen: !prevState.isModalOpen
    }));
  };

  onEditItem = announcement => {
    const itemIndex = this.state.announcementsArray.findIndex(item => item.id === announcement.id);

    this.setState(prevState => ({
      announcementsArray: [
        ...prevState.announcementsArray.slice(0, itemIndex),
        { ...announcement },
        ...prevState.announcementsArray.slice(itemIndex + 1, prevState.announcementsArray.length)
      ]
    }));
  };

  onDeleteItem = id => {
    const itemIndex = this.state.announcementsArray.findIndex(announcement => announcement.id === Number(id));

    this.setState(prevState => ({
      announcementsArray: [
        ...prevState.announcementsArray.slice(0, itemIndex),
        ...prevState.announcementsArray.slice(itemIndex + 1, prevState.announcementsArray.length)
      ]
    }));
  };

  render() {
    const { announcementsArray, isModalOpen, isLoaded } = this.state;

    if (!isLoaded) {
      return <Spinner />;
    }

    return (
      <Router>
        <div className="app-wrapper">
          <Header toggleModal={this.toggleModal} />
          <main className="main-container">
            <div className="content">
              {
                isModalOpen &&
                <ModalAnnouncement onClose={this.toggleModal} onAddItem={this.onAddItem} />
              }
              <Switch>
                <Route path="/" exact render={() => <HomePage announcementsArray={announcementsArray}
                                                              onDeleteItem={this.onDeleteItem} />} />
                <Route path="/announcements" exact
                       render={() => <AnnouncementsPage announcementsArray={announcementsArray}
                                                        onDeleteItem={this.onDeleteItem} />} />
                <Route path="/announcements/:id" exact render={({ match }) => {
                  const { id } = match.params;

                  return <AnnouncementDetails itemId={id}
                                              onEditItem={this.onEditItem}
                                              announcementsArray={announcementsArray}
                                              onDeleteItem={this.onDeleteItem} />;
                }} />
                <Redirect to="/" />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
