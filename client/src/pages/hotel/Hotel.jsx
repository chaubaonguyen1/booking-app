import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import Reserve from "../../components/reserve/Reserve";

export default function Hotel() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading } = useFetch(`/hotels/find/${id}`);
  const [sliderIndex, setSlideIndex] = useState(0);
  const [openImg, setOpenImg] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const syncData = useSelector((state) => state.search);
  const reserve = useSelector((state) => state.auth);
  console.log(reserve)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff =
      Math.abs(date2.getTime() - date1.getTime()) === 0
        ? 1
        : Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    localStorage.setItem("days", diffDays);
    return diffDays;
  }

  const days = syncData.dates.length
    ? dayDifference(syncData.dates[0].endDate, syncData.dates[0].startDate)
    : JSON.parse(localStorage.getItem("days"));
  //handle slide open
  const handleOpen = (index) => {
    setSlideIndex(index);
    setOpenImg(true);
  };

  const handleSlide = (direction) => {
    let newSlideNumber;
    if (direction === "left") {
      newSlideNumber = sliderIndex === 0 ? 5 : sliderIndex - 1;
    } else {
      newSlideNumber = sliderIndex === 5 ? 0 : sliderIndex + 1;
    }

    setSlideIndex(newSlideNumber);
  };

  const handleClick = () => {
    if (reserve.user === null) {
      navigate("/login");
    } else {
      setOpenModal(true);
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading..."
      ) : (
        <div className="hotelContainer">
          {openImg && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpenImg(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleSlide("left")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[sliderIndex]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleSlide("right")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button onClick={handleClick} className="bookNow">Reserve or Book now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance} from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airpoint taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div key={index} className="hotelImgWrapper">
                  <img
                    onClick={() => handleOpen(index)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDescription">{data.description}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>{data.description}</span>
                <h2>
                  <b>
                    $
                    {data.cheapestPrice *
                      days *
                      (syncData.options.room ||
                        JSON.parse(localStorage.getItem("rooms")))}
                  </b>{" "}
                  ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
}
