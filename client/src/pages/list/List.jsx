import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";

const List = () => {
  //location from Header.jsx
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const minDebounced = useDebounce(min, 850);
  const maxDebounced = useDebounce(max, 850);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels/getAllHotel?city=${destination}&min=${minDebounced || 0}&max=${maxDebounced || 999}`
  );

  const handleClick = () => {
    reFetch()
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listSearchTitle">Search</h1>
            <div className="listSearchItem">
              <label>Destination</label>
              <input type="text" />
            </div>
            <div className="listSearchItem">
              <label>{destination}</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyyy")} `}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="listSearchItem">
              <label>Options</label>
              <div className="listSearchOptions">
                <div className="listOptionItem">
                  <span className="listSearchOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    min={15}
                    placeholder="15"
                    type="number"
                    className="optionInput"
                    onChange={e => setMin(e.target.value)}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listSearchOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="optionInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listSearchOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="optionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listSearchOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="optionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listSearchOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="optionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading..."
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

//1:18:30
