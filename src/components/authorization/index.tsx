import React from "react";
import { Field, FieldProps, Formik, FormikProps, ErrorMessage } from "formik";
import { Button } from "antd";
import {
  Auth,
  Container,
  Row,
  StyledInput,
  StyledForm,
  StyledInputWrapper,
  StyledErrorMessage
} from "./styles";
import { AuthData } from "./types";
import * as Yup from "yup";

export const Authorization: React.FC<{}> = () => {
  const onSubmit = (props: FormikProps<AuthData>) => () => props.handleSubmit();
  return (
    <Container>
      <Row>
        <Auth>
          <Formik
            initialValues={{ login: "", password: "" }}
            validationSchema={Yup.object({
              login: Yup.string().required("Login is required! Login: admin"),
              password: Yup.string()
                .required("Password is required! Password: admin")
                .min(5, "Minimum 5 symbols!")
            })}
            onSubmit={(values: AuthData) => {
              console.log(values.login, values.password);
            }}
            render={(props: FormikProps<AuthData>) => (
              <StyledForm>
                <Field
                  name="login"
                  render={({ field }: FieldProps<AuthData>) => (
                    <StyledInputWrapper>
                      <StyledInput type="text" placeholder="Login" {...field} />
                      <StyledErrorMessage>
                        <ErrorMessage name="login" />
                      </StyledErrorMessage>
                    </StyledInputWrapper>
                  )}
                />
                <Field
                  name="password"
                  render={({ field }: FieldProps<AuthData>) => (
                    <StyledInputWrapper>
                      <StyledInput
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                      <StyledErrorMessage>
                        <ErrorMessage name="password" />
                      </StyledErrorMessage>
                      <ErrorMessage name="password" />
                    </StyledInputWrapper>
                  )}
                />
                <Button
                  disabled={!props.isValid || !props.touched}
                  type="primary"
                  onClick={onSubmit(props)}
                >
                  Sign in
                </Button>
              </StyledForm>
            )}
          />
        </Auth>
      </Row>
    </Container>
  );
};
