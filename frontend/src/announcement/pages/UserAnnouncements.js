import React, { useState, useContext, useEffect } from "react";


import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';
import AnnouncementsList from "../components/AnnouncementsList";

const UserAnnouncements = () => {
  const [loadedAnn, setLoadedAnn] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const rid = auth.userId;
  useEffect(() => {
    let responseData
    const fetchAnn = async () => {
      try {
        responseData = await sendRequest(
          `http://localhost:5000/api/announcement/user/${rid}`
        );
        setLoadedAnn(responseData.announcements);
      } catch (err) {console.log(err)}
    };
    fetchAnn();
    //console.log(responseData)
  }, [sendRequest, auth.userId]);

  // const annDeletedHandler = deletedPlaceId => {
  //   setLoadedAnn(prevPlaces =>
  //     prevPlaces.filter(place => place.id !== deletedPlaceId)
  //   );
  // };

  return (
    <React.Fragment>
      {/* {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )} */}
      {!isLoading && loadedAnn && (
        <AnnouncementsList items={loadedAnn}  />
      )}
    </React.Fragment>
  );
};


export default UserAnnouncements;
