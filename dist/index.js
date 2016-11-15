"use strict";
const React = require('react');
const util_1 = require('./util');
class Arrow extends React.Component {
    constructor(props) {
        super();
        const { startPoint, endPoint } = props;
        const { x: x1, y: y1 } = startPoint;
        const { x: x2, y: y2 } = endPoint;
        this.inflectionX1 = ((x1 - x2) > 0) ? 50 : -50;
        this.inflectionY1 = ((y1 - y2) > 0) ? 50 : -50;
        this.inflectionX2 = ((x1 - x2) > 0) ? -50 : 50;
        this.inflectionY2 = ((y1 - y2) > 0) ? -50 : 50;
    }
    componentDidMount() {
        this.forceUpdate();
    }
    componentDidUpdate() {
        const { startPoint, endPoint, option } = this.props;
        const { duration } = option;
        const { x: x1, y: y1 } = startPoint;
        const { x: x2, y: y2 } = endPoint;
        const { inflectionX1, inflectionY1, inflectionX2, inflectionY2, } = this;
        const lastAngle = util_1.getDiffCB(0.99, x1, y1, x1 + inflectionX1, y1 + inflectionY1, x2 - inflectionX2, y2 - inflectionY2, x2, y2);
        const step = (timestamp) => {
            const length = this.arrow.getTotalLength();
            this.arrow.style.strokeDasharray = `${(timestamp * length) / duration}, ${length}`;
            if (timestamp / duration < 1) {
                requestAnimationFrame(step);
            }
            else {
                this.arrowHead.style.transformOrigin = `${x2}px ${y2}px`;
                this.arrowHead.style.transform = `rotate(${lastAngle}deg)`;
                requestAnimationFrame(makeArrowHead);
            }
        };
        const makeArrowHead = (timestamp) => {
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
        const getX = (x, y, angle) => {
            return (x * Math.cos(angle / 180)) - (y * Math.sin(angle / 180));
        };
        const getY = (x, y, angle) => {
            return (x * Math.sin(angle / 180)) + (y * Math.cos(angle / 180));
        };
        requestAnimationFrame(step);
    }
    render() {
        const { startPoint, endPoint, option } = this.props;
        const { stroke, strokeWidth } = option;
        const { x: x1, y: y1 } = startPoint;
        const { x: x2, y: y2 } = endPoint;
        const { inflectionX1, inflectionY1, inflectionX2, inflectionY2, } = this;
        const width = Math.abs(x1 - x2) + 150;
        const height = Math.abs(y1 - y2) + 150;
        return (React.createElement("div", null, 
            React.createElement("svg", {width: width, height: height}, 
                React.createElement("path", {ref: (elem) => { this.arrow = elem; }, stroke: stroke || 'green', fill: 'none', strokeWidth: strokeWidth || '5', d: `M	${x1},${y1} C ${x1 + inflectionX1},${y1 + inflectionY1}
								${x2 - inflectionX2},${y2 - inflectionY2} ${x2},${y2}`}), 
                React.createElement("polygon", {ref: (elem) => { this.arrowHead = elem; }, fill: stroke || 'green'}))
        ));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Arrow;
