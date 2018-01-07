import { Component } from 'react'
import MySimpleReactComponent from './my-simple-react-component'

export default class extends Component {
 render(){
		return (
			<div className='app'>	
				<div>
					<h1>React Component Example</h1>
					<p>The following are examples of this component.</p>
				</div>
				
				<MySimpleReactComponent 
					name='Jonnie'
					items={['Item 1', 'Item 2', 'Item 3']}/>
			</div>
		)
	}
}
