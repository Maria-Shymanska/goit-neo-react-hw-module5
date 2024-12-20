import css from "./CastCard.module.css";
import placeHolderImg from "../../assets/images/placeHolderImg.jpg";

const CastCard = ({ cast }) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/w185";

  return (
    <>
      <img
        className={css.image}
        src={
          cast.profile_path
            ? `${imgBaseUrl}${cast.profile_path}`
            : placeHolderImg
        }
        alt={cast.title || "Image not available"}
      />
      <div className={css.castCard}>
        <h3 className="hd-thr">
          <span className={css.accent}>Name:</span> {cast.name}
        </h3>
        <p className="par">
          <span className={css.accent}>Character:</span> {cast.character}
        </p>
      </div>
    </>
  );
};

export default CastCard;
