import axios from "axios";
import { CircularProgress, Paper, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAuthorization";
import defaultAvatar from "../../assets/defaultAvatar.png";
import "./Profile.css";
import MenuProfile from "../../components/MenuProfile/MenuProfile";

function Profile() {
  const navigate = useNavigate();
  const { userProfile, userSession } = useAuthorization();
  const [avgRating, setAvgRating] = useState();
  const [reviews, setReviews] = useState();
  const { REACT_APP_BACKEND_API } = process.env;
  const { idUser } = userProfile;

  useEffect(() => {
    if (!userSession) {
      navigate("/login");
    } else {
      async function getReviews() {
        try {
          if (idUser) {
            const response = await axios.get(
              `${REACT_APP_BACKEND_API}reviews/${idUser}`
            );
            const responseData = response.data.data;
            setReviews(responseData);
            if (responseData.length > 1) {
              const reducer = (previousValue, currentValue) =>
                previousValue.rating + currentValue.rating;
              const totalRating = responseData.reduce(reducer);

              setAvgRating(Math.round(totalRating / responseData.length));
            } else if (responseData.length === 1) {
              setAvgRating(responseData[0].rating);
            } else {
              setAvgRating("No hay vloraciones");
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      getReviews();
    }
  }, [userSession, navigate, REACT_APP_BACKEND_API, idUser]);

  return (
    <div className="profile">
      {userProfile && avgRating ? (
        <>
          <MenuProfile />
          <Paper className="profile-paper">
            {userProfile.image !== null ? (
              <img
                className="img-settings"
                src={userProfile.image}
                alt="profile"
                height={150}
              />
            ) : (
              <img
                className="img-settings"
                src={defaultAvatar}
                alt="profile"
                height={150}
              />
            )}
            <div>
              <h1>{userProfile.nameUser}</h1>
              {avgRating > 0 ? (
                <Rating name="read-only" value={avgRating} readOnly />
              ) : (
                <Rating name="read-only" value={0} readOnly />
              )}
              {avgRating > 0 && <h3>{reviews.length} Valoraciones</h3>}
              <p>{userProfile.bio}</p>
            </div>
          </Paper>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Profile;
