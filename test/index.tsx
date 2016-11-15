declare var describe:any;
declare var it:any;

import * as React from 'react';
import * as expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import Arrow from '../src/index';


describe('Arrow', function() {
	it('complete to render arrow', function() {
		const arrow = shallow(<Arrow startPoint={{x: 10, y: 20}} endPoint={{x: 150, y: 200}}
								option={{duration: 2000, stroke: 'red', strokeWidth: 3}} />);

		expect(arrow.length > 0).toEqual(true);
	});
});
