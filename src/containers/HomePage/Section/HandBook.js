import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllHandBook } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandBook: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandBook();
    console.log("check state from handbook", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataHandBook: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailHandbook = (item) => {
    this.props.history.push(`/detail-handbook/${item.id}`);
  };

  render() {
    let { dataHandBook } = this.state;
    return (
      <div className="section-share section-HandBook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="handbook.typical_handbook" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="handbook.see_more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataHandBook &&
                dataHandBook.length > 0 &&
                dataHandBook.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailHandbook(item)}
                    >
                      <div
                        className="bg-image section-handbook"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      ></div>
                      <div>{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
