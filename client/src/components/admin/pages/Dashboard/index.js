import React from "react";
import AppInfoBox from "./AppInfoBox";
import LatestUploads from "./LatestUploads";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-5 my-5">
      <AppInfoBox title="Total Uploads" subtitle="100" />
      <AppInfoBox title="Total Reviews" subtitle="100" />
      <AppInfoBox title="Total Users" subtitle="100" />

      <LatestUploads />
    </div>
  );
};

export default Dashboard;
