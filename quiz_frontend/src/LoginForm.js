import "./Form.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./services/axios";

function LoginForm() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });
  const [formData, updateForm] = useState(initialFormData);
  const handleChange = (e) => {
    console.log("ll");
    
    updateForm({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const [error, seterror] = useState(null);
  const handleSubmit = () => {
    console.log("submit btn clicked", formData);
    axiosInstance
      .post("api/token/", {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");
        navigate("/");
        let event = new Event("addedToken");
        // toast.success("Login Successful !");
        window.dispatchEvent(event);
      })
      .catch((error) => {
        seterror(error.response.data.detail);
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
                  name="username"
                  value={formData.user}
                  autoComplete="true"
                  onChange={handleChange}
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
                  name="password"
                  autoComplete="current-password"
                  value={formData.passwd}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                <label htmlFor="passwd" className="form-label">
                  Password
                </label>
              </div>
              {error && (
                <span style={{ color: "red" }}>
                  <div class="alert alert-danger mt-4">
                    <strong>{error}</strong>
                  </div>
                </span>
              )}
              <input
                onClick={handleSubmit}
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
