import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Login from "./Login";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  function validateForm() {
    if (name.length === 0) {
      alert('Invalid Form, Name Field can not be empty');
      return false;
    }
     
    if (phone.length === 0) {
      alert('Invalid Form, Phone Number can not be empty');
      return false;
    }
    
    if (email.length === 0) {
      alert('Invalid Form, Email Address can not be empty');
      return false;
    }
    
    if (password.length < 8) {
      alert('Invalid Form, Password must contain greater than or equal to 8 characters.');
      return false;
    }
    
    let countUpperCase = 0;
    let countLowerCase = 0;
    let countDigit = 0;
    let countSpecialCharacters = 0;

    for (let i = 0; i < password.length; i++) {
      const specialChars = [
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '_',
        '-',
        '+',
        '=',
        '[',
        '{',
        ']',
        '}',
        ':',
        ';',
        '<',
        '>',
      ]

      if (specialChars.includes(password[i])) {
        countSpecialCharacters++;
      } else if (!isNaN(password[i] * 1)) {
        countDigit++;
      } else {
        if (password[i] === password[i].toUpperCase()) {
          countUpperCase++;
        }
        if (password[i] === password[i].toLowerCase()) {
          countLowerCase++;
        }
      }
    }

    if (countLowerCase === 0) {
      alert('Invalid Form, 0 lowercase characters in the password');
      return false;
    }

    if (countUpperCase === 0) {
      alert('Invalid Form, 0 uppercase characters in the password');
      return false;
    }

    if (countDigit === 0) {
      alert('Invalid Form, 0 digit characters in the password');
      return false;
    }

    if (countSpecialCharacters === 0) {
      alert('Invalid Form, 0 special characters in the password');
      return false;
    }

    return true;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      setFlag(false);
      localStorage.setItem("sanskarEmail", JSON.stringify(email));
      localStorage.setItem("sanskarPassword", JSON.stringify(password));
      console.log("Saved in Local Storage");

      setLogin(!login);
    } else {
      setFlag(true);
    }
  }

  function handleClick() {
    setLogin(!login);
  }

  return (
    <div>
      {login ? (
        <form onSubmit={handleFormSubmit}>
          <h3>Register</h3>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Full Name"
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone No.</label>
            <input
              type="phone"
              className="form-control"
              placeholder="Enter contact no"
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-danger btn-lg btn-block">
            Register
          </button>
          <p onClick={handleClick} className="forgot-password text-right">
            Already registered?<b>Log in</b>
          </p>
          {flag && (
            <Alert color="primary" variant="danger">
              All Fields are required and must be valid. Please enter valid information.
            </Alert>
          )}
        </form>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Registration;
