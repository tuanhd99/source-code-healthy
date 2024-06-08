import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
// import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import Logo from "../../../src/assets/logo3.jpg";
import "./Login1.scss";

// import {userLoginSuccess} from "../../store/actions/userActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      message: "",
    };
  }

  handleOnChangeInput = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      message: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);

      if (data && data.errCode !== 0) {
        this.setState({
          message: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            message: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleLauguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    let language = this.props.language;
    //jsx
    return (
      <section class="h-100 gradient-form" style={{ background: "" }}>
        <div className="change_language">
          <div
            className={
              language === LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
          >
            <span onClick={() => this.handleLauguage(LANGUAGES.VI)}>
              <img src="https://flagcdn.com/vn.svg" width="30px" alt="VI" />
            </span>
          </div>
          <div
            className={
              language === LANGUAGES.EN ? "language-en active" : "language-en"
            }
          >
            <span onClick={() => this.handleLauguage(LANGUAGES.EN)}>
              <img src="https://flagcdn.com/gb-eng.svg" width="30px" alt="EN" />
            </span>
          </div>
        </div>
        <div class="container py-1 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100 ">
            <div class="col-xl-10 pb-5 mb-5 ">
              <div
                class="card rounded-3 text-black "
                style={{ marginTop: "-25px" }}
              >
                <div class="row g-0">
                  <div class="col-lg-6">
                    <div class="card-body p-md-5 mx-md-4">
                      <div class="text-center">
                        <img
                          className="pb-4"
                          src={Logo}
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h3 class="mt-1 mb-5 pb-1 ">Welcome to Healthy care</h3>
                      </div>

                      <form>
                        <p className="text-black">
                          Please login to your account
                        </p>

                        <div class="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example11"
                            class="form-control"
                            placeholder="Enter your email address"
                            value={this.state.username}
                            onChange={(event) =>
                              this.handleOnChangeInput(event)
                            }
                          />
                          <label
                            class="form-label"
                            for="form2Example11"
                            style={{ color: "black", paddingTop: "5px" }}
                          >
                            Username
                          </label>
                        </div>

                        <div class="form-outline mb-4">
                          <input
                            type={
                              this.state.isShowPassword ? "text" : "password"
                            }
                            id="form2Example22"
                            class="form-control"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={(event) =>
                              this.handleOnChangePassword(event)
                            }
                            onKeyDown={(event) => this.handleKeyDown(event)}
                          />
                          <span onClick={() => this.handleShowHidePassword()}>
                            <i
                              className={
                                this.state.isShowPassword
                                  ? "fas fa-eye showHide"
                                  : "fas fa-eye-slash showHide"
                              }
                              style={{
                                float: "right",
                                marginTop: "-20px",
                                marginRight: "10px",
                              }}
                            ></i>
                          </span>
                          <label
                            class="form-label"
                            for="form2Example22"
                            style={{ color: "black", paddingTop: "5px" }}
                          >
                            Password
                          </label>
                        </div>
                        <div
                          style={{ color: "red", fontFamily: "Georgia, serif" }}
                        >
                          {this.state.message}
                        </div>

                        <div class="text-center pt-1 mb-5 pb-1">
                          <button
                            class="btn btn-outlin-none btn-block fa-lg gradient-custom-2 mb-3 pt-2 pb-2 "
                            type="button"
                            onClick={() => this.handleLogin()}
                          >
                            Log in
                          </button>
                          <a class="text-black " href="#!">
                            Forgot password?
                          </a>
                        </div>

                        {/* <div class="d-flex align-items-center justify-content-center pb-4">
                          <p class="mb-0 me-2">Don't have an account?</p>
                          <button type="button" class="btn btn-outline-danger">
                            Create new
                          </button>
                        </div> */}
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-6 d-flex align-items-center ">
                    <div class=" mx-md-4">
                      <img
                        src="https://images.unsplash.com/photo-1642050923713-c48db6ea4bec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt="image_login"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
