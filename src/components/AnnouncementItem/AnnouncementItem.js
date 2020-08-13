import React from 'react';
import { Link } from 'react-router-dom';

import './AnnouncementItem.css';

const AnnouncementItem = props => {
  const { announcement: { id, title, description, dateAdded}, onDeleteItem } = props;

  return (
    <div className="announcement-item">
      <div className="close-item-button" onClick={onDeleteItem} />
      <Link to={`/announcements/${id}`}>
        <h3 className="announcement-item-title">{title}</h3>
      </Link>
      <p className="announcement-item-description">
        {description}
      </p>
      <span className="announcement-item-date">{dateAdded}</span>
    </div>
  );
};

export default AnnouncementItem;
