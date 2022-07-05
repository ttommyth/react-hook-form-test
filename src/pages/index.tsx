import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { FC, HTMLProps, useCallback, useState } from 'react';
import * as yup from "yup";
import { ObjectShape, OptionalObjectSchema, TypeOfShape } from 'yup/lib/object';
import { AnyObject } from 'yup/lib/types';
import { ValidationError } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const CustomInput: FC<HTMLProps<HTMLInputElement>> = (props) => {
  const { name, ...rest } = props;
  const { formState: { errors:{[name??""]:error} } } = useFormContext();
  return <span className='flex flex-col'>
    <label>{name}</label>
    <input {...rest} />
    {
      error && <span className='text-red-500'>{error.message}</span>
    }
  </span>

}

const Home: NextPage = () => {
  const  form = useForm({
    resolver: yupResolver(
      yup.object({
        firstName: yup.string().required("Required")
      })
    ),
  });
  const  { control, register, handleSubmit, formState, setValue,getValues } = form;
  
  const [data, setData] = useState("");
  return (
    <div className={"container border-gray-500 border-2 rounded-lg mx-auto"}>
< button onClick={()=>{setValue("firstName",getValues()["firstName"]+Math.floor(Math.random()*10) )}}>test set value</button>
      <FormProvider {...form} >
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <CustomInput {...field} />}
          />
          <select {...register("category")}>
            <option value="">Select...</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
          </select>
          <textarea {...register("aboutYou")} placeholder="About you" />
          <p>{data}</p>
          <p>{JSON.stringify(formState.touchedFields)}</p>
          <p>{JSON.stringify(formState.errors)}</p>
          <input type="submit" />
        </form>
      </FormProvider>
    </div>
  )
}

export default Home
