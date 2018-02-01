import React from "react";
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
  padding: 0 0.5rem;
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
`;

export default function ConcatFormPage() {
  return (
    <FormPage>
      <PageTitle>Concat</PageTitle>
      <form name="contact" netlify={true}>
        <p>
          <FormInput type="text" name="name" placeholder="Name" />
        </p>
        <p>
          <FormInput
            type="email"
            name="email"
            type="email"
            placeholder="Email"
          />
        </p>
        <p>
          <FormTextarea name="message" rows="8" placeholder="Message" />
        </p>
        <p>
          <SubmitButton type="submit">Send</SubmitButton>
        </p>
      </form>
    </FormPage>
  );
}
