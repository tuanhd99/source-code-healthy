import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingInstructions.scss";

import { BsFillAlarmFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { FaUserNurse } from "react-icons/fa";

class BookingInstructions extends Component {
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
    let { language } = this.props;

    return (
      <>
        <div className="booking-instruction">
          <div className="booking-instruction-body">
            <div className="content-header">
              <h1>Tạo sao nên chọn Healthy care?</h1>
              <p>
                Healthy là cơ sở đặt lịch khám bệnh hàng đầu có định hướng kết
                nối bênh nhân,bác sĩ,cơ sở y tế,hỗ trợ đặt lịch khám miễn phí
              </p>
            </div>
            <div className="content-main">
              <div className="">
                <BsFillAlarmFill className="icon" />
                <p className="">Đặt lịch dễ dàng,tiết kiệm thời gian</p>
              </div>
              <div className="">
                <FaUserNurse className="icon" />
                <p className="">Thông tin chính xác,bác sĩ uy tín</p>
              </div>
              <div className="">
                <AiOutlineCheck className="icon" />
                <p className="">Đặt lịch miễn phí 24/7</p>
              </div>
            </div>
            <div className="content-footer">
              <div>
                <h1>Quy trình đăng kí khám bệnh theo hẹn</h1>
                <div className="content1-container">
                  <div className="content-right">
                    <div className="step_1">
                      <h3>
                        <b>Bước 1</b>
                      </h3>
                      <p style={{ color: "#ccc" }}>Đặt lịch khám</p>
                      <ul>
                        <li>Người bệnh vào phần mềm web</li>
                        <li>
                          Chọn hình thức đặt khám,theo chuyên khoa hay theo bác
                          sĩ
                        </li>
                        <li>
                          Chọn thông tin khám,Chuyên khoa,phòng khám,bác sĩ,
                          ngày khám, giờ khám
                        </li>
                      </ul>
                    </div>
                    <div className="step_3">
                      <h3>
                        <b>Bước 3</b>
                      </h3>
                      <p style={{ color: "#ccc" }}>
                        Khám về thực hiện cận lâm sàng
                      </p>
                      <ul>
                        <li>
                          Người bệnh khám tại các phòng khám chuyên khoa theo
                          thông tin đặt lịch
                        </li>
                        <li>
                          Thực hiện khám lâm sàng(nếu có) và đóng phí tại quầy
                          thu ngân
                        </li>
                        <li>
                          Khi có kết quả lâm sàng, người bệnh quay lại phòng
                          khám gặp Bác sĩ để nhận đơn thuốc
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="content-left">
                    <div className="step_2">
                      <h3>
                        <b>Bước 2</b>
                      </h3>
                      <p style={{ color: "#ccc" }}>Xác nhận theo lịch hẹn</p>
                      <ul>
                        <li>
                          Sau khi đặt lịch thành công sẽ gửi về gmail cá nhân
                        </li>
                        <ul>
                          Đến ngày khám
                          <li>
                            Người bệnh sẽ tới trực tiếp tới phòng khám trước giờ
                            hẹn 15-30 phút để khám bệnh
                          </li>
                        </ul>
                      </ul>
                    </div>
                    <div className="step_4">
                      <h3>
                        <b>Bước 4</b>
                      </h3>
                      <p style={{ color: "#ccc" }}>
                        Nhận thuốc và kết quả khám
                      </p>
                      <ul>
                        <li>
                          Đến nhà thuốc A hoặc B mua thuốc và thanh toán tiền
                          thuốc tại quầy
                        </li>
                        <li>
                          Đồng thời sẽ nhận hoá đơn và kết quả khám qua gmail cá
                          nhân
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingInstructions);
