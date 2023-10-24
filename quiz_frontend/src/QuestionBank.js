import "./question.css"
function QuestionBank({title="none",desc,author="none"}) {
  return (
    
      <div className="mx-auto col-12">
        <p>
          <span className="title">Title: {title}</span>
        </p>
        {/* <p>{desc}</p> */}
        <p>Author: {author}</p>
        <div>
          <button className="btn btn-primary">Start</button>
          <button className="btn btn-danger">View</button>
        </div>
      </div>
  );
}

export default QuestionBank;
