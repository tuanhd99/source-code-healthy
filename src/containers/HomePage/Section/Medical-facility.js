import React, { Component } from "react";
import { connect } from "react-redux";
import "./Medical-facility.scss";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };
  render() {
    let { dataClinics } = this.state;
    return (
      <>
        <div className="section-share section-medical-facilty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="medical-facilty.Outstanding medical facility" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="medical-facilty.see_more" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <div
                        className="section-customize clinic-child"
                        key={index}
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <div
                          className="bg-image section-medical-facilty"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="clinic-name">{item.name}</div>
                      </div>
                    );
                  })}
              </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
