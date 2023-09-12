import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitData = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();

      if (!isEmailValid(email)) {
        window.alert("Please enter a valid email address [ ___@___.___ ]");
        return;
      }

      const body = { name, email, userName, password };
      const response = await fetch(`/api/auth/token_signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.status === 403) {
        window.alert(data.message);
      } else if (response.status === 201) {
        window.alert(data.message);
        await Router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="signup-container">
        <form onSubmit={submitData}>
          <h1>Sign Up</h1>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              type="text"
              value={name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              value={email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
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
            value="Sign Up"
          />
          <br />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .signup-container {
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

export default SignUpForm;
