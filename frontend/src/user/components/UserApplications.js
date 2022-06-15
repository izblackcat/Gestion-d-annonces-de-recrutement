import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AnnouncementsList from "../../announcement/components/AnnouncementsList";

const UserApplications = () => {
  const [loadedAnn, setLoadedAnn] = useState([]);
  const [loadedApp, setLoadedApp] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const cid = auth.userId;

  console.log(auth.userId);
  useEffect(() => {
    const fetchApp = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/application/user/${cid}`
        );
        console.log(responseData.applications);
        setLoadedApp(responseData.applications);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApp();

    /* 
    let responseData;
    const fetchAnn = async () => {
      try {
        responseData = await sendRequest(
          `http://localhost:5000/api/application/user/${cid}`
        );
        console.log(responseData.applications);
        setLoadedAnn(responseData.applications);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnn();
*/

    // const fetchAnn = async () =>{
    //   let announcements
    //   let announcement
    //     try{
    //       loadedApp.map(async (app) => {
    //       announcement = await sendRequest(`http://localhost:5000/api/announcement/${app.announcement}`)
    //       announcements.push(announcement)
    //       setLoadedAnn(announcements)
    //     })
    //     } catch (err) {console.log(err)}
    // }
  }, [sendRequest, cid]);

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
      {!isLoading && loadedAnn && loadedApp && (
        <AnnouncementsList items={loadedAnn} isCandidate={true} />
      )}
    </React.Fragment>
  );
};

export default UserApplications;
