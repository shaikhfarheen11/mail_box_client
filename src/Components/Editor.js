import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.quillRef = null;
  }

  componentDidMount() {
    if (this.quillRef) {
      this.quillRef.getEditor().on('text-change', () => {
        this.handleChange(this.quillRef.getEditor().root.innerHTML);
      });
    }
  }

  handleChange = (value) => {
    this.setState({ text: value });
  };

  render() {
    return (
      <div>
        <ReactQuill
          ref={(el) => (this.quillRef = el)}
          value={this.props.value}
          onChange={this.props.onChange}
          formats={Editor.formats}
          modules={Editor.modules}
          placeholder={'Write something...'}
        />
      </div>
    );
  }
}

Editor.modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image', 'video'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

export default Editor;