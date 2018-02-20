import styled, { keyframes } from "styled-components";
import classNames from "classnames";
import React from "react";

const ActivityIndicatorProps = {
  color: {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 98 / 255
  },
  segments: 12,
  segmentWidth: 2,
  segmentLength: 3,
  spacing: 2,
  fadeTo: 31 / 98,
  fadeSteps: 6
};

// RGBA values measured by looking at the refresh control on top of white
// and black and solving a system of equations
const RefreshControlProps = {
  color: {
    red: Math.round(4845 / 56),
    green: Math.round(765 / 8),
    blue: Math.round(24225 / 224),
    alpha: 224 / 255
  },
  segments: 12,
  segmentWidth: 2,
  segmentLength: 5,
  spacing: 3,
  fadeTo: 0,
  fadeSteps: 11
};

const indicator = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.svg`
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: ${indicator};
  animation-timing-function: steps(12);
`;

export default class LoadingIndicator extends React.Component {
  static ActivityIndicatorProps = ActivityIndicatorProps;
  static RefreshControlProps = RefreshControlProps;

  static defaultProps = ActivityIndicatorProps;

  render() {
    let segmentCount = this.props.segments;
    let segmentWidth = this.props.segmentWidth;
    let segmentLength = this.props.segmentLength;
    let innerRadius = segmentWidth * 2 + this.props.spacing;

    let opacityDelta = (1 - this.props.fadeTo) / this.props.fadeSteps;

    let segments = [];
    for (let ii = 0; ii < segmentCount; ii++) {
      let opacity = 1 - Math.min(ii, this.props.fadeSteps) * opacityDelta;
      let rotation = -ii * 360 / segmentCount;
      segments.push(
        <line
          key={ii}
          x1="0"
          y1={innerRadius}
          x2="0"
          y2={innerRadius + segmentLength}
          style={{ opacity: opacity }}
          transform={`rotate(${rotation})`}
        />
      );
    }

    let { red, green, blue, alpha } = this.props.color;
    let rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    let radius = innerRadius + segmentLength + Math.ceil(segmentWidth / 2);

    return (
      <LoadingIcon
        className={this.props.className}
        style={this.props.style}
        width={radius * 2}
        height={radius * 2}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke={rgbaColor}
          strokeWidth={segmentWidth}
          strokeLinecap="round"
          transform={`translate(${radius}, ${radius})`}
        >
          {segments}
        </g>
      </LoadingIcon>
    );
  }
}
