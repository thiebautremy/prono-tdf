import { Timestamp } from "firebase/firestore";

export const getDateFormated = (timestampFirestore: {
  seconds: number;
  nanoseconds: number;
}) => {
  const timeObj = new Timestamp(
    timestampFirestore.seconds,
    timestampFirestore.nanoseconds
  );
  const dateAndHour = timeObj.toDate();
  const minutes =
    dateAndHour.getMinutes() < 10
      ? `0${dateAndHour.getMinutes()}`
      : `${dateAndHour.getMinutes()}`;
  const month =
    dateAndHour.getMonth() + 1 < 10
      ? `0${dateAndHour.getMonth() + 1}`
      : `${dateAndHour.getMonth() + 1}`;
  const day =
    dateAndHour.getDate() < 10
      ? `0${dateAndHour.getDate()}`
      : dateAndHour.getDate();

  const date = `${day}/${month}/${dateAndHour.getUTCFullYear()}`;
  const hour = `${dateAndHour.getHours()}:${minutes}`;
  return { date, hour };
};

export const getDateFormatedWithoutYearAndHour = (timestampFirestore: {
  seconds: number;
  nanoseconds: number;
}) => {
  const timeObj = new Timestamp(
    timestampFirestore.seconds,
    timestampFirestore.nanoseconds
  );
  const dateAndHour = timeObj.toDate();
  const month =
    dateAndHour.getMonth() + 1 < 10
      ? `0${dateAndHour.getMonth() + 1}`
      : `${dateAndHour.getMonth() + 1}`;
  const day =
    dateAndHour.getDate() < 10
      ? `0${dateAndHour.getDate()}`
      : dateAndHour.getDate();

  const date = `${day}/${month}`;
  return { date };
};

export const getTotalPoints = (array: number[]) => {
  return array.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue
  );
};

export const convertPointsInArray = (points: { [key: number]: number }) => {
  let keys: string[] = [];
  let values: number[] = [];
  if (points !== undefined) {
    keys = Object.keys(points);
    values = Object.values(points);
  }
  return { keys, values };
};
