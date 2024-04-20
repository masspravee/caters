import moment from "moment";
const defaultImage = (name) => {
  var url = `https://ui-avatars.com/api/?name=${name}&size=200&background=random&color=fff&bold=true`;
  return url;
};

const VerifiedLogo = () => {
  return (
    <>
      <span className="material-symbols-outlined">check_circle</span>
    </>
  );
};
export { defaultImage, VerifiedLogo };

export const getPostTime = () => {
  const time = new Date();
  const modifiedTime = moment(time).format("DD-MM-yyyy hh:mm a");
  return modifiedTime;
};
