# arrows

Simple SVG Arrow Component. 

## Basic

``` javascript
import React from 'react';
import ReactDOM from 'react-dom'
import Arrow from 'react-snake-arrow'

class Example extends React.Component{
	render() {
		return (
			<div>
				<Arrow startPoint={{x: 10, y: 20}} endPoint={{x: 150, y: 200}}
					option={{duration: 2000, stroke: 'red', strokeWidth: 3}} />
			</div>
		);
	}
}
ReactDOM.render(
	<Example />,
	document.querySelector('#app')
);

```

## Properties

#### stroke {string}

The color of the arrow.

#### strokeWidth {number}

The width of the arrow.

#### duration {number}

The time of animation.