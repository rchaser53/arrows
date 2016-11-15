import * as React from 'react';
import { render } from 'react-dom';

import Arrow from '../src/index';

export class Example extends React.Component<any, any> {
	constructor(props) {
		super(props);

		this.state = {
			x1: Math.random() * 100,
			y1: Math.random() * 100,
			x2: Math.random() * 300,
			y2: Math.random() * 300
		};
	}

	render() {
		const {x1, y1, x2, y2} = this.state;

		return (<Arrow startPoint={{x:x1, y:y1}} endPoint={{x:x2, y:y2}}
					option={{duration: 2000, stroke: 'red', strokeWidth: 3}} />);
	}
}

render(<Example />, document.querySelector('#root'));