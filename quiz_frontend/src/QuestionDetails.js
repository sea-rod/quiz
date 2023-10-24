import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";
import "./question.css";

function QuestionDetails() {
  const { id } = useParams();
  const [data, setdata] = useState([]);

  useEffect(() => {
    const url = `http://127.0.0.1:8000/quiz/${id}/questions/`;
    axios
      .get(url)
      .then((response) => {
        console.log("Response:", response.data); //TODO: remove later
        setdata(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.log("error");
      });
    console.log("kkk");
  }, []);

  const submit = () => {
    let element = document.getElementsByName("question-1");
    element.forEach((val) => {
      if (val.checked) console.log(val.id);
    });
    console.log(element);
  };

  return (
    <div id="questionbank" className="d-flex flex-column col-12 container">
      {data.map((val, i) => {
        return (
          <Question
            id={i}
            key={i}
            question={val.question}
            option={Object.values(val.options)}
          />
        );
      })}
      {/* <Question question={data[0]?data[0].question:""} option={data[0]?Object.values(data[0].options):{}} /> */}
      <button onClick={submit}>submit</button>
    </div>
  );
}

export default QuestionDetails;
