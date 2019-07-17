import React from "react";
import { Field, FieldProps, Formik, FormikProps, ErrorMessage } from "formik";
import { Button, Input } from "antd";
import {
  Auth,
  Container,
  StyledInput,
  StyledForm,
  StyledInputWrapper,
  StyledErrorMessage
} from "./styles";
import { IAuthData } from "./types";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { authenticationAction } from "../../Modules/authorization/actions";
import { routes } from "../../Router/constans";
import { push } from "connected-react-router";

export const Authorization: React.FC<{}> = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Auth>
        <span>Login: user</span>
        <br />
        <span>Password: user</span>
        <Formik
          initialValues={{ login: "", password: "" }}
          validationSchema={Yup.object({
            login: Yup.string()
              .required("Login is required! Login: user")
              .test("login", "Incorrect user!", value => value === "user"),
            password: Yup.string()
              .required("Password is required! Password: user")
              .min(4, "Minimum 4 symbols!")
              .test(
                "password",
                "Incorrect password!",
                value => value === "user"
              )
          })}
          onSubmit={(values: IAuthData) => {
            dispatch(authenticationAction({ ...values, loggedIn: true }));
            dispatch(push(routes.home));
          }}
          render={(props: FormikProps<IAuthData>) => (
            <StyledForm>
              <Field
                name="login"
                render={({ field }: FieldProps<IAuthData>) => (
                  <StyledInputWrapper>
                    <Input type="text" placeholder="Login" {...field} />
                    <StyledErrorMessage>
                      <ErrorMessage name="login" />
                    </StyledErrorMessage>
                  </StyledInputWrapper>
                )}
              />
              <Field
                name="password"
                render={({ field }: FieldProps<IAuthData>) => (
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
                htmlType={"submit"}
              >
                Sign in
              </Button>
            </StyledForm>
          )}
        />
      </Auth>
    </Container>
  );
};
