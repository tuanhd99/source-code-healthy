import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailHandbook.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailHandbookById } from "../../../services/userService";
import _ from "lodash";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currenDoctorId: id,
      });
      let res = await getDetailHandbookById({
        id: id,
      });
      console.log("check res from handbook", res);
      this.setState({
        dataHandbook: res.data,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language } = this.props;
    let { dataHandbook } = this.state;

    return (
      <>
        <HomeHeader />
        <div className="detail-handbook-handbook">
          <div className="description-handbook" style={{ marginTop: "70px" }}>
            {dataHandbook && !_.isEmpty(dataHandbook) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataHandbook.descriptionHTML,
                }}
              ></div>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
