import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HomeHeader.scss";
import "./HomHeader.scss";
import { FormattedMessage } from "react-intl";
// import logo from "../../../src/assets/logo3.jpg";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router-dom";
import SupportModal from "../Patient/Doctor/Modal/SupportModal";
import { FaHandHoldingMedical } from "react-icons/fa";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalBooking: false,
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    // fire redux event : actions
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  handleClickSupport = () => {
    this.setState({
      isOpenModalBooking: !this.state.isOpenModalBooking,
    });
  };
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let language = this.props.language;
    let isOpenModalBooking = this.state.isOpenModalBooking;

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-content">
            <div className="left-logo">
              {/* <i className="fas fa-bars nav-bar"></i> */}
              <FaHandHoldingMedical
                style={{ color: "white", fontSize: "18px" }}
              />

              <div className="header-logo">
                {/* <img
                  src={logo}
                  alt=""
                  onClick={() => this.returnToHome()}
                ></img> */}
                <div
                  style={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    color: "white",
                    marginTop: "15px",
                    fontWeight: "700px",
                    cursor: "pointer",
                  }}
                  onClick={() => this.returnToHome()}
                >
                  HEALTHY CARE
                </div>
              </div>
            </div>
            <div className="center-social-list">
              <div className="child-social">
                <div>
                  <span onClick={() => this.returnToHome()}>
                    {/* <FormattedMessage id="home-header.speciality" /> */}
                    <FormattedMessage id="home-header.home" />
                  </span>
                </div>
              </div>
              <div className="child-social">
                <span>
                  <FormattedMessage id="home-header.book" />
                </span>
              </div>
              <div className="child-social">
                <div>
                  <FormattedMessage id="home-header.Handbook" />
                </div>
              </div>
              <div className="child-social">
                <div>
                  <FormattedMessage id="home-header.community" />
                </div>
              </div>
              {/* <div className="child-social">
                <button className="btn-app" style={{ fontWeight: "400" }}>
                  <FormattedMessage id="home-header.download_App" />
                </button>
              </div> */}
            </div>
            <div className="right-support">
              <div
                className="support text-white"
                onClick={() => this.handleClickSupport()}
              >
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  <img src="https://flagcdn.com/vn.svg" width="30px" alt="VI" />
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  <img
                    src="https://flagcdn.com/gb-eng.svg"
                    width="30px"
                    alt="EN"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="Search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm chuyên khoa khám bệnh"
                />
              </div>
              <div
                className="title-2 "
                style={{ marginTop: "-150px", color: "white" }}
              >
                <FormattedMessage id="home-header.title_center" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                {/* <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">Kham Chuyen Khoa</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">Kham Tong Quat</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-flask"></i>
                  </div>
                  <div className="text-child">Xet nghiem y hoc</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">Suc Khoa tinh than</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child">Kham nha khoa</div>
                </div> */}
              </div>
            </div>
          </div>
        )}
        <SupportModal
          isOpen={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
