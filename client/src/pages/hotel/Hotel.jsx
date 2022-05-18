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
import photos from "./photo";
import { useState } from "react";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function Hotel() {
  const [sliderIndex, setSlideIndex] = useState(0);
  const [openImg, setOpenImg] = useState(false);


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

    setSlideIndex(newSlideNumber)
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
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
              <img src={photos[sliderIndex].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleSlide("right")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book now!</button>
          <h1 className="hotelTitle">Grand Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New York</span>
          </div>
          <span className="hotelDistance">
            Excellent location - 500m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over $114 at this property and get a free airpoint taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, index) => (
              <div key={index} className="hotelImgWrapper">
                <img
                  onClick={() => handleOpen(index)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDescription">
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków–Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}
