import Footer from "../../components/footer/Footer";

import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Featured from "../../components/featured/Featured";
import backgroundImage from "./banner.png";
import PropertyList from "../../components/propertyList/PropertyList";
import Freebies from "../../components/freebies/Freebies";
import Message from "../../components/message/Message";
import useFetch from "../../hooks/useFetch";




const Home = () => {
  // const { imagedata, imageloading, imageerror, imagerefetch } = useFetch(`/room/images/1`);
  // console.log(imagedata);

  //  const test=JSON.parse(imagedata);
 

  return (
    <div>
      <div className="head">
        <Navbar />
        <Header />
      </div>
      <h2>Surrounded by galleries, boutiques, restaurants and<br/> cafes, 
            our Hotels is a hub of energy and <br/>style.</h2>
      <div className="homeContainer">
        <div>
          <h1 className="homeTitle">Browse by property type</h1>
          <PropertyList />
        </div>

        <div>
          <h4>Find a Room For You</h4>
          <h6>
            The concept and service of the best luxury hotels in our
            sophisticated
          </h6>
          <Featured />
        </div>
        <div>
          <Freebies />
        </div>
        <Message/>
        <Footer />
      </div>

     
    </div>
  );
};

export default Home;
