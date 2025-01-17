import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as action from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import LoadingOverlay from "react-loading-overlay";
import moment from "moment";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      genders: "",
      doctorId: "",
      address: "",
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.props.fetchGender();
  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  buildDataBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? this.capitalizeFirstLetter(
              moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
            )
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return "";
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : ` ${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return " ";
  };

  handleConfirmBooking = async () => {
    this.setState({
      isShowLoading: true,
    });
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildDataBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phonenumber: this.state.phoneNumber,
      email: this.state.email,
      reason: this.state.reason,
      // birthday: this.state.birthday,
      selectedGender: this.state.selectedGender.value,
      address: this.state.address,
      date: this.props.dataTime.date,
      birthday: date,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    this.setState({
      isShowLoading: false,
    });

    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed!");
      this.props.closeBookingModal();
    } else {
      toast.error("Booking a new appointment error!");
    }
  };
  render() {
    let { isOpen, closeBookingModal, dataTime, language } = this.props;
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading...."
        >
          <Modal
            isOpen={isOpen}
            className={"booking-modal-container"}
            size="lg"
            centered
            backdrop={true}
          >
            <div className="booking-modal-container">
              <div className="booking-modal-content">
                <div className="booking-modal-header">
                  <span className="left">
                    <FormattedMessage id="patient.booking-modal.title" />
                  </span>
                  <span className="right" onClick={closeBookingModal}>
                    <i className="fas fa-times"></i>
                  </span>
                </div>
                <div className="booking-modal-body">
                  <div className="doctor-infor">
                    <ProfileDoctor
                      doctorId={doctorId}
                      isShowDescriptionDoctor={false}
                      isShowPrice={true}
                      dataTime={dataTime}
                    />
                  </div>
                  <div className="row">
                    <div className="col-6 from-group ">
                      <label>
                        <FormattedMessage id="patient.booking-modal.fullName" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.fullName}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "fullName")
                        }
                      ></input>
                    </div>
                    <div className="col-6 from-group ">
                      <label>
                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.phoneNumber}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "phoneNumber")
                        }
                      ></input>
                    </div>
                    <div className="col-6 from-group ">
                      <label>
                        <FormattedMessage id="patient.booking-modal.email" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.email}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "email")
                        }
                      ></input>
                    </div>
                    <div className="col-6 from-group ">
                      <label>
                        <FormattedMessage id="patient.booking-modal.address" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.address}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "address")
                        }
                      ></input>
                    </div>
                    <div className="col-12 from-group ">
                      <label>
                        <FormattedMessage id="patient.booking-modal.reason" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.reason}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "reason")
                        }
                      ></input>
                    </div>
                    {/* <div className="col-6 from-group ">
                      <label>
                        <FormattedMessage id="patient.booking-modal.phonenumber" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.phoneNumber}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "phonenumber")
                        }
                      ></input>
                    </div> */}
                    <div className="col-6 from-group ">
                      <label>
                        <FormattedMessage id="patient.booking-modal.birthday" />
                      </label>
                      <DatePicker
                        onChange={this.handleOnchangDatePicker}
                        className="form-control"
                        value={this.state.birthday}
                      />
                    </div>
                    <div className="col-6 from-group ">
                      <label>
                        <FormattedMessage id="patient.booking-modal.gender" />
                      </label>
                      <Select
                        value={this.state.selectedGender}
                        onChange={this.handleChangeSelect}
                        options={this.state.genders}
                      />
                    </div>
                  </div>
                </div>
                <div className="booking-modal-footer">
                  <button
                    className="btn-booking-confirm"
                    onClick={() => this.handleConfirmBooking()}
                  >
                    <FormattedMessage id="patient.booking-modal.confirm" />
                  </button>
                  <button
                    className="btn-booking-cancel"
                    onClick={closeBookingModal}
                  >
                    <FormattedMessage id="patient.booking-modal.cancel" />
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </LoadingOverlay>
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
  return {
    fetchGender: () => dispatch(action.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
