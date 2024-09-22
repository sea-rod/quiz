import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

function Question({pk, id, question, option,handleOnChange }) {
  const handleChange = (event) => {
    handleOnChange(pk, event.target.value);
  };

  return (
    <div className="mx-auto col-12" id={`question-${id}`}>
      <p className="question">
        Q{id + 1}:{question}
      </p>
      <div className="form-chec py-0">
        {option.map((val, i) => {
          return (
            <Form.Check
              key={i}
              type="radio"
              id={`default-${i}`}
              label={val}
              value={val}
              name={`input-${id}`}
              onChange={handleChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Question;
