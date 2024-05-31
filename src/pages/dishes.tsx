import React, { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiUpload } from '@mdi/js';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import Button from '../components/Button';
import Buttons from '../components/Buttons';
import Divider from '../components/Divider';
import CardBox from '../components/CardBox';
import FormCheckRadio from '../components/Form/CheckRadio';
import FormCheckRadioGroup from '../components/Form/CheckRadioGroup';
import FormField from '../components/Form/Field';
import FormFilePicker from '../components/Form/FilePicker';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/Section/Main';
import SectionTitle from '../components/Section/Title';
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton';
import { getPageTitle } from '../config';
import useAxios from '../hooks/useAxios';
import { title } from 'process';
import Input from '../components/Input/Input';
import { truncateText } from '../utils/trucateText';

const DishesPage = () => {
  const [isEditDish, setIsEditDish] = useState(false);
  const [disData, setDishData] = useState<any>({});
  const [dishesData, setDishesData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [SearchValue, setSearchValue] = useState('');
  const [isDeleteDish,setIsdeleteDish] = useState(false)

  const { data, error, loading, sendRequest } = useAxios();
  const { data:deleteDish,error:dishError,sendRequest:sendDeleteRequest } = useAxios();

  useLayoutEffect(() => {
    sendRequest('Dish/all');
  }, []);

  useEffect(() => {
    sendRequest('Dish/all');
  }, [isEditDish]);

  useEffect(() => {
    setIsdeleteDish(false)
    sendRequest('Dish/all');

  }, [deleteDish])
  

  const handleEditDish = async (values: any) => {
    console.log('Values', values);

    let method;
    await sendRequest(
      'Dish/Update',
      {
        id: disData?.id,
        title: values?.title,
        description: values?.description,
        dish_photo: values?.photo,
        Carbohydrates: values?.carbohydrates,
        Protein: values?.protein,
        Fat: values?.fat,
        calories: +values?.calories,
      },
      (method = 'PATCH')
    );
  };

  useEffect(() => {
    if (data?.result?.length > 1) {
      setDishesData(data?.result);
      setOriginalData(data?.result);
    } else {
      setIsEditDish(false);
    }
  }, [data]);

  useEffect(() => {
    if (SearchValue) {
      const filteredData = originalData.filter((item) =>
        item?.title?.toLowerCase().includes(SearchValue.toLowerCase())
      );
      setDishesData(filteredData);
    } else {
      setDishesData(originalData);
    }
  }, [SearchValue, originalData]);

  const handleClick = (item: any) => {
    setIsEditDish(true);
    setDishData(item);
  };

  const handleDeleteDish = (e, id) => {
    e.stopPropagation();
    setIsdeleteDish(true)
    let method;
    sendDeleteRequest(
      'Dish/delete',
      { id: id },
      (method = 'DELETE')
    );
  };

  console.log('originalData', originalData, SearchValue);

  return (
    <>
      <Head>
        <title>Dishes</title>
      </Head>
      <div className="p-8">
        <Input
          icon={true}
          value={SearchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Dishes"
        />
      </div>
      {isEditDish ? (
        <>
          <SectionMain>
            <h1 className="text-3xl font-bold">Edit Dish</h1>
            <CardBox>
              <Formik
                initialValues={{
                  title: disData?.title,
                  photo: disData?.dish_photo,
                  fat: disData?.Fat,
                  protein: disData?.Protein,
                  carbohydrates: disData?.Carbohydrates,
                  calories: disData?.calories,
                  description: disData?.description,
                }}
                onSubmit={(values) => handleEditDish(values)}
              >
                <Form>
                  <FormField label="Title" labelFor="title">
                    <Field name="title" placeholder="Title" id="title" />
                  </FormField>

                  <FormField label="Photo Url" labelFor="photo url">
                    <Field name="photo" placeholder="Photo Url" id="photo" />
                  </FormField>
                  <FormField label="FAT" labelFor="fat">
                    <Field name="fat" placeholder="Fat" id="fat" />
                  </FormField>

                  <FormField label="PROTEIN" labelFor="protein">
                    <Field name="protein" placeholder="protein" id="protein" />
                  </FormField>

                  <FormField label="Carbo Hydrates" labelFor="carbo hydrates">
                    <Field name="carbohydrates" placeholder="carbo hydrates" id="carbohydrates" />
                  </FormField>
                  <FormField label="Calories" labelFor="calories">
                    <Field name="calories" placeholder="Calories" id="calories" />
                  </FormField>

                  <Divider />

                  <FormField label="description" hasTextareaHeight>
                    <Field name="description" as="textarea" placeholder="Description here" />
                  </FormField>

                  <Divider />

                  <Buttons>
                    <Button type="submit" color="info" label="Edit" />
                    <Button
                      type="reset"
                      onClick={() => {
                        setIsEditDish(false);
                      }}
                      color="info"
                      outline
                      label="Cancel"
                    />
                  </Buttons>
                </Form>
              </Formik>
            </CardBox>
          </SectionMain>
        </>
      ) : (
        <div className="grid gap-3 p-6 lg:grid-cols-4 md:grid-cols-3 ">
          {dishesData?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                handleClick(item);
              }}
              className="relative hover:shadow-2xl hover:border-2 border-grey/20 bg-[#f3f3ef] w-[full] h-72 rounded-xl p-2 pb-3 overflow-hidden"
            >
              <div
                onClick={(e) => handleDeleteDish(e, item.id)}
                className="absolute top-5 right-5 w-8 h-8 bg-[lightgray] flex rounded-full items-center justify-center"
              >
                <FaRegTrashAlt />
              </div>
              <img src={item?.dish_photo} className="w-full h-40 rounded-xl" />
              <h1 className="font-bold">{item?.title}</h1>
              <p className="">{truncateText(item?.description, 100)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DishesPage;

DishesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};
