import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db, auth } from '../config/firebase';
import "./MyProfile.css";
import "./NavBar.css";
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';

function MyProfile() {
    const [userData, setUserData] = useState(null);
    const [chargers, setChargers] = useState([]);
    const user = auth.currentUser;
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("User Data:", docSnap.data());
            setUserData(docSnap.data());
        } else {
            console.log("No such user document!");
        }
    };

    const fetchUserChargers = async () => {
        const q = query(collection(db, "chargers"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let chargersArray = [];
        querySnapshot.forEach((doc) => chargersArray.push({ id: doc.id, ...doc.data() }));
        setChargers(chargersArray);
    };

    const handleDeleteCharger = async (chargerId) => {
        if (window.confirm("Are you sure you want to delete this charger?")) {
            try {
                await deleteDoc(doc(db, "chargers", chargerId));
                setChargers(chargers.filter(charger => charger.id !== chargerId));
                alert("Charger deleted successfully.");
            } catch (error) {
                console.error("Error deleting charger:", error);
                alert("Failed to delete charger. Please try again.");
            }
        }
    };

    const navigateToAddCharger = () => {
        // Navigate to homepage and trigger the AddCharger modal to open
        navigate('/homepage', { state: { openAddCharger: true } });
    };

    useEffect(() => {
        if (user) {
            fetchUserData();
            fetchUserChargers();
        }
    }, [user]);

    return (
        <div className="myProfileModal">
            <NavBar />
            <div className='myprofile-detail'>
                <b className='profile-header'>My Profile</b>
                <div className='user-detail'>
                    {userData && (
                        <div>                    
                            <h3>User Details:</h3>
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                            <p>Mobile Number: {userData.mobile}</p>                    
                        </div>
                    )}
                </div>

                <div className='wallet-detail'>
                    <h3>Wallet Details:</h3>
                    <p>Wallet Balance: $0.00</p> {/* Replace with dynamic data */}
                    <div className="transactions">
                        <h4>Recent Transactions:</h4>
                        <ul>
                            {/* Map through recent transactions and list them here */}
                            <li>Transaction 1</li>
                            <li>Transaction 2</li>
                            {/* etc */}
                        </ul>
                    </div>
                    <button className="add-funds-button">Add Funds</button>
                    <button className="withdraw-funds-button">Withdraw Funds</button>
                </div>

                <div className='Charger-detail'>
                    <h3>Chargers:</h3>
                    {user && ( // Render only if user exists
                    <button onClick={navigateToAddCharger} className="add-charger-button">Add Charger</button>
                    )}
                    <table>
                        <thead>
                            <tr>
                                <th>Charger</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Charger Type</th>
                                <th>Current Type</th>
                                <th>Parking Availability</th>
                                <th>Port Capacity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chargers.map((charger, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={charger.photos} alt="Charger" style={{ width: '100px', height: '100px' }} /></td>
                                    <td>{charger.name}</td>
                                    <td>{charger.geoLocation}</td>
                                    <td>{charger.chargeType}</td>
                                    <td>{charger.currentType}</td>
                                    <td>{charger.parkingAvailability}</td>
                                    <td>{charger.portCapacity}</td>
                                    <td>
                                        <button className="delete-button" onClick={() => handleDeleteCharger(charger.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                   </table>
                </div>
            </div>  
        </div>
    );
}

export default MyProfile;
