import "./Form.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const refreshAuthToken = async (refreshToken) => {
    try {
      const response = await axios.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      const newAccessToken = response.data.token;
      return newAccessToken;
    } catch (error) {
      // Handle error (e.g., token refresh failure)
      throw error;
    }
  };

  const [form, setForm] = useState({ user: "", passwd: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const change_form_data = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
//TODO: 
  // useEffect(() => {
  //   console.log("saved token");
  // }, []);     

  const get_token = () => {
    console.log(form.user);
    const apiUrl = "http://127.0.0.1:8000/api/token/";
    const requestData = {
      username: form.user,
      password: form.passwd,
    };
    axios
      .post(apiUrl, requestData)
      .then((response) => {
        console.log("Response:", response.data);
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        navigate("/");
        let event = new Event("addedToken");
        window.dispatchEvent(event);
      })
      .catch((error) => {
        let msg = "";
        Object.keys(error.response.data).forEach((data) => {
          console.log(`${data}:${error.response.data[data]}`);
          msg += `${data}: ${error.response.data[data]} `;
        });
        setErrorMessage(msg);
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="m-0 container-fluid pt-5 d-flex justify-content-center align-items-center bg-sccess px-0">
        <div className="d-flex w-100 justify-content-center align-items-center bg-dager">
          <div className="col-12 my-auto col-lg-4 col-sm-6 p-5">
            <form>
              <h1 className="text-center mb-5">Welcome Back</h1>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={form.user}
                  autoComplete="true"
                  onChange={change_form_data}
                  placeholder="Username"
                  className="form-control"
                  required
                />
                <label htmlFor="user" className="form-label">
                  Username
                </label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  placeholder="Password"
                  id="passwd"
                  name="passwd"
                  autoComplete="current-password"
                  value={form.passwd}
                  onChange={change_form_data}
                  className="form-control"
                  required
                />
                <label htmlFor="passwd" className="form-label">
                  Password
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
                onClick={get_token}
                type="button"
                value={"Login"}
                className="btn btn-blue mt-5 col-12"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
