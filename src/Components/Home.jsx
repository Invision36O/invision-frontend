import React,{useState, useEffect} from "react";
import "./Home.css";
import { Sidebar } from "../Layouts/Sidebar";
import { CSSTransition } from "react-transition-group";

export const Home = () => {
  const [selectedButton, setSelectedButton] = useState('For You');
  const [isHidden, setIsHidden] = useState(false);

  const handleDigitize = () => {

  }
 

  const ForYouContent = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const demoImages = [
      "/Icons/DigitizingMap.png",
      "/Icons/DesignObjects.png",
      "/Icons/DesignSpace.png",
      "/Icons/FrontElevationChoice.png",
    ];
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === demoImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="foryou">
        <div className="image-box">
  {demoImages.map((imageUrl, index) => (
    <img
      key={index}
      className={`image ${index === currentImageIndex ? "visible" : ""}`}
      src={imageUrl}
      alt={`Image ${index + 1}`}
    />
  ))}
</div>
      </div>
    );
  };
  
  const MapDigitizationContent = () => (
    <div className="map-digitization">
      <div className="subheading"><h1>Maps</h1></div>
      <div className="content">

        <div className="card">
          <a href="/map" className="card"><div className="card-image"><img src="/Icons/card/DigitizeMap.png" alt="" height={150}width={150}/></div>
          <div className="heading">
            <h3>Upload Map</h3>
          </div>
          <div className="subheading">
            <p>Upload your map to convert it into 3D </p>
          </div></a>
        </div>

      <div className="mymaps">
        <div className="subheading"><h1>Digitized Maps</h1></div>
      </div>

      </div>
    </div>
  );
  
  const ModelGenerationContent = () => (
    <div className="model-generation">
      <h1>Model Generation</h1>
      <div className="content">

        <div className="card">
          <a href="/object" className="card"><div className="card-image"><img src="/Icons/card/UploadModel.png" alt="" height={150}width={150}/></div>
          <div className="heading">
            <h3>Import Model</h3>
          </div>
          <div className="subheading">
            <p>Import a 3D Model to bring into projects</p>
          </div></a>
        </div>

        <div className="card">
          <a href="/object" className="card"><div className="card-image"><img src="/Icons/card/GenerateModel.png" alt="" height={150}width={150}/></div>
          <div className="heading">
            <h3>Generate 3D Model</h3>
          </div>
          <div className="subheading">
            <p>Generate a 3D Model of your Household Item</p>
          </div></a>
        </div>

      </div>
    </div>
  );
  
  const SpaceGenerationContent = () => (
    <div className="space-generation">
      <h1>Space Generation</h1>
      <div className="content">
      <h2>Digitized Maps</h2>
      <div className="card">
          <a href="/map" className="card"><div className="card-image"><img src="/Icons/card/DigitizeMap.png" alt="" height={150}width={150}/></div>
          <div className="heading">
            <h3>Upload Map</h3>
          </div>
          <div className="subheading">
            <p>Upload your map to convert it into 3D </p>
          </div></a>
        </div>

      </div>
    </div>
  );
  
  const FrontElevationContent = () => (
    <div className="front-elevation">
      <h1>Front Elevation</h1>
      <div className="content">
      <div className="card">
          <a href="/" className="card"><div className="card-image"><img src="/Icons/card/ChoosingFrontElevation.png" alt="" height={160}width={160}/></div>
          <div className="heading">
            <h3>Choose a Design</h3>
          </div>
          <div className="subheading">
            <p>From a variety designs, Choose your favorite</p>
          </div></a>
        </div>

        <div className="card">
          <a href="/" className="card"><div className="card-image"><img src="/Icons/card/CustomizeFrontElevation.png" alt="" height={160}width={160}/></div>
          <div className="heading">
            <h3>Customize a Design</h3>
          </div>
          <div className="subheading">
            <p>Customize you Favorite Designs</p>
          </div></a>
        </div>

      </div>
    </div>
  );
  const selectButton = (buttonName) => {
    setIsHidden(true);
    setTimeout(() => {
      setSelectedButton(buttonName);
      setIsHidden(false);
    }, 300);
  };

  const renderContent = () => {
    switch (selectedButton) {
      case "For You":
        return <ForYouContent />;
      case "Map Digitization":
        return <MapDigitizationContent />;
      case "Model Generation":
        return <ModelGenerationContent />;
      case "Space Generation":
        return <SpaceGenerationContent />;
      case "Front Elevation":
        return <FrontElevationContent />;
      default:
        return null;
    }
  };

  return (
    <>
    <div className="home-main">

    <div className="sidebar">
      <Sidebar/>
    </div>

    <div className="home">


    <div className="main">

      <div className="box">
        <div className="heading">
          <h1>Design Your Home</h1>
        </div>
        <div className="subheading">
          <h2>Choose Operation</h2>
        </div>
        <div className="links">
          <div className="buttons">
            <div className={`button ${selectedButton === 'For You' ? 'selected' : ''}`} onClick={() => selectButton('For You')}>
              <button>
                <i className="fa fa-home" aria-hidden="true"></i>
              </button>
              <p>For You</p>
            </div>

            <div className={`button ${selectedButton === 'Map Digitization' ? 'selected' : ''}`}  onClick={() => selectButton('Map Digitization')}>
              <button>
                <i className="fa fa-map" aria-hidden="true"></i>
              </button>
              <p>Map Digitization</p>
            </div>

            <div className={`button ${selectedButton === 'Model Generation' ? 'selected' : ''}`}  onClick={() => selectButton('Model Generation')}>
              <button>
                <i className="fa fa-cubes" aria-hidden="true"></i>
              </button>
              <p>Model Generation</p>
            </div>

            <div className={`button ${selectedButton === 'Space Generation' ? 'selected' : ''}`}  onClick={() => selectButton('Space Generation')}>
              <button>
                <img src="/Icons/room-icon.webp" height={40} width={40} alt="Space Generation" />
              </button>
              <p>Space Generation</p>
            </div>

            <div className={`button ${selectedButton === 'Front Elevation' ? 'selected' : ''}`}  onClick={() => selectButton('Front Elevation')}>
              <button>
                <i className="fa fa-building" aria-hidden="true"></i>
              </button>
              <p>Front Elevation</p>
            </div>
          </div>
        </div>
      </div>


      <div className="content">
        <CSSTransition in={!isHidden} timeout={100} classNames="slide" unmountOnExit>
          <div>
            {renderContent()}
          </div>
        </CSSTransition>
      </div>

    </div>


    </div>
    
    </div>
  </>
    );
};