import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'mobx-react';
import CounterStore from './store/CounterStore';

ReactDOM.render(
  // provider: mobx와 react를 연결, store를 제공(props의 형태로)
  // App 컴포넌트를 provider로 감싸고 있기 때문에
  // CounterStore를 전역적으로 사용 가능(App 하위 컴포넌트는 전부 CounterStore를 사용 가능)
  // 즉, provider를 통해 store들을 정의해준다.(mobX는 다수의 store를 만들 수 있음)
  // store들을 provider의 props로 전달해준다.
  <Provider counterStore = {CounterStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();