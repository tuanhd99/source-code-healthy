import React, { Component, Fragment } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageSpecialty.scss";
import * as action from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { getAllSpecialty } from "../../../services/userService";

import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log("------", res);
    this.setState({
      listSpecialty: res.data,
    });
  }
  /* life cycle (vong doi)
Run component
1.Run construct =>init state
2 Did mount (setState)
3.Render
*/
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({});
    }
  }

  handleEditSpecialty = (user) => {
    this.props.handleEditUserFromParent(user);
  };
  render() {
    let { listSpecialty } = this.state;

    return (
      <React.Fragment>
        <table id="TableManageSpecialty">
          <tbody>
            <tr>
              <th>Tên chuyên khoa</th>
              <th>Mô tả nội dung</th>
              <th>Action</th>
            </tr>
            {listSpecialty &&
              listSpecialty.length > 0 &&
              listSpecialty.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.descriptionHTML}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditSpecialty(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        /> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
