import React, { Component } from "react";
import { connect } from "react-redux";
import logoApp from "D:/React_JS/src/assets/App.jpg";
import { FormattedMessage } from "react-intl";
class About extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="section-about-header">
            <FormattedMessage id="about.title" />
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="60%"
                height="400px"
                src="https://www.youtube.com/embed/K6bTUoGe-Ig"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <h3>
                <FormattedMessage id="about.download" />
              </h3>
              <img src={logoApp} alt=""></img>
              <div class="lazyload-wrapper ">
                <img src="/static/media/bocongthuong1.ce5cd70e.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
