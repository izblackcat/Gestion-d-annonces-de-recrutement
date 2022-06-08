import React from "react";

import AnnouncementItem from "./AnnouncementItem";
import "./AnnouncementsList.css";

const AnnouncementsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>NO ANNOUNCEMENTS FOUND.</h2>
      </div>
    );
  }

  return (
    <ul className="announcement-list">
      {props.items.map((announcement) => (
        <AnnouncementItem
          key={announcement.id}
          id={announcement.id}
          title={announcement.title}
          description={announcement.description}
          category={announcement.category}
          candidates={announcement.candidates}
          status={announcement.status}
          date={announcement.date}
          userId={announcement.userId}
        />
      ))}
    </ul>
  );
};

export default AnnouncementsList;
