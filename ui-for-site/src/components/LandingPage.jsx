import Carousel from 'react-bootstrap/Carousel';
import a from "../assets/imgs/slider-img-1.png";
import { useContext } from 'react';
import { Department } from '../App';

function LandingPage() {
  // hooks
  const deps = useContext(Department);
  const imgLink = "https://shop-v1.onrender.com/"
  return (
    <div className="landing-page container">
      <Carousel fade img= { a }>
        {
          deps ?
            deps.content.map((el) => {
              return (
                <Carousel.Item key={ el.id }>
                  <img
                    className="d-blocks w-100 h-100"
                    src={ imgLink + el.img }
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3> { el.name } </h3>
                    <p> { el.des } </p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })
          : <h1>not found data</h1>
        }
      </Carousel>
    </div>
  );
}

export default LandingPage;