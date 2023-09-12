import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { setCookie } from 'nookies';
import { setup } from '../lib/csrf';


const SignInForm: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { userName, password };
      const response = await fetch(`/api/auth/token_signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      if (response.status === 404) {
        window.alert("Wrong username or password");
      } else {
        /*const token = await response.json();
        setCookie(null, 'loggedUser', JSON.stringify(token), {
          maxAge: 7200, // Cookie expiration time in seconds (e.g., 2 hours)
          path: '/', 
        });*/
        await Router.push("/");
      }
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <Layout>
      <div className="signin-container">
        <form onSubmit={submitData}>
          <h1>Log In</h1>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              type="text"
              value={userName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              value={password}
            />
          </div>
          <input
            disabled={!userName || !password}
            type="submit"
            value="Sign In"
          />
          <br />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .signin-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        form {
          width: 400px;
          padding: 2rem;
          background-color: #f1f1f1;
          border-radius: 5px;
        }

        h1 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        label {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        input {
          padding: 0.5rem;
          border-radius: 3px;
          border: 1px solid #ccc;
        }

        input[type="submit"] {
          background-color: #4caf50;
          color: white;
          cursor: pointer;
        }

        input[type="submit"]:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .back {
          margin-top: 1rem;
          text-align: center;
          color: blue;
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps = setup(async () => {
  return { props: {}}
});

export default SignInForm;
