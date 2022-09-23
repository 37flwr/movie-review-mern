import BoxTitle from "./BoxTitle";

const AppInfoBox = ({ title, subtitle }) => (
  <div className="dark:bg-secondary bg-white shadow p-5 rounded">
    <BoxTitle title={title} />
    <p className="text-xl text-primary dark:text-white">{subtitle}</p>
  </div>
);

export default AppInfoBox;
