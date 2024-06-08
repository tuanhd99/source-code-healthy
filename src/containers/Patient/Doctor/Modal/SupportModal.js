import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./SupportModal.scss";
import zaloQr from "../../../../assets/zaloQr2.jpg";
class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language, isOpen, closeBookingModal } = this.props;

    return (
      <>
        <Modal
          isOpen={isOpen}
          className={"booking-modal-container"}
          size="md"
          centered
          backdrop={true}
        >
          <div className="container-support">
            <div className="item_2">
              <span className="right" onClick={closeBookingModal}>
                <i className="fas fa-times"></i>
              </span>
              <img
                // src="https://umc.medpro.com.vn/static/media/qrmed.f0bb2880.jpg"
                src={zaloQr}
                alt="qr_code"
              ></img>
              <h4 style={{ fontSize: "15px", marginTop: "-50px" }}>
                Số điện thoại hỗ trợ : 19008198
              </h4>
            </div>
          </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
