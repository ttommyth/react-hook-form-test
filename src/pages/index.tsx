import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { FC, HTMLProps, RefAttributes, useCallback, useState } from 'react';
import * as yup from "yup";
import { ObjectShape, OptionalObjectSchema, TypeOfShape } from 'yup/lib/object';
import { AnyObject } from 'yup/lib/types';
import { ValidationError } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select, { GroupBase } from 'react-select';
import Group from 'react-select/dist/declarations/src/components/Group';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import tw from 'twin.macro';


const CustomInput: FC<HTMLProps<HTMLInputElement>> = (props) => {
  const { name, ...rest } = props;
  const { formState: { errors: { [name ?? ""]: error } } } = useFormContext();
  return <span className='flex flex-col'>
    <label>{name}</label>
    <input className='rounded-md border-gray-500 border-[1px]' {...rest} />
    {
      error && <span className='text-red-500'>{error.message}</span>
    }
  </span>
}
const CustomTextArea: FC<HTMLProps<HTMLTextAreaElement>> = (props) => {
  const { name, ...rest } = props;
  const { formState: { errors: { [name ?? ""]: error } } } = useFormContext();
  return <span className='flex flex-col'>
    <label>{name}</label>
    <textarea  className='rounded-md border-gray-500 border-[1px]'  {...rest} />
    {
      error && <span className='text-red-500'>{error.message}</span>
    }
  </span>
}
const CustomSelect: FC<StateManagerProps<any, boolean, GroupBase<any>>> = (props) => {
  const { name, ...rest } = props;
  const { formState: { errors: { [name ?? ""]: error } } } = useFormContext();
  return <span className='flex flex-col'>
    <label>{name}</label>
    <Select className='rounded-md [&_.select\_\_control]:border-gray-500 [&_.select\_\_control]:border-[1px]'  classNamePrefix={"select"} {...rest} />
    {
      error && <span className='text-red-500'>{error.message}</span>
    }
  </span>
}

const Home: NextPage = () => {
  const form = useForm({
    resolver: yupResolver(
      yup.object({
        shortString: yup.string().required("Required la")
      })
    ),
  });
  const { control, register, handleSubmit, formState, setValue, getValues } = form;

  const [data, setData] = useState("");
  return (
    <FormProvider {...form} >
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
        <div className={"container border-gray-500 border-2 rounded-lg mx-auto p-4 gap-4 flex flex-col m-4"}>
          <button onClick={() => { setValue("shortString", getValues()["shortString"] + Math.floor(Math.random() * 10)) }} type="button" className='rounded-full bg-purple-500 hover:bg-purple-600 text-white'>test set value</button>
          <Controller
            name="shortString"
            control={control}
            render={({ field }) => <CustomInput {...field} />}
          />
          <Controller
            name="areaString"
            control={control}
            render={({ field }) => <CustomTextArea {...field} placeholder="areaString" />}
          />
          <Controller
            name="select"
            control={control}
            render={({ field }) => <CustomSelect
              {...field}
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" }
              ]}
            />}
          />
          <p>{data}</p>
          <p>{JSON.stringify(formState.touchedFields)}</p>
          <p>{JSON.stringify(formState.errors)}</p>
          <input type="submit" className='rounded-full bg-purple-500 hover:bg-purple-600 text-white' />
        </div>
      </form>
    </FormProvider>
  )
}

export default Home
