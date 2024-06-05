// GoogleMaps.js
import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { StandaloneSearchBox } from '@react-google-maps/api';
import LocationContext from './LocationContext'; 
import "./GoogleMaps.css";

const mapStyles = {
    height: "80vh",
    width: "100%" // Changed to 100% to use full width of the container
};

const defaultCenter = { lat: 40.756795, lng: -73.954298 }; // Default location

const libraries = ["places"];

function MapComponent({ updateSelectedLocation, chargerLocations, openFindCharger, isAuthenticated, currentUser}) {
    const [center, setCenter] = useState(null);
    const [chargerMarkers, setChargerMarkers] = useState([]);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [hoveredMarkerPosition, setHoveredMarkerPosition] = useState(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false); // new state to track script load    

      // Inside Marker onClick handler
    const markerClickHandler = () => {
        if (currentUser) {
        openFindCharger(); // Open FindCharger only if a user is logged in
        } else {
        alert("Please sign in to view charger details."); // Alert for guest users
        }
    };

    const onMarkerMouseOver = (marker, position) => {
        setHoveredMarker(marker);
        setHoveredMarkerPosition(position);
      };
      
      const onMarkerMouseOut = () => {
        setHoveredMarker(null);
        setHoveredMarkerPosition(null);
      };
      

    
    const mapRef = useRef(null);
    const searchBoxRef = useRef(null);

    const { selectedLocation, setSelectedLocation } = useContext(LocationContext);

    const getMarkerColor = (portCapacity) => {
        const capacity = parseFloat(portCapacity);
        if (capacity >= 60) return '#fc0800'; // red
        if (capacity >= 50) return '#fc3200'; // dark orange
        if (capacity >= 25) return '#fc8f00'; // orange
        if (capacity >= 12) return '#fcd600'; // gold (light orange)
        if (capacity >= 7.5) return '#fcf800'; // dark yellow
        if (capacity >= 3.3) return '#c5fc00'; // yellow
        return '#0043fc'; // Default color if no match (gray)
    };
    
      

    useEffect(() => {
        if (chargerLocations && Array.isArray(chargerLocations) && isScriptLoaded) {
            const newChargerMarkers = chargerLocations.map((charger, index) => {
                // Check if geoLocation is already an object with lat and lng properties
                if (charger.geoLocation && typeof charger.geoLocation === 'object') {
                    const { lat, lng } = charger.geoLocation;
    
                    const markerColor = getMarkerColor(charger.portCapacity);
                    const icon = {
                        //url: '/Charger-trans-plain.png', // Relative path from the public directory
                        scaledSize: new window.google.maps.Size(50, 50), // Size in pixels 
                        path: google.maps.SymbolPath.CIRCLE = 3,
                        fillColor: markerColor,
                        fillOpacity: 1,
                        scale: 10, // Size of the marker
                        strokeColor: 'black',
                        strokeWeight: 1,
                    };
    
                    return {
                        position: { lat, lng },
                        icon: icon,    
                        chargerName:charger.chargerName,                    
                        key: charger.id || index,
                        portType: charger.portType,
                        portCapacity: charger.portCapacity,
                    };
                } else {
                    console.warn(`Invalid or missing geoLocation for charger at index ${index}`);
                    return null; // Return null for invalid entries
                }
            }).filter(marker => marker !== null); // Filter out any invalid entries
    
            setChargerMarkers(newChargerMarkers);
            console.log('Charger Markers:', newChargerMarkers);
        }
    }, [chargerLocations, isScriptLoaded]);
    
    
      

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setCenter({ lat: latitude, lng: longitude });
            }, () => {
                console.log("Error getting the current position. Using default location.");
                setCenter({ lat: 18, lng: 73 });  // Fall back to static location
            });
        } else {
            console.log("Geolocation is not available. Using default location.");
            setCenter({ lat: 18, lng: 73 });  // Fall back to static location
        }
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            chargerMarkers.forEach(marker => {
                bounds.extend(marker.position);
            });

            if (!bounds.isEmpty()) {
                mapRef.current.fitBounds(bounds);
            } else {
                mapRef.current.setCenter(center);
                mapRef.current.setZoom(15);
            }
        }
    }, [chargerMarkers, center]);

    const onMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelectedLocation({ lat, lng });
        if (updateSelectedLocation) {
            updateSelectedLocation({ lat, lng });
        }
    };
    
    const onPlacesChanged = () => {
        const places = searchBoxRef.current.getPlaces();
        if (places.length === 0) {
            return;
        }
        const place = places[0];
        if (!place.geometry || !place.geometry.location) {
            return;
        }
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedLocation({ lat, lng });
        setCenter({ lat, lng });
    };
    
    const recenterMap = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCenter({ lat: latitude, lng: longitude });
                mapRef.current.setCenter({ lat: latitude, lng: longitude });
            },
            () => {
                console.log("Error: The Geolocation service failed.");
                setCenter(defaultCenter);
                mapRef.current.setCenter(defaultCenter);
            }
        );
    };


    return (
        <LocationContext.Provider value={{selectedLocation, setSelectedLocation }}>
            <LoadScript
                googleMapsApiKey='AIzaSyAz-yCiSKYP_dkoNaQy5vhi-r3w6Bcyuhg' // Please use your actual API key
                libraries={libraries}
                onLoad={() => setIsScriptLoaded(true)}
            >
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    center={center}
                    zoom={10}
                    onClick={onMapClick}
                    onLoad={mapInstance => {
                        mapRef.current = mapInstance;
                    }}
                >
                    {isScriptLoaded && chargerMarkers.map(marker => (
                        <Marker
                        key={marker.key}
                        position={marker.position}
                        icon={marker.icon}
                        onClick={markerClickHandler} 
                        onMouseOver={() => onMarkerMouseOver(marker, marker.position)}
                        onMouseOut={onMarkerMouseOut}
                    >
                        {hoveredMarker === marker && isAuthenticated &&(
                            <InfoWindow
                                position={hoveredMarkerPosition}
                                onCloseClick={onMarkerMouseOut}
                            >
                                <div className="info-window-content"> {/* Add the CSS class */}
                                    <p className="port-capacity">Port Capacity: {marker.portCapacity}</p>
                                    <p className="port-type">Port Type: {marker.portType}</p>                                    
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                    
                        
                    ))}
                    <StandaloneSearchBox
                        onLoad={ref => searchBoxRef.current = ref}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search places..."
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                marginTop: `10px`,
                                marginLeft: `12px`,
                            }}
                        />
                    </StandaloneSearchBox>
                    {selectedLocation && (
                        <Marker
                            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                            onClick={() => setSelectedLocation(null)} // You can handle marker click events
                        />
                        
                    )}
                </GoogleMap>
                <button onClick={recenterMap} className="recenter-button">
                    Recenter
                </button>    
            </LoadScript>
        </LocationContext.Provider>
    );
}
export default MapComponent;


