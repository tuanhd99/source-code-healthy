import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import "./RemedyModal.scss";
import { CommonUtils } from "../../../utils";
// import { toast, ToastType } from "react-toastify";
// import { FormattedMessage } from "react-intl";
// import moment from "moment";
class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnChangsEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    console.log("check state", this.state);
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpen, closeRemedyModal, dataModal, language, sendRemedy } =
      this.props;
    return (
      <>
        <Modal
          isOpen={isOpen}
          className={"booking-modal-container"}
          size="md"
          centered
          backdrop={true}
        >
          {/* <ModalHeader toggle={isOpen}>Gui hoa don kham benh</ModalHeader> */}
          <div className="header">
            <div className="content-left">Gui hoa don</div>
            <div className="contenr-right">
              <i
                className="fa fa-times"
                aria-hidden="true"
                onClick={closeRemedyModal}
              ></i>
            </div>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Email benh nhan</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangsEmail(event)}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Chon file don thuoc</label>
                <input
                  className="form-control-file"
                  type="file"
                  onChange={(event) => this.handleOnchangeImage(event)}
                ></input>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRemedy()}>
              Send
            </Button>
            <Button color="secondary" onClick={closeRemedyModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
