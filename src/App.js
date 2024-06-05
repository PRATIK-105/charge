import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// import mainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Services from "./pages/Services";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import LocationContext from "./pages/LocationContext";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase"; // Update with the correct path
import NavBar from "./pages/NavBar";

function App() {
  const { pathname, action } = useLocation();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [chargerLocations, setChargerLocations] = useState([]);

  useEffect(() => {
    const fetchChargerLocations = async () => {
      const querySnapshot = await getDocs(collection(db, "chargers"));
      const locations = querySnapshot.docs.map((doc) => {
        const chargerData = doc.data();
        console.log("Charger data:", chargerData); // Log the entire charger data

        let lat = 0;
        let lng = 0;

        // If geoLocation exists and is a string, split by ',' and convert to numbers
        if (
          chargerData.geoLocation &&
          typeof chargerData.geoLocation === "string"
        ) {
          const [latStr, lngStr] = chargerData.geoLocation.split(",");
          lat = parseFloat(latStr.trim());
          lng = parseFloat(lngStr.trim());
        } else {
          // If geoLocation is not a string or not found, log a warning with the document ID
          console.warn(
            `geoLocation not found or not a string in document ID: ${doc.id}`
          );
        }

        // Log any parsing errors or if lat/lng are not numbers
        if (isNaN(lat) || isNaN(lng)) {
          console.error(`Error parsing geoLocation for charger ID ${doc.id}`);
        }

        return {
          ...chargerData,
          geoLocation: {
            lat: isNaN(lat) ? 0 : lat, // Use parsed latitude or 0 as a fallback
            lng: isNaN(lng) ? 0 : lng, // Use parsed longitude or 0 as a fallback
          },
        };
      });
      setChargerLocations(locations);
      console.log("Charger Locations:", locations);
    };

    fetchChargerLocations();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Handle the position data here, if needed
          const { latitude, longitude } = position.coords;
          console.log("User's location:", latitude, longitude);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {/* No <Router> component here since it's already declared at a higher level in your app */}
      
     
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/homepage"
          element={<HomePage chargerLocations={chargerLocations} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myprofile" element={<MyProfile />} />

      
      </Routes>
    </LocationContext.Provider>
  )
  
}

export default App;
