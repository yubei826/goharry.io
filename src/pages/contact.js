import React, { Component } from "react";
import styled from "styled-components";

const FormPage = styled.div`
  padding-top: 1.5rem;
`;

const PageTitle = styled.h1`
  margin-top: 0;
`;

const FormInput = styled.input`
  background: #fff;
  padding: 0.5rem;
  font-size: 16px;
  border: solid 1px #ddd;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
  outline: 0;
  &:focus {
    border-color: #663399;
  }
`;

const FormTextarea = styled.textarea`
  background: #fff;
  padding: 0.5rem;
  font-size: 16px;
  border: solid 1px #ddd;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
  outline: 0;
  &:focus {
    border-color: #663399;
  }
`;

const SubmitButton = styled.button`
  height: 32px;
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 3px;
  margin: ;
  border: 1px solid #663399;
  color: #663399;
  background: transparent;
  outline: 0;
  cursor: pointer;
  &:hover {
    background: #663399;
    color: #fff;
  }
  &[disabled] {
    color: #999;
    border-color: #999;
    &:hover {
      background: transparent;
      color: #999;
    }
  }
`;

export default class ContactFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      disabled: true
    };
  }

  valueChangeHandle(e) {
    const target = e.target;
    this.setState({ [target.name]: target.value }, () => {
      if (this.checkValue()) {
        if (!this.state.disabled) return;
        this.setState({ disabled: false });
      } else {
        if (this.state.disabled) return;
        this.setState({ disabled: true });
      }
    });
  }

  submitHandle(e) {
    e.preventDefault();
    if (this.state.disabled) return;
    const { name, email, message } = this.state;
    const data = {
      name,
      email,
      message
    };
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...data })
    })
      .then(() => {
        alert("success");
      })
      .catch(error => alert(error));
  }

  checkValue() {
    const { name, email, message } = this.state;
    if (name.trim() && email.trim() && message.trim()) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <FormPage>
        <PageTitle>CONTACT</PageTitle>
        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.submitHandle.bind(this)}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <FormInput
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.valueChangeHandle.bind(this)}
            />
          </p>
          <p>
            <FormInput
              type="email"
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.valueChangeHandle.bind(this)}
            />
          </p>
          <p>
            <FormTextarea
              name="message"
              rows="8"
              placeholder="Message"
              value={this.state.message}
              onChange={this.valueChangeHandle.bind(this)}
            />
          </p>
          <p>
            <SubmitButton type="submit" disabled={this.state.disabled}>
              Send
            </SubmitButton>
          </p>
        </form>
      </FormPage>
    );
  }
}

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
