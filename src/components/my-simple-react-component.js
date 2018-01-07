import {Component} from 'react';

export default class MySimpleReactComponent extends Component {
  constructor(props){
    super(props);
    this.displayName = 'MySimpleReactComponent';
		this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
    console.log(this.displayName, 'componentWillMount', this);
  }
  componentDidMount(){
    console.log(this.displayName, 'componentDidMount', this);
  }
  componentWillUnmount(){
    console.log(this.displayName, 'componentWillUnmount', this);
  }
	handleClick(e){
    console.log(this.displayName, 'click', this);
  }
  render(){
    const {children, name, items} = this.props;
    return (
      <div className='MySimpleReactComponent'>
        <header>
          Hello <span>{name}</span>
        </header>
        {children}
        <ul>
          {items && items.map((item, index) => (
             <li onClick={this.handleClick}>{index} - {item}</li>
          ))}
        </ul>
        <style>{`
          .MySimpleReactComponent {
            display: block;
            padding: 1rem;
						background: white;
          }
          .MySimpleReactComponent span{
            color: blue;
          }
        `}</style>
      </div>
    );
  }
}

