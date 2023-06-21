'use client'
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import LoadingButton from "./LoadingButton";

let hostname = 'http://neurosphere.tech'

if (typeof window !== 'undefined') {
  hostname = window.location.origin;
}

console.log(hostname)

const url = hostname+"/api/contact"
const ContactForm = () => {
 /* const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });*/
  const [initialValues, setInitialValues] = useState({
    name:"",
    email:"",
    message:""
  }) 


  
  const [errMessage, setErrMessage] = useState(null);
  const [isLoading, setIsLoading]= useState(false);

  const validateForm = (formValues) => {
    if (!formValues.name || !formValues.email || !formValues.message) {
      setErrMessage('Please fill in all fields');
      return false;
    }
    if (formValues.name.length < 3) {
      setErrMessage('Name must be at least 3 characters');
      return false;
    }
    if (formValues.message.length < 10) {
      setErrMessage('Message must be at least 10 characters');
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
      setErrMessage('Email is invalid');
      return false;
    }
    return true;
  }

  const handleSubmit = (values, { setSubmitting, resetForm }) => 
  {
    if (validateForm(values)) 
    {
      setErrMessage(null);
      setSubmitting(false);
      setIsLoading(true);

      console.log('sending', values)

      fetch(url, {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then((res)=>{
        console.log(res.json())
        console.log('Response received')
        if (res.status === 200){
          console.log('Response succeeded')
          setTimeout(()=>{
            setIsLoading(false)
            setErrMessage('Your form has been submitted!')
            resetForm();
          },1000)
        }
      })
    }
    
  };

  return (
    <div className="col-lg-6">
      <div className="form md-mb50">
        <h4 className="extra-title mb-50">Get In Touch.</h4>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >{({
         values,
         handleChange,}) => (
          <Form>

            <div className="controls">
              <div className="form-group">
                <Field
                  id="form_name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required="required"
                  value = {values.name}
                  onChange = {handleChange}
                />
              </div>

              <div className="form-group">
                <Field
                  id="form_email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required="required"
                  value = {values.email}
                  onChange = {handleChange}
                />
              </div>

              <div className="form-group">
                <Field
                  as="textarea"
                  id="form_message"
                  name="message"
                  placeholder="Message"
                  rows="4"
                  required="required"
                  value = {values.message}
                  onChange = {handleChange}
                />
              </div>
              { 
                isLoading? <LoadingButton/> :
                <div className="row">
                  <div className="col col-lg-6">
                    <button type="submit" className="btn-curve btn-lit"><span>Send Message</span></button>
                  </div>
                  <div className="col col-lg-6">
                  {
                    errMessage && <div className="formMessages">{ errMessage }</div>
                  }
                  </div>
                  
                </div>
              }
              
              </div>
          </Form>
       )}
        </Formik>
      </div>
    </div>
  )
}

export default ContactForm