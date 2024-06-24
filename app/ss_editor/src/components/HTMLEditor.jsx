import React, { useRef, useState } from 'react';
import './styles/style.css';

function parseText(text) {
  const chapters = text.split('endchapter\n');
  const sections = [];
  chapters.forEach(element => {
    sections.push(element.split('endsection\n'))
  });
  return sections
}

function renderSections(sections) {
  const sections_html_list = sections.map(
    (section, index) => 
      `
      <h4>第${ index + 1 }節</h4>\n
      ${ section }
      `
  )
  return sections_html_list.join('\n')
}

function renderChapters(chapters) {
  const chapters_html_list = chapters.map(
    (chapter, index) => 
      `
      <h2>第${ index + 1 }章</h2>\n
      ${ renderSections(chapter) }\n
      `
  )
  console.log(chapters_html_list);
  return chapters_html_list.join('\n')
}

function renderAsHtml(title, subtitle, chapters) {
  return (
    `<div class="base">  
      <div class="text">
  
        <hr class="hr3">
        <h1>${ title }<span>${ subtitle }</span></h1>
 
        ${ renderChapters(chapters) }
      </div>
    </div>`
  )
}

function HTMLEditor() {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [htmlText, setHtmlText] = useState('');

  const iframeRef = useRef(null);
  
  const handleHtmlChange = (e) => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.body.innerHTML = renderAsHtml(title, subTitle, parseText(e.target.value));
    }
    setHtmlText(e.target.value);
  };

  const handleTitleChange = (e) => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.body.innerHTML = renderAsHtml(e.target.value, subTitle, parseText(htmlText));
    }
    setTitle(e.target.value);
  };

  const handleSubTitleChange = (e) => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.body.innerHTML = renderAsHtml(title, e.target.value, parseText(htmlText));
    }
    setSubTitle(e.target.value);
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ display: 'flex', flexFlow: 'column', width: '50%', height: '100%' }} >
        <div style = {{ display: 'flex', margin: '3px', justifyContent: 'space-between' }}>
          <p>Title: </p>
          <input value={title} onChange={handleTitleChange}/>
        </div>
        <div style = {{ display: 'flex', margin: '3px', justifyContent: 'space-between' }}>
          <p>SubTitle: </p>
          <input value={subTitle} onChange={handleSubTitleChange}/>
        </div>
        <textarea
          value={htmlText}
          onChange={handleHtmlChange}
          style = {{ flexGrow: 1, margin: '3px' }}
        />
      </div>
      <iframe
        ref={iframeRef}
        title="Preview"
        style={{ width: '50%', height: '100%', border: 'none' }}
      />
    </div>
  );
}

export default HTMLEditor;
