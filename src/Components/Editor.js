import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

const Editor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        onChange(html);
      });
    }
  }, [onChange]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'video'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        formats={formats}
        modules={modules}
        placeholder={'Write something...'}
      />
    </div>
  );
};

export default Editor;
