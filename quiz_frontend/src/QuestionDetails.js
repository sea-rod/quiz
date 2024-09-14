import {
  Route,
  useParams,
  Routes,
  BrowserRouter,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "./services/axios";
import Question from "./Question";
import "./question.css";

function QuestionDetails() {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answer, setAnswer] = useState(new Map());

  useEffect(() => {
    const url = `quiz/${id}/questions/`;
    axiosInstance
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
    console.log(answer, "kk");

    const url = "http://127.0.0.1:8000/result/";
    const form = {
      question_bank: id,
      solved: [...answer.values()],
    };
    console.log(form);

    axiosInstance.post("result/", form).then((response) => {
      console.log("Response:", response.data); //TODO: remove later
      // setdata(response.data);
      // console.log(data);
    });
    console.log(selectedOptions);
  };

  const handleOptionChange = (questionId, selectedOption) => {
    // setVisted(new Set([...visted, questionId]));
    // console.log("visted", visted);

    setAnswer(
      (prevState) =>
        new Map([
          ...prevState,
          [
            questionId,
            {
              question: String(questionId),
              chose_ans: selectedOption,
            },
          ],
        ])
    );
  };
  return (
    <div id="questionbank" className="d-flex flex-column col-12 container p-5">
      {/* <BrowserRouter> */}
      {data.map((val, i) => {
        return <Link to={`quest/${val.id}`}>{`quest ${i+1}`}</Link>;
      })}
      <Routes>
        {data.map((val, i) => {
          return (
            <Route
              path={`quest/${val.id}`}
              element={
                <Question
                  id={i}
                  pk={val.id}
                  key={i}
                  question={val.question}
                  option={Object.values(val.options)}
                  handleOnChange={handleOptionChange}
                />
              }
            />
          );
        })}
      </Routes>
      {/* </BrowserRouter> */}
      {/* <Question question={data[0]?data[0].question:""} option={data[0]?Object.values(data[0].options):{}} /> */}
      <div style={{ backgroundColor: "transparent" }}>
        <button className="btn btn-primary my-5 col-5" onClick={submit}>
          submit
        </button>
      </div>
    </div>
  );
}

export default QuestionDetails;
