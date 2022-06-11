import useFetch from "../../hooks/useFetch";
import "./featuredproperties.css";

export default function FeaturedProperties() {
  const { data, loading } = useFetch(
    "/hotels/getAllHotel?featured=true&limit=6"
  );
  return (
    <div className="featuredProperties">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((item) => (
            <div className="featuredPropertiesItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="featuredPropertiesImg"
              />
              <span className="featuredPropertiesName">{item.name}</span>
              <span className="featuredPropertiesCity">{item.city}</span>
              <span className="featuredPropertiesPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="featuredPropertiesRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
