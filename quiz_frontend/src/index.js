import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./Main";
import Navbar from "./Navbar";
import QuestionDetails from "./QuestionDetails";
import QuestionList from "./QuestionList";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Result from "./Result";
import Question from "./Question";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignUpForm />} />
        <Route path="questionlist" element={<QuestionList />} />
        <Route path="question/:id/*" element={<QuestionDetails />} />
        <Route path="result/" element={<Result />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
