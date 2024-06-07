import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import FormCheckRadio from '../components/Form/CheckRadio'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import useAxios from '../hooks/useAxios'
import { setToken } from '../stores/mainSlice'

type LoginForm = {
  login: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()

  const { data, error, sendRequest } = useAxios()

  const handleSubmit = async (formValues: LoginForm) => {
    if (formValues.login === 'admin@gmail.com' && formValues.password === 'password') {
      await sendRequest(`user/id?id=${'admin'}`)
    }
  }

  useEffect(() => {
    if (data?.token) {
      // setToken(data?.token)
     handleNavigate()
    }
  }, [data])

  const handleNavigate = () =>{
    localStorage.setItem('Token',data?.token)
    router.push('/dashboard')
  }

  const initialValues: LoginForm = {
    login: '',
    password: '',
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 shadow-2xl md:w-7/12 lg:w-6/12 xl:w-4/12">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <FormField label="Login" help="Please enter your login">
                <Field name="login" />
              </FormField>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" />
              </FormField>

              {/* <FormCheckRadio type="checkbox" label="Remember">
                <Field type="checkbox" name="remember" />
              </FormCheckRadio> */}

              <Divider />

              <Buttons>
                <Button type="submit" label="Login" color="info" />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default LoginPage
