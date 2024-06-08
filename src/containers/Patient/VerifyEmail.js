import React, { Component } from "react";
import { connect } from "react-redux";
// import { LANGUAGES } from "../../../utils";
// import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/HomeHeader";
import { postVerifyBookAppointment } from "../../services/userService";
import "./VerifyEmail.scss";
import HomeFooter from "../HomePage/HomeFooter";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");

      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    // let { language } = this.props;
    let { statusVerify, errCode } = this.state;

    return (
      <>
        <HomeHeader />
        <div
          className="verify-email-container"
          style={{ marginTop: "70px", marginBottom: "200px" }}
        >
          {statusVerify === false ? (
            <div>Loading data</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="title-succeed">
                  <h2 className="title">Xác nhận lịch hẹn thành công</h2>
                  <span className="title-left">Healthy care </span>
                  <span className="title-right">
                    rất vui và vinh hạnh được phục vụ quý khách hàng, cảm ơn bạn
                    đã tin tưởng và ủng hộ cho chúng tôi
                  </span>
                </div>
              ) : (
                <div className="title-faild">
                  Lịch hẹn của bạn dã được xác thực,xin chân thành cảm ơn !
                </div>
              )}
            </div>
          )}
        </div>
        <HomeFooter />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
