import React from "react";

import AnnouncementsList from "../components/AnnouncementsList";

const ANNONCES = [
  {
    id: "an1",
    title: "Announcement A",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,illo beatae dolores fuga harum perspiciatis laudantium quidem pariatur error est aspernatur. Neque cumque unde numquam iste ad, voluptate,ullam maiores temporibus iusto nam eveniet!",
    category: "Category",
    status: "PENDING",
    date: "06-June-2022",
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
    date: "06-MARS-2022",
    candidates: "15",
    userId: "u2",
  },
];

const Announcements = () => {
  return <AnnouncementsList items={ANNONCES} />;
};

export default Announcements;
