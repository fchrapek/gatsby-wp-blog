import React from 'react';
import { graphql } from 'gatsby';
import SEO from "../components/SEO";
import useForm from "../utils/useForm";
import useDummy from "../utils/useDummy";
// import { StaticImage } from "gatsby-plugin-image";

export default function ContactPage({ data }) {
  const dummy = [
    {
      id: 1,
      content: 'Say Hi',
    },
    {
      id: 1,
      content: 'Lets work together',
    }

  ]
  const { values, updateValue } = useForm({
    name: '',
    email: ''
  });
  const { order, addToOrder, removeFromOrder } = useDummy({
    dummy: dummy,
    inputs: values,
  });

  return (
    <>
      <SEO title={`Skontatkuj się`} />
      <form>
        <fieldset>
          <legend>
            Your info
          </legend>

          <label htmlFor="name"> Name </label>
          <input
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
          />


          <label htmlFor="email"> Email </label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
          />

        </fieldset>

        <fieldset>
          <legend>
            What do you want bro
          </legend>

          {dummy.map(dummy => (
            <div>
              {dummy.content}

              <button onClick={() => addToOrder({
                id: dummy.id,
                content: dummy.content,
              })} >add this bro</button>
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>
            I want to do this bro:
          </legend>


        </fieldset>
      </form>
    </>

  );
}

