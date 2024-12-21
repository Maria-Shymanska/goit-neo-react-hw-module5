import css from "./ReviewCard.module.css";

const ReviewCard = ({ review }) => {
  return (
    <>
      <div className={css.reviewHeader}>
        <h2 className={css.author}>{review.author}</h2>
        <p className={css.date}>
          {new Date(review.created_at).toLocaleDateString()}
        </p>
      </div>
      <p className={css.reviewContent}>{review.content}</p>
    </>
  );
};

export default ReviewCard;
