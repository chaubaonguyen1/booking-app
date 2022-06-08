import { Link } from "react-router-dom";
import "./searchitem.css";

export default function SearchItem({ item }) {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="searchItemImg" />
      <div className="searchItemDescription">
        <h1 className="searchItemTitle">{item.name}</h1>
        <span className="searchItemDistance">{item.distance} from center</span>
        <span className="searchItemTaxiOp">Free airport taxi</span>
        <span className="searchItemSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="searchItemFeatures">{item.description}</span>
        <span className="searchItemCancelOp">Free cancellation </span>
        <span className="searchItemCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="searchItemDetails">
        {item.rating && (
          <div className="searchItemRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="searchItemDetailTexts">
          <span className="searchItemPrice">${item.cheapestPrice}</span>
          <span className="searchItemTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="searchItemCheckButton">See availablity</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
