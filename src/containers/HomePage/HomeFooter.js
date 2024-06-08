import React, { Component } from "react";
import { connect } from "react-redux";
// import "../HomePage/HomeFooter.scss";
import "./Footer.scss";
import logo from "../../../src/assets/logo3.jpg";
import { withRouter } from "react-router-dom";

class HomeFooter extends Component {
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <>
        {/* <div className="home-footer">
          <p>
            &copy; 2022 DODINHTUAN.{" "}
            <a target="blank" href="https://github.com/tuanhd99">
              More information
            </a>
          </p>
        </div> */}
        <section id="footer">
          <div className="container">
            <div className="row text-center text-xs-center text-sm-left text-md-left">
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="header-logo">
                  <img
                    src={logo}
                    alt=""
                    onClick={() => this.returnToHome()}
                  ></img>
                </div>
                <div className="list-unstyled quick-links">
                  <div
                    className="title-text"
                    style={{
                      color: "white",
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    Công ty cổ phần HEALTY CARE
                  </div>
                  <div className="phoneNumber" style={{ color: "white" }}>
                    Số điện thoại liên hệ : 0377234782
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Về chúng tôi : </h5>
                <ul className="list-unstyled quick-links">
                  <li>
                    <a href="javascript:void();">
                      <i className="fa fa-angle-double-right"></i>
                      Liên hệ hợp tác
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void();">
                      <i className="fa fa-angle-double-right"></i>
                      Câu hỏi thường gặp
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void();">
                      <i className="fa fa-angle-double-right"></i>
                      Chính sách bảo mật
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void();">
                      <i className="fa fa-angle-double-right"></i>Quy chế hoạt
                      động
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void();">
                      <i className="fa fa-angle-double-right"></i>
                      Hỗ trợ khách hàng
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Liên hệ</h5>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Message
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <button className="submit">Send</button>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                <ul className="list-unstyled list-inline social text-center">
                  <li className="list-inline-item">
                    <a href="javascript:void();">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="javascript:void();">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="javascript:void();">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="javascript:void();">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="javascript:void();" target="_blank">
                      <i className="fa fa-envelope"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <hr></hr>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                <p className="h6">
                  &copy; 2022 DODINHTUAN.{" "}
                  <a target="blank" href="https://github.com/tuanhd99">
                    More information
                  </a>
                </p>
              </div>
              <hr></hr>
            </div>
          </div>
        </section>
      </>
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
);
