import React, { useEffect, useState } from "react";

import AnnouncementsList from "../components/AnnouncementsList";
import Search from "../../shared/components/UIElements/Search";
import { useHttpClient } from "../../shared/hooks/http-hook";





const Announcements = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedAnn, setLoadedAnn] = useState();

  //const [loadedNames, setLoadedNames] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/announcement'
        );
        setLoadedAnn(responseData.annonces);
      } catch (err) {console.log(err)}
    };
    fetchPlaces();
  }, [sendRequest]);


  return (
    <React.Fragment>
      <Search />
      {!isLoading && loadedAnn && 
      <AnnouncementsList items={loadedAnn} />
      }
    </React.Fragment>
  );
};

export default Announcements;
