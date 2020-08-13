import React from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';
import AnnouncementsList from '../../AnnouncementsList';
import Button from '../../Button';

const HomePage = ({ announcementsArray, onDeleteItem }) => {
  const lastAnnouncements = announcementsArray.slice(0, 3);

  return (
    <>
      <div className="promo">
        <Link to="/announcements">
          <Button className="btn" label="Show all announcements"/>
        </Link>
      </div>

      <h2 className="title" >Last announcements:</h2>
      <AnnouncementsList announcementsArray={lastAnnouncements} onDeleteItem={onDeleteItem}/>
    </>
  );
};

export default HomePage;
