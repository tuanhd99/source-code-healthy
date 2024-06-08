import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManageSpecialty.scss";
import { CommonUtils } from "../../../utils";
import { createSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import {
  getDetailInforDoctor,
  getDetailSpecialtyById,
} from "../../../services/userService";
import * as action from "../../../store/actions";
import Select from "react-select";
import TableManageSpecialty from "./TableManageSpecialty";
import Lightbox from "react-image-lightbox";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      listSpecialty: [],
      selectedSpecialty: "",
      previewImgURL: "",
      action: "",
      isOpen: false,
    };
  }
  async componentDidMount() {
    this.props.editSpecialty();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}
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
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        imageBase64: base64,
      });
    }
  };
  handleSaveNewSpecialty = async () => {
    let res = await createSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("succees");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("error");
    }

    // if (action === CRUD_ACTIONS.EDIT) {
    //   this.props.editSpecialty({
    //     id: this.state.SpecialtyEditId,
    //     name: this.state.name,
    //   });
    // }
  };
  handleEditUserFromParent = (specialty) => {
    let imageBase64 = "";
    if (specialty.image) {
      imageBase64 = new Buffer(specialty.image, "base64").toString("binary");
    }
    this.setState({
      name: specialty.name,
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      specialtyEditId: specialty.id,
    });
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  render() {
    return (
      <>
        <div className="manage-specialty-container">
          <div className="manage-specialty-title"> Quản lí chuyên khoa</div>
          <div className="add-new-specialty">
            <div className="row">
              <div className="col-6 form-group">
                <label>Tên chuyên khoa</label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.name}
                  onChange={(event) => this.handleOnchangeInput(event, "name")}
                ></input>
              </div>
              <div className="col-6 from-group ">
                <label className="label-upload" htmlFor="previewImg">
                  Tải ảnh <i className="fas fa-upload"></i>
                </label>
                <div
                  className="preview-image"
                  style={{
                    backgroundImage: `url(${this.state.previewImgURL})`,
                  }}
                  onClick={() => this.openPreviewImage()}
                ></div>
                <input
                  id="previewImg"
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
                  // className={
                  //   this.state.action === CRUD_ACTIONS.EDIT
                  //     ? "btn btn-warning"
                  //     : "btn btn-primary"
                  // }
                  className="btn-save-new-specialty"
                  onClick={() => this.handleSaveNewSpecialty()}
                >
                  {/* {this.state.action === "EDIT" ? "Save" : "Create"} */}
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <TableManageSpecialty
          handleEditUserFromParent={this.handleEditUserFromParent}
          action={this.state.action}
        /> */}
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequiredDoctoInfor: () => dispatch(action.getRequiredDoctoInfor()),
    editSpecialty: (data) => dispatch(action.editSpecialty(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
