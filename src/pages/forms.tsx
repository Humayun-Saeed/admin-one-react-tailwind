import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../components/Button'
import Buttons from '../components/Buttons'
import Divider from '../components/Divider'
import CardBox from '../components/CardBox'
import FormCheckRadio from '../components/Form/CheckRadio'
import FormCheckRadioGroup from '../components/Form/CheckRadioGroup'
import FormField from '../components/Form/Field'
import FormFilePicker from '../components/Form/FilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitle from '../components/Section/Title'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import { getPageTitle } from '../config'
import useAxios from '../hooks/useAxios'

const FormsPage = () => {

  const {data,loading,error, sendRequest} = useAxios()

const handleCreateDish = async (values: any) => {

  console.log("Create",values);
  
    let method
    await sendRequest(
      'Dish/Create',
      {
        title: values?.title,
        description: values?.description,
        dish_photo: values?.photo,
        Carbohydrates: +values?.carbohydrates,
        Protein: +values?.protein,
        Fat: +values?.fat,
        calories: +values?.calories,
      },
    )
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Forms')}</title>
      </Head>

      <SectionMain>
       <h1 className='text-3xl font-bold'>Create Dish</h1>
        <CardBox>
          <Formik
            initialValues={{
              photo: '',
              fat: '',
              protein: '',
              carbohydrates: '',
              calories: '',
              description: '',
            }}
            onSubmit={(values) => handleCreateDish(values)}
          >
            <Form>
            <FormField
                label="Title"
                labelFor="title"
              >
                <Field name="title" placeholder="Dish Title" id="photo" />
                
              </FormField>
            <FormField
                label="Photo Url"
                labelFor="photo url"
              >
                <Field name="photo" placeholder="Photo Url" id="photo" />
                
              </FormField>
            <FormField
                label="FAT"
                labelFor="fat"
              >
                <Field name="fat" placeholder="Fat" id="fat" />
                
              </FormField>

              <FormField
                label="PROTEIN"
                labelFor="protein"
              >
                <Field name="protein" placeholder="protein" id="protein" />
                
              </FormField>

              <FormField
                label="Carbo Hydrates"
                labelFor="carbo hydrates"
              >
                <Field name="carbohydrates" placeholder="carbo hydrates" id="carbohydrates" />
                
              </FormField>
              <FormField
                label="Calories"
                labelFor="calories"
              >
                <Field name="calories" placeholder="Calories" id="calories" />
                
              </FormField>
              
              <Divider />

              <FormField label="description" hasTextareaHeight>
                <Field name="description" as="textarea" placeholder="Description here" />
              </FormField>

              <Divider />

              <Buttons>
                <Button type="submit" color="info" label="Submit" />
                {/* <Button type="reset"  color="info" outline label="Reset" /> */}
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>

     
     
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
