import {
  Route,
  useParams,
  Routes,
  BrowserRouter,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "./services/axios";
import QuestionListOfLinks from "./QuestionListOfLinks";
import Question from "./Question";
import "./question.css";

function QuestionDetails() {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answer, setAnswer] = useState(new Map());
  const [start, setStart] = useState(false);

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

  const onStartClick = () => {
    setStart(true);
  };

  return (
    <div id="questionbank" className="d-flex flex-column col-12 container p-5">
      {start ? (
        <>
          <QuestionListOfLinks links={data} />
          <Routes>
            {data.map((val, i) => {
              return (
                <Route
                  path={`quest/${i + 1}`}
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
          <div style={{ backgroundColor: "transparent" }}>
            <button className="btn btn-primary my-5 col-5" onClick={submit}>
              submit
            </button>
          </div>
        </>
      ) : (
        <Link to={"quest/1"}>
          <button className="btn btn-primary" onClick={onStartClick}>Start Test</button>
        </Link>
      )}
    </div>
  );
}

export default QuestionDetails;
