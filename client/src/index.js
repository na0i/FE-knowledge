import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // index.html에서 root라고 쓰여있는 tag에
  // App이라는 컴포넌트(내용)을 작성하겠다.
  // 다른 component를 작성해도 되고
  // tag이름을 변경해도 되는데 tag이름을 변경하면 index.html의 tag도 변경할 것
  document.getElementById('root')
);

reportWebVitals();


