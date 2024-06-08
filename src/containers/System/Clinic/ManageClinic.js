import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManageClinic.scss";
import { CommonUtils } from "../../../utils";
import { createClinic } from "../../../services/userService";
import { toast } from "react-toastify";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewClinic = async () => {
    let res = await createClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("succeeds");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("error");
    }
  };
  render() {
    // let { language } = this.props;

    return (
      <>
        <div className="manage-specialty-container">
          <div className="manage-specialty-title"> Quản lí phòng khám</div>
          <div className="add-new-specialty">
            <div className="row">
              <div className="col-6 form-group">
                <label>Tên phòng khám</label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.name}
                  onChange={(event) => this.handleOnchangeInput(event, "name")}
                ></input>
              </div>
              <div className="col-6 from-group">
                <label>Ảnh phòng khám</label>
                <input
                  className="form-control-file"
                  type="file"
                  onChange={(event) => this.handleOnchangeImage(event)}
                ></input>
              </div>
              <div
                className="col-6 from-group"
                style={{ marginBottom: "15px" }}
              >
                <label>Địa chỉ</label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "address")
                  }
                ></input>
              </div>
              <div className="col-12">
                <MdEditor
                  style={{ height: "400px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.descriptionMarkdown}
                />
              </div>
              <div className="col-12">
                <button
                  className="btn-save-new-specialty"
                  onClick={() => this.handleSaveNewClinic()}
                >
                  Save
                </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
