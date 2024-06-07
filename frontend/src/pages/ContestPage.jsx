import React, { useEffect, useState } from "react";

const ContestPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user"); // Adjust URL as per your server configuration
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);

  return (
    <div>
      <h2>User Data:</h2>
      {userData ? (
        <ul>
          <li>Name: {userData.name}</li>
          <li>Age: {userData.age}</li>
          <li>Email: {userData.email}</li>
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ContestPage;
