import styled from "styled-components";
import { Form } from "formik";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

export const Auth = styled.div`
  width: 20em;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const StyledInputWrapper = styled.div`
  height: 4em;
`;

export const StyledErrorMessage = styled.div`
  color: red;
  font-style: italic;
`;
