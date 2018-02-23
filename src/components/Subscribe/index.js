import React, { PureComponent } from "react";
import jsonp from "jsonp";
import styled from "styled-components";
import Enum from "enum";
import MasterHeader from "../MasterHeader";
import Button from "../Button";

const SubscribeBox = styled.div`
  display: flex;
`;

const SubscribeInput = styled.input`
  flex: 1;
  background: #fff;
  border: solid 1px #ddd;
  border-radius: 3px;
  margin-right: 1rem;
  padding: 0 0.5rem;
  outline: 0;
  &:focus {
    border-color: #607d8b;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 0.8rem;
  font-weight: 500;
`;

const Container = styled.div`
  margin-top: 2rem;
  padding: 1.6rem 0 2rem;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  @media (max-width: 700px) {
    margin-left: -1rem;
    margin-right: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const SubscribeTip = styled.div`
  padding-top: 0.5rem;
  color: #999;
  font-size: 0.9rem;
`;

const STATUS = new Enum(["idle", "pending", "fail", "success"]);

export default class SubscribeForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      status: STATUS.idle,
      err: "",
      message: ""
    };
    this.cancelRequest = undefined;
  }

  componentWillUnmount() {
    this.cancelRequest && this.cancelRequest();
  }

  emailChangeHandle({ target }) {
    const idle = STATUS.idle.value;
    if (this.state.status !== idle) {
      this.setState({ status: idle });
    }
    this.setState({ email: target.value });
  }

  submitHandle(event) {
    event.preventDefault();
    const { target } = event;
    const { email } = this.state;
    if (!isValidEmailAddress(email)) return;
    const pending = STATUS.pending.value;
    const fail = STATUS.fail.value;
    const success = STATUS.success.value;
    this.setState({ status: pending });
    const url = target.action;
    this.cancelRequest = jsonp(url, { param: "c" }, (err, data) => {
      if (err) {
        this.setState({ err: err.message, status: fail });
        return;
      }
      this.setState({ status: success, message: data.msg });
    });
  }

  render() {
    const { email, status } = this.state;
    const pending = STATUS.pending.value;
    return (
      <Container>
        <form
          action={`https://goharry.us17.list-manage.com/subscribe/post-json?u=7109d7a05d51fe334fa8a7bd3&amp;id=fd5589471a&EMAIL=${encodeURIComponent(
            email
          )}`}
          onSubmit={this.submitHandle.bind(this)}
        >
          <Title>Subscribe via Email</Title>
          <SubscribeBox>
            <SubscribeInput
              value={email}
              onChange={this.emailChangeHandle.bind(this)}
              type="email"
              placeholder="Enter your email address"
            />
            <Button
              size="large"
              disabled={!isValidEmailAddress(email)}
              processing={status === pending}
            >
              subscribe
            </Button>
          </SubscribeBox>
          <SubscribeTip>
            <SubScribeTipText {...this.state} />
          </SubscribeTip>
        </form>
      </Container>
    );
  }
}

function isValidEmailAddress(email) {
  if (!email.trim()) return false;
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

function SubScribeTipText({ status, err, message }) {
  const fail = STATUS.fail.value;
  const idle = STATUS.idle.value;
  const pending = STATUS.pending.value;
  if (status === pending) {
    return <span>Processing...</span>;
  }
  if (status === fail && err) {
    return <span>{err}</span>;
  }
  if (status !== idle && message) {
    return <span dangerouslySetInnerHTML={{ __html: message }} />;
  }
  return <span>We will keep your email address secret</span>;
}
