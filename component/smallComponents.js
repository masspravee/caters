import moment from "moment";
export const defaultImage = (name) => {
  var url = `https://ui-avatars.com/api/?name=${name}&size=200&background=random&color=fff&bold=true`;
  return url;
};

export const VerifiedLogo = () => {
  return (
    <>
      <span className="material-symbols-outlined">check_circle</span>
    </>
  );
};

export const getPostTime = () => {
  const time = new Date();
  const modifiedTime = moment(time).format("DD-MM-yyyy hh:mm a");
  return modifiedTime;
};

export const TimeSetter = (date) => {
  const formattedDate = moment(date, "DD-MM-YYYY hh:mm-A").fromNow();
  //console.log(formattedDate);
  return formattedDate;
};
