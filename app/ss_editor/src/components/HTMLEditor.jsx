import React, { useState } from 'react';

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
  const [title, setTitle] = useState(' ');
  const [subTitle, setSubTitle] = useState(' ');
  const [htmlText, setHtmlText] = useState(' ');

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexFlow: 'column', width: '50%' }} >
        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input value={subTitle} onChange={(e) => setSubTitle(e.target.value)}/>
        <textarea
          value={htmlText}
          onChange={(e) => setHtmlText(e.target.value)}
          style = {{ height: '300px' }}
        />
      </div>
      <div
        style={{ width: '50%', height: '300px', overflow: 'auto' }}
        dangerouslySetInnerHTML={{ __html: renderAsHtml(title, subTitle, parseText(htmlText)) }}
      />
    </div>
  );
}

export default HTMLEditor;
