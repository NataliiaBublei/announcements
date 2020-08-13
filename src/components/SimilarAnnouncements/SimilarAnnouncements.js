import React from 'react';
import { Link } from 'react-router-dom';

import './SimilarAnnouncements.css';

const SimilarAnnouncements = ({ announcementsArray, currentAnnouncement }) => {

  const findSimilarAnnouncements = (announcements, targetAnnouncement) => {
    const targetTitleWords = targetAnnouncement.title.toLowerCase().split(' ');
    const targetDescriptionWords = targetAnnouncement.description.toLowerCase().split(' ');

    return announcements.filter(({ title, description }) => {
      const titleWords = title.toLowerCase().split(' ');
      const descriptionWords = description.toLowerCase().split(' ');

      const isTitleSimilar = targetTitleWords
        .some(word => titleWords.includes(word));
      const isDescriptionSimilar = targetDescriptionWords
        .some(word => descriptionWords.includes(word));

      return isTitleSimilar && isDescriptionSimilar;
    });
  };

  const similarAnnouncementsArray = findSimilarAnnouncements(announcementsArray, currentAnnouncement);
  const newArray = similarAnnouncementsArray.filter(item => item.id !== Number(currentAnnouncement.id));

  return (
    <div className="similar-announcements-list">
      <h3>Top 3 similar announcements:</h3>
      <ul>
        {
          newArray.slice(0, 3).map(announcement => {
            return (
              <Link to={`/announcements/${announcement.id}`}>
                <li key={announcement.id} className="similar-announcements-item">
                  {announcement.title}
                </li>
              </Link>
            );
          })
        }
      </ul>
    </div>
  );
};

export default SimilarAnnouncements;
