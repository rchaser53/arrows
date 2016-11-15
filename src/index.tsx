import * as React from 'react';
import {
	arrow,
	arrowHead
} from '../css/animation';
import { getDiffCB } from './util';

export interface Props {
	startPoint: {
		x: number;
		y: number;
	};
	endPoint: {
		x: number;
		y: number;
	};
	option: {
		duration?: number;
		stroke?: string;
		strokeWidth?: number;
	};
}

class Arrow extends React.Component<Props, {}> {

	arrow: Element;
	arrowHead: SVGElement;

	inflectionX1: number;
	inflectionY1: number;
	inflectionX2: number;
	inflectionY2: number;

	constructor(props) {
		super();

		const { startPoint, endPoint} = props;
		const { x: x1, y: y1} = startPoint;
		const { x: x2, y: y2} = endPoint;

		this.inflectionX1 = ((x1 - x2) > 0) ? 50 : -50;
		this.inflectionY1 = ((y1 - y2) > 0) ? 50 : -50;
		this.inflectionX2 = ((x1 - x2) > 0) ? -50 : 50;
		this.inflectionY2 = ((y1 - y2) > 0) ? -50 : 50;
	}

	componentDidMount() {
		this.forceUpdate();
	}

	componentDidUpdate() {
		const { startPoint, endPoint, option} = this.props;
		const { duration } = option;

		const { x: x1, y: y1} = startPoint;
		const { x: x2, y: y2} = endPoint;
		const {
			inflectionX1, inflectionY1,
			inflectionX2, inflectionY2,
		} = this;

		const lastAngle = getDiffCB(0.99, x1, y1, x1 + inflectionX1, y1 + inflectionY1,
									x2 - inflectionX2, y2 - inflectionY2, x2, y2);

		const step = (timestamp: number) => {
			const length = (this.arrow as SVGPathElement).getTotalLength();

			(this.arrow as HTMLElement).style.strokeDasharray = `${(timestamp * length) / duration}, ${length}`;

			if (timestamp / duration < 1) {
				requestAnimationFrame(step);
			} else {
				(this.arrowHead as any).style.transformOrigin = `${x2}px ${y2}px`;
				(this.arrowHead as any).style.transform = `rotate(${lastAngle}deg)`;
				requestAnimationFrame(makeArrowHead);
			}
		};

		const makeArrowHead = (timestamp: number) => {
			const nextTime = timestamp - duration;
			const fx1 = x2 - 10;
			const fy1 = y2 - 10;

			const fx2 = x2 + 20;
			const fy2 = y2;

			const fx3 = x2 - 10;
			const fy3 = y2 + 10;

			this.arrowHead.setAttribute('points', ` ${x2} ${y2},
												${fx1} ${fy1},
												${fx2 - 20 + (nextTime / 25)} ${fy2},
												${fx3} ${fy3}`);

			if (nextTime < 500) {
				requestAnimationFrame(makeArrowHead);
			}
		};

		const getX = (x: number, y: number, angle: number): number => {
			return (x * Math.cos(angle / 180)) - (y * Math.sin(angle / 180));
		};
		const getY = (x: number, y: number, angle: number): number => {
			return (x * Math.sin(angle / 180)) + (y * Math.cos(angle / 180));
		};

		requestAnimationFrame(step);
	}

	render() {
		const {startPoint, endPoint, option} = this.props;
		const {stroke, strokeWidth} = option;

		const { x: x1, y: y1} = startPoint;
		const { x: x2, y: y2} = endPoint;
		const {
			inflectionX1, inflectionY1,
			inflectionX2, inflectionY2,
		} = this;

		const width = Math.abs(x1 - x2) + 150;
		const height = Math.abs(y1 - y2) + 150;

		return 	(<div>
					<svg width={width} height={height} >
						<path ref={(elem) => { this.arrow = elem;}}
							stroke={stroke || 'green'} fill='none'
							strokeWidth={strokeWidth || '5'}
							d={`M	${x1},${y1} C ${x1 + inflectionX1},${y1 + inflectionY1}
								${x2 - inflectionX2},${y2 - inflectionY2} ${x2},${y2}`} />
						<polygon ref={(elem) => { this.arrowHead = elem;}} fill={stroke || 'green'} />
					</svg>
				</div>);
	}
}
export default Arrow;