import React, { PureComponent } from "react";
import styled from "styled-components";

export default class Alert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
}
