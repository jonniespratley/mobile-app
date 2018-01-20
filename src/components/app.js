import React from 'react'
import MySimpleReactComponent from './my-simple-react-component'
import {
  HashRouter as Router,
  Route,
  Link,
	Switch
} from 'react-router-dom'





import styled from 'styled-components';


// TODO - Styled Compnents
const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;







const Home = () => (
  <div>
    <h2>Home</h2>
		<p>This is the Home page.</p>
  
    <Button>Button</Button>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
    <MySimpleReactComponent 
      name='Jonnie'
      items={['Item 1', 'Item 2', 'Item 3']}/>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
		<p>This is the about page.</p>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
		<p>The following is an example of sub-routes for a component.</p>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
);

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

export default class App extends React.Component {
	render(){
		return (
			<Router>
			 <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
               <li><Link className="nav-link" to="/">Home</Link></li>
               <li><Link to="/about">About</Link></li>
               <li><Link to="/topics">Topics</Link></li>
               <li><Link to="/404">Example 404</Link></li>
             </ul>
            </div>
          </nav>
				 

				 <hr/>
				 <Switch>
					 <Route exact path="/" component={Home}/>
						<Route path="/about" component={About}/>
						<Route path="/topics" component={Topics}/>
						<Route component={NoMatch}/>
				 </Switch>
			 </div>
		 </Router>
		)
	}
}