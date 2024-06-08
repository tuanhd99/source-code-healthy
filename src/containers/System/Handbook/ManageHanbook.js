import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageHanbook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { createHandBook } from "../../../services/userService";
import { toast, Toast } from "react-toastify";
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageHanbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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

  handleOnchangInput = (event, id) => {
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

  handleSaveNewHandBook = async () => {
    let res = await createHandBook(this.state);
    if (res && res.errCode === 0) {
      toast.success("add new handbook");
    } else {
      toast.error("something wrongs....");
    }
  };
  render() {
    let { language } = this.props;
    return (
      <>
        <div className="manage-handbook-container">
          <div className="manage-title">Quản lí cẩm nang</div>
          <div className="add-new-special row">
            <div className="col-6 form-group">
              <label>Tên cẩm nang</label>
              <input
                className="form-control"
                value={this.state.name}
                onChange={(event) => this.handleOnchangInput(event, "name")}
              ></input>
            </div>
            <div className="col-6 form-group">
              <label>Ảnh cẩm nang</label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => this.handleOnchangeImage(event)}
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
                className="btn-save-handbook"
                onClick={() => this.handleSaveNewHandBook()}
              >
                Save
              </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHanbook);
