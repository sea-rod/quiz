import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
function Question({ id, question, option }) {
  return (
    <div className="mx-auto col-12" id={`question-${id}`}>
      <p className="question">Q1:{question}</p>
      <div className="form-check py-0">
        {option.map((val, i) => {
          return (
            <Form.Check
              key={i}
              type="radio"
              id={`default-${i}`}
              label={val}
              name={`input-${id}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Question;
