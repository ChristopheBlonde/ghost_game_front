import "./GameCard.scss";

/* Icon rating */
const iconRatingFind = (ratingTop) => {
  let icon;
  switch (ratingTop) {
    case 5:
      icon = <span>&#x1F3AF;</span>;
      break;
    case 4:
      icon = <span>&#x1F44D;</span>;
      break;
    case 3:
      icon = <span>&#128529;</span>;
      break;
    case 1:
      icon = <span>&#x26D4;</span>;
      break;
    default:
      icon = <span>&#x1F648;</span>;
      break;
  }
  return icon;
};

const GameCard = ({ data }) => {
  return (
    <div className="gameCard">
      <img className="bgImgGame" src={data.background_image} alt={data.name} />
      <h2 className="titleGame">{data.name}</h2>
      <div className="rating">
        <span className="iconRating">{iconRatingFind(data.rating_top)}</span>
        <span>
          {data.ratings && data.ratings.length !== 0 && data.ratings[0].title}
        </span>
      </div>
      <div className="categories-1">
        <span className="titleGenres">Genres :</span>
        {data.genres &&
          data.genres.length !== 0 &&
          data.genres.map((genres) => (
            <span key={genres.id} className="genre">
              {genres.name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default GameCard;
