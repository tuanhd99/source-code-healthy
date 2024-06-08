import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
// import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";

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
      <div className="login-background">
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
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">
              {/* <FormattedMessage id="home-login.login" /> */}
            </div>
            <div className="col-12 from-group login-input">
              <label>
                {/* <FormattedMessage id="home-login.emailname" /> */}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                // {
                //   <FormattedMessage id="home-login.enter_your_name" />
                // }
                value={this.state.username}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="col-12 from-group login-input">
              <label>
                <FormattedMessage id="home-login.password" />
              </label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  // {
                  //   <FormattedMessage id="home-login.enter_your_password" />
                  // }
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                ></input>
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye showHide"
                        : "fas fa-eye-slash showHide"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div
              className="col-12"
              style={{ color: "red", fontFamily: "Georgia, serif" }}
            >
              {this.state.message}
            </div>
            <div className="col-12 ">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                <FormattedMessage id="home-login.sign_in" />
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">
                <FormattedMessage id="home-login.Forgot_your_password" />
              </span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login">
                <FormattedMessage id="home-login.or_login_with" />
              </span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-facebook facebook"></i>
              <i className="fab fa-google-plus google"></i>
              <i className="fab fa-twitter twitter"></i>
            </div>
          </div>
        </div>
      </div>
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
