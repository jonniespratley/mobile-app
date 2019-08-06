import React from 'react'
import { Page, Toolbar, Button, ToolbarButton, BackButton, Icon, List, ListItem} from 'react-onsenui';
import {
  HashRouter as Router,
  Route,
  Link,
	Switch
} from 'react-router-dom'

import MySimpleReactComponent from '../MySimpleReactComponent'


/**
Home Page
*/
const Home = ({tracks = []}) => (
  <Page  contentStyle={{padding: 20}} renderToolbar={() =>
    <Toolbar>
      <div className="center">
        Title
      </div>
      <div className="right">
        <ToolbarButton>
          <Icon icon="md-menu" />
        </ToolbarButton>
      </div>
    </Toolbar> }
  >
    <div>
      {tracks && <List modifier="noborder"
          dataSource={tracks}
          renderRow={(row, idx) => (
            <ListItem key={idx} tappable>
                <div className="left">
                  <img src={`${row.image[1]['#text']}`} alt={row.name}/>
                </div>
                <div className="center">
                  <p>{row.name}</p>
                <p>{row.artist.name}</p>
                </div>
                <div className="right">
                  <a href={row.url} target="_blank">View</a>
                  <Button modifier="quiet" onClick={(e) => {console.log('remove', idx)}}>Remove</Button>
              </div>
              <div className="expandable-content">Expandable content</div>
            </ListItem>
        )}
        />}
    </div>
  </Page>
  
);

/**
About Page
*/
const About = () => (
  <div>
    <h2>About</h2>
		<p>This is the about page.</p>
  </div>
);

/**
Topic Page
*/
const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

/**
Topics Page
*/
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

/**
404 Page
*/
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'Top Tracks',
      tracks: null
    };

  }
  componentWillMount(){
    fetch('/api/lastfm/chart.gettoptracks?limit=2').then(resp => resp.json()).then(json => {
      console.log(json.tracks.track);
      this.setState({tracks: json.tracks.track});
    });
  }
	render(){
    const {tracks} = this.state;
		return (
			<Router>
			 <div>

         <Toolbar />

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
					 <Route exact path="/" 
           render={(props) => <Home {...props} tracks={tracks} />}
           />
						<Route path="/about" component={About}/>
						<Route path="/topics" component={Topics}/>
						<Route component={NoMatch}/>
				 </Switch>
			 </div>
		 </Router>
		)
	}
}