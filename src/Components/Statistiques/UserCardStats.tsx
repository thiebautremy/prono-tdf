/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ProfilPicture } from "../NavBar/navBar";
import "./UserCardStats.scss";

export type UserCardType = {
  username: string;
  color: string;
  imageUrl: string;
  maxPoint: number;
  minPoint: number;
  totalPoints: number;
  averagePoint: number;
  victoriesStages?: number;
  catchPhrase: string;
  authId: string;
  historic: { [key: string]: { [key: string]: number } };
};

interface UserCardStatsType extends UserCardType {
  selectedYear: { name: string; code: string };
}
const UserCardStats: React.FC<UserCardStatsType> = ({
  username,
  imageUrl,
  maxPoint,
  minPoint,
  totalPoints,
  victoriesStages,
  color,
  catchPhrase,
  averagePoint,
  selectedYear,
  historic,
}) => {
  const getPoint = (namePoint: string) => {
    const namePointArray = [
      { name: "maxPoint", value: maxPoint },
      { name: "minPoint", value: minPoint },
      { name: "totalPoints", value: totalPoints },
      { name: "averagePoint", value: averagePoint },
      { name: "victoriesStages", value: victoriesStages },
    ];
    if (selectedYear.code !== "Actuelle") {
      return historic[selectedYear.code][namePoint];
    }
    return namePointArray.find((item) => item.name === namePoint).value;
  };

  return (
    <div
      className="userCardStats"
      style={{
        border: `1px solid rgb(${color})`,
      }}
    >
      <div
        className="userCardStats__header"
        style={{
          backgroundColor: `rgb(${color})`,
        }}
      >
        <ProfilPicture imageUrl={imageUrl} />
        <div>
          <p className="userCardStats__header__username">{username}</p>

          <p className="userCardStats__header__catchPrase">
            {catchPhrase && catchPhrase !== "" && catchPhrase}
          </p>
        </div>
      </div>
      <div className="userCardStats__content">
        <p className="userCardStats__content__point">
          <strong>Max point: </strong>
          {getPoint("maxPoint")}
        </p>
        <p className="userCardStats__content__point">
          <strong>Min point:</strong> {getPoint("minPoint")}
        </p>
        <p className="userCardStats__content__point">
          <strong>Moyenne point:</strong> {getPoint("averagePoint")}
        </p>
        <p className="userCardStats__content__point">
          <strong>Nombre d'étapes gagnées:</strong>{" "}
          {getPoint("victoriesStages")}
        </p>

        <p className="userCardStats__content__point">
          <strong>Total :</strong> {getPoint("totalPoints")}
        </p>
      </div>
    </div>
  );
};

export default UserCardStats;
