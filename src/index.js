import React from 'react'
import ReactDOM from 'react-dom';
import ons from 'onsenui';
import Ons from 'react-onsenui';

//import 'onsenui/css/onsenui.css';
//import 'onsenui/css/onsen-css-components.css';


import App from './components/App';

//require('onsenui/css/onsenui.css');
require('onsenui/css/onsen-css-components.css');

ReactDOM.render(<App />, document.querySelector('#mountNode'));