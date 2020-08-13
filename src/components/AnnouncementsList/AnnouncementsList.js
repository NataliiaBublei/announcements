import React from 'react';

import './AnnouncementsList.css';
import AnnouncementItem from '../AnnouncementItem';

const AnnouncementsList = ({ announcementsArray, onDeleteItem }) => {
  return (
    <ul className="announcements-list">
      {
        announcementsArray.map(announcement => {
          return (
            <li key={announcement.id}>
              <AnnouncementItem announcement={announcement}
                                onDeleteItem={() => onDeleteItem(announcement.id)} />
            </li>
          );
        })
      }
    </ul>
  );
};

export default AnnouncementsList;
