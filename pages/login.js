import * as React from "react"
import { Form, FormItem, Input, SubmitButton } from "formik-antd"
import { Formik } from "formik"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import * as Yup from "yup"
import Router from "next/router"

import fetch from "../libs/fetch"

const LoginSchema = Yup.object().shape({
  Username: Yup.string().required("Required"),
  Password: Yup.string().required("Required")
})

function LoginPage() {
  const onSubmit = async (values, actions) => {
    try {
      const { token } = await fetch("/auth/signin", {
        method: "POST",
        body: JSON.stringify(values)
      })
      localStorage.setItem("TOKEN", token)
      Router.push("/")
    } catch (e) {
      console.log(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <div className="container">
      <Formik
        initialValues={{ Username: "", Password: "" }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form layout="vertical">
            <FormItem label="Username" name="Username" required={true}>
              <Input name="Username" prefix={<UserOutlined />} />
            </FormItem>

            <FormItem label="Password" name="Password" required={true}>
              <Input.Password name="Password" prefix={<LockOutlined />} />
            </FormItem>

            <div className="cta">
              <SubmitButton>Login</SubmitButton>
            </div>
          </Form>
        )}
      </Formik>

      <style jsx>{`
        .container {
          max-width: 340px;
          width: 100%;
          margin-left: auto;
          height: 100vh;
          margin-right: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .cta {
          margin-top: 10px;
        }
      `}</style>
    </div>
  )
}

export default LoginPage
