import React from 'react';
import './codeHtml.css';

export default (props) => {
  let codeDom = <div className="code-box clos-item" key={'codeHtmlDom-1'}>
    <pre>
      <code className="hljs game-hljs" dangerouslySetInnerHTML={{ __html: props.codeStr }}></code>
    </pre>
  </div>;
  let htmlDom = <div className="html-box clos-item" key={'codeHtmlDom-2'}>
    <div dangerouslySetInnerHTML={{ __html: props.htmlStr }}></div>
  </div>

  return props.codeHtmlOrder ? [htmlDom, codeDom] : [codeDom, htmlDom];
}
