import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { parseCookies } from 'nookies'; 

const Profile: React.FC = () => {
  const userLogged = useRef<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cookies = parseCookies();
    const loggedUser = cookies.loggedUser;
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      userLogged.current = user;
    }
    setLoading(false);
  }, []);

  if (!isLoading) {
    return (
      <Layout>
        <div className="profile-container">
          <h1>Profile Page</h1>
          {userLogged.current && (
            <div className="user-info">
              <p>
                <strong>Name:</strong> {userLogged.current.name}
              </p>
              <p>
                <strong>Username:</strong> {userLogged.current.userName}
              </p>
              <p>
                <strong>Email:</strong> {userLogged.current.email}
              </p>
            </div>
          )}
        </div>
        <style jsx>{`
          .profile-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          h1 {
            text-align: center;
            margin-bottom: 2rem;
          }

          .user-info {
            width: 400px;
            padding: 2rem;
            background-color: #f1f1f1;
            border-radius: 5px;
          }

          .user-info p {
            margin-bottom: 1rem;
          }

          strong {
            font-weight: bold;
          }
        `}</style>
      </Layout>
    );
  }

  return null;
};

export default Profile;
