import React from "react";
import AppService from "../../api/app.service";
import profileStore from "../../store/profilePageStore";
import { observer } from "mobx-react-lite";
import ProfileHeader from "./ProfileHeader";
import { useParams } from "react-router-dom";

type ProfileProps = {
  childComp: React.ReactNode;
};
const Profile: React.FC<ProfileProps> = ({ childComp }) => {
  const { username } = useParams();
  const getProfileData = async () => {
    if (username) {
      const data = await AppService.getProfileData(username);
      profileStore.setProfile(data);
    }
  };

  React.useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="container">
      <ProfileHeader username={username} />
      {childComp}
    </div>
  );
};
export default observer(Profile);
