import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem"><h4>Locations</h4></li>
          <li className="fListItem">Nagpure</li>
          <li className="fListItem">Mumbai</li>
          <li className="fListItem">Pune</li>
          <li className="fListItem">Nashik</li>
          <li className="fListItem">Amravati</li>
        </ul>
        
        <ul className="fList">
          <li className="fListItem"><h4>Unique places to stay </h4></li>
          <li className="fListItem">Reviews</li>
          <li className="fListItem">Unpacked: Travel articles </li>
          <li className="fListItem">Travel communities </li>
          <li className="fListItem">Seasonal and holiday deals </li>
        </ul>
        <ul className="fList">
          <li className="fListItem"><h4>Navigation</h4></li>
          <li className="fListItem" ><a href="#">Home</a></li>
          <li className="fListItem"><a href="#">Rooms</a></li>
          <li className="fListItem"><a href="#">About</a></li>
          <li className="fListItem"><a href="#">News</a></li>
        </ul>
       
      </div>
    </div>
  );
};

export default Footer;
