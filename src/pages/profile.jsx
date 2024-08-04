import React from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileActions from "../components/profile/ProfileActions";
import ProfileNav from "../components/profile/ProfileNav";
import Impact from "../components/profile/Impact";
import ReviewDistribution from "../components/profile/ReviewDistribution";
import MoreAboutMe from "../components/profile/MoreAboutMe";
import Reviews from "../components/profile/Reviews";

const ProfilePage = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 font-sans bg-gray-100 rounded-xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/3">
          <ProfileInfo />
          <ProfileNav />
        </div>
        <div className="w-full lg:w-2/3">
          <Impact />
          <ReviewDistribution />
          <MoreAboutMe />
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
