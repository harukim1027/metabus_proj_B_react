import React from 'react';
import './Styles/homeStyle.css';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = (
  <AutoplaySlider
    className="slider"
    cssModule={AwesomeSliderStyles}
    play={true}
    interval={3000}
    bullets={false}
  >
    <div
      data-src="https://cdn.pixabay.com/photo/2016/11/29/15/05/drink-1870139_960_720.jpg"
      className="image__description"
    >
      <h3>Lorem Ipsum</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
    </div>
    <div
      data-src="https://cdn.pixabay.com/photo/2016/10/22/20/34/wines-1761613_960_720.jpg"
      className="image__description"
    >
      <h3>Lorem Ipsum</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
    </div>
    <div
      data-src="https://cdn.pixabay.com/photo/2013/11/12/01/29/bar-209148_960_720.jpg"
      className="image__description"
    >
      <h3>Lorem Ipsum</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
    </div>
    <div
      data-src="https://cdn.pixabay.com/photo/2017/01/07/20/41/alcohol-1961542_960_720.jpg"
      className="image__description"
    >
      <h3>Lorem Ipsum</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
    </div>
  </AutoplaySlider>
);

function Home() {
  return (
    <div>
      <div className="header">{Slider}</div>
      <div className="content">
        <div className="content__left">
          <h3 className="title">Lorem Ipsum</h3>
          <p className="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
          </p>
        </div>
        <div className="content__right">
          <img
            className="img"
            src="https://images.pexels.com/photos/159291/beer-machine-alcohol-brewery-159291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
          />
        </div>
      </div>
      <div className="squares">
        <div className="square">
          <h3>uno</h3>
        </div>
        <div className="square">
          <h3>dos</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="square">
          <h3>tres</h3>
        </div>
        <div className="square">
          <h3>cuatro</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="square">
          <h3>cinco</h3>
        </div>
        <div className="square">
          <h3>seis</h3>
        </div>
        <div className="square">
          <h3>siete</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
      <div className="content2">
        <div className="content2__center">
          <h3>Lorem Ipsum</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Home;
