import React from 'react';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import { any, func, string } from 'prop-types';
import { Slide } from '../components';
import Utils from '../utility';

const NextButton = (props) => {
  const {
    className, style, onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      aria-label="Next"
      type="button"
      className={className}
      style={style}
    >
      Next
    </button>
  );
};

const BackButton = (props) => {
  const {
    className, style, onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      aria-label="Back"
      type="button"
      className={className}
      style={style}
    >
      Back
    </button>
  );
};

const settings = {
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  fade: true,
  infinite: true,
  nextArrow: <NextButton />,
  pauseOnHover: true,
  prevArrow: <BackButton />,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
};

const PublicLayout = ({
  children, title,
}) => (
  <div className="app-container app-theme-white body-tabs-shadow">
    <Helmet>
      <title>{`${title} - Skulman`}</title>
    </Helmet>
    <div className="app-container">
      <div className="h-100">
        <div className="h-100 no-gutters row">
          <div className="d-none d-lg-block col-lg-4">
            <div className="slider-light">
              <Slider {...settings}>
                <Slide
                  className="bg-plum-plate"
                  image={Utils.getImage('login/1.jpg')}
                  title="Perfect Balance"
                  description="ArchitectUI is like a dream. Some think it's too good to be true! Extensive collection of unified React Bootstrap Components and Elements."
                />
                <Slide
                  className="bg-premium-dark"
                  image={Utils.getImage('login/2.jpg')}
                  title="Scalable, Modular, Consistent"
                  description="Easily exclude the components you don't require. Lightweight, consistent Bootstrap based styles across all elements and components"
                />
                <Slide
                  className="bg-sunny-morning"
                  image={Utils.getImage('login/3.jpg')}
                  title="Complex, but lightweight"
                  description="We've included a lot of components that cover almost all use cases for any type of application."
                />
              </Slider>
            </div>
          </div>
          <div className="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

PublicLayout.propTypes = {
  children: any.isRequired,
  title: string.isRequired,
};

BackButton.propTypes = {
  className: string.isRequired,
  onClick: func.isRequired,
  style: string.isRequired,
};

NextButton.propTypes = {
  className: string.isRequired,
  onClick: func.isRequired,
  style: string.isRequired,
};

export default PublicLayout;
