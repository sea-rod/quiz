import { useEffect, useState } from "react";
import axios from "axios";
import QuestionBank from "./QuestionBank";
import { Link } from "react-router-dom";
function QuestionList() {
  const [errorMsg, seterrorMsg] = useState();
  const [data, setdata] = useState([]);
    useEffect(() => {
    const apiUrl = "http://127.0.0.1:8000/quiz/questionsbank/";
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Response:", response.data); //TODO: remove later
        setdata(response.data)
        data.map((v)=>{
            console.log(v.name,v.user);
            return 0;
        })
      })
      .catch((error) => {
        console.log(error);
        seterrorMsg(error.message);
      });
  },[]);
  return (
    <>
      <div id="questionbank" className="d-flex flex-column col-12 container">
        {data.map((value,i)=>{
          return (
            <Link to={`/question/${i}`} className="p-0 col-md-10 col-12 mx-auto">
              <QuestionBank key={i} title={value.name} author={value.user} />
            </Link>
          );
        })}
        {errorMsg && <p>{errorMsg}</p>}
      </div>
    </>
  );
}

export default QuestionList;
