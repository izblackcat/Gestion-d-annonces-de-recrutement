import React from "react";
import { useParams } from "react-router-dom";

import AnnouncementsList from "../components/AnnouncementsList";

const ANNONCES = [
  {
    id: "an1",
    title: "Announcement A",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,illo beatae dolores fuga harum perspiciatis laudantium quidem pariatur error est aspernatur. Neque cumque unde numquam iste ad, voluptate,ullam maiores temporibus iusto nam eveniet!",
    category: "Category",
    status: "PENDING",
    date: new Date().toISOString().split("T")[0],
    candidates: "5",
    userId: "u1",
  },
  {
    id: "an2",
    title: "Announcement B",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,illo beatae dolores fuga harum perspiciatis laudantium quidem pariatur error est aspernatur. Neque cumque unde numquam iste ad, voluptate,ullam maiores temporibus iusto nam eveniet!",
    category: "Category",
    status: "URGENT",
    date: new Date().toISOString().split("T")[0],
    candidates: "15",
    userId: "u2",
  },
];

const UserAnnouncements = () => {
  const userId = useParams().userId;

  const userAnns = ANNONCES.filter((an) => an.userId === userId);

  console.log(userAnns);

  if (!userAnns) {
    return (
      <div className="center">
        <h2>Aucune annonce trouvée!</h2>
      </div>
    );
  }

  return <AnnouncementsList items={userAnns} />;
};

export default UserAnnouncements;
