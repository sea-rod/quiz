import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import "./Form.css";
function SignUpForm() {
  const [form, setform] = useState({
    usr: "",
    email: "",
    passwd: "",
    passwd2: "",
  });

  const navigate = useNavigate();
  // const [token, settoken] = useState(""); TODO
  const [toggle, settoggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("hehe lol");
  const change_form_data = (event) => {
    const { name, value } = event.target;
    setform({
      ...form,
      [name]: value,
    });
  };

  const signin = () => {
    console.log(form.usr);
    const apiUrl = "http://127.0.0.1:8000/accounts/signup/";
    const requestData = {
      username: form.usr,
      password: form.passwd,
      password2: form.passwd2,
      is_quizer: true,
    };
    axios
      .post(apiUrl, requestData)
      .then((response) => {
        console.log("Response:", response.data); //TODO: remove later
        setSuccessMessage("Successfully Created User");
        setErrorMessage("");
        settoggle(!toggle);
        setTimeout(() => {
          console.log("After 2 seconds");
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        let msg = "";
        Object.keys(error.response.data).forEach((data) => {
          console.log(`${data}:${error.response.data[data]}`);
          error.response.data[data].forEach((dataMsg) => {
            msg += `${dataMsg}`;
          });
        });
        setErrorMessage(msg);
        console.error("Error:", error.response.data); //TODO remove this later
      });
  };

  const dummy = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="m-0 container-fluid pt-3 d-flex justify-content-center align-items-center bg-sccess px-0">
        <div className="d-flex w-100 justify-content-center align-items-lg-center">
          <div className="col-12 my-auto col-lg-4 col-sm-10 col-md-6 px-5 pt-3 pb-5 mt-5">
            <form>
              <h1 className="text-center mb-3">Register</h1>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="user"
                  placeholder="Username"
                  name="usr"
                  value={form.usr}
                  onChange={change_form_data}
                  className="form-control"
                />
                <label htmlFor="user" className="form-label">
                  Username
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  id="passwd"
                  name="passwd"
                  value={form.passwd}
                  onChange={change_form_data}
                  className="form-control"
                  required
                />
                <label htmlFor="passwd" className="form-label">
                  Password
                </label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  placeholder="Password"
                  id="passwd2"
                  name="passwd2"
                  value={form.passwd2}
                  onChange={change_form_data}
                  className="form-control"
                />
                <label htmlFor="passwd2" className="form-label">
                  Re-Type Password
                </label>
              </div>
              {errorMessage && (
                <span style={{ color: "red" }}>
                  <div class="alert alert-danger mt-4">
                    <strong>{errorMessage}</strong>
                  </div>
                </span>
              )}
              <input
                type="button"
                value={"Login"}
                onClick={signin}
                className="btn btn-blue mt-4 col-12"
                required
              />
            </form>
          </div>
        </div>
        <ToastContainer
          className="p-3"
          position={"bottom-end"}
          style={{ zIndex: 1 }}
        >
          <Toast
            show={toggle}
            onClose={() => settoggle(!toggle)}
            bg="success"
            delay={2000}
            autohide
          >
            <Toast.Header>
              {/* <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              /> */}
              <span style={{ fontWeight: "bold" }} className="me-auto">
                Success
              </span>
              <span>Now</span>
            </Toast.Header>
            <Toast.Body>{successMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export default SignUpForm;
