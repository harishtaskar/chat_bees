import moment from "moment-timezone";

export const currentDateTime = () => {
  const currentDate = new Date();

  // Get the current year, month, day, hours, minutes, and seconds
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so January is 0
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Format the date and time as needed
  const date = `${year}/${month < 10 ? "0" + month : month}/${
    day < 10 ? "0" + day : day
  }`;
  const time = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  // Output the current date and time
  return { date, time };
};

export const getUserAge = (dob: string) => {
  const birthDate = new Date(dob);

  // Get the current date
  const today = new Date();

  // Calculate the difference in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birth date hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const getDateAndTime = (datetime: Date) => {
  const istDatetime = moment.utc(datetime).tz("Asia/Kolkata");
  const date = istDatetime.format("YYYY-MM-DD");
  const time = istDatetime.format("HH:mm");
  return { date, time };
};
