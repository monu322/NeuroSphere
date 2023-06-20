'use client'
import { useState } from "react";
import { Formik, Form, Field } from "formik";


const url = "http://localhost:3000/api/contact"
const ContactForm = () => {
 /* const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });*/
  const initialValues = {
    name:"",
    email:"",
    message:""
  }
  
  const [errMessage, setErrMessage] = useState(null);

  const validateForm = (formValues) => {
    if (!formValues.name || !formValues.email || !formValues.message) {
      setErrMessage('Please fill in all fields');
      return false;
    }
    if (formValues.name.length < 5) {
      setErrMessage('Name must be at least 5 characters');
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

  const handleSubmit = (values, { setSubmitting }) => {
    debugger
    if (validateForm(values)) {
      setErrMessage(null);
      setTimeout(() => {
        setSubmitting(false);
        
      }, 400);
    }
    console.log('sending')
    console.log(values)
/*let item ={name:"",email:"",message:""}
    console.log(item)*/
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
        setSubmitting(true)
        
      }
    }).then((data)=>{console.log(data)})
  };

  return (
    <div className="col-lg-6">
      <div className="form md-mb50">
        <h4 className="extra-title mb-50">Get In Touch.</h4>

        <Formik
         /* initialValues={{
            name: "",
            email: "",
            message: ""
          }}*/
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
            {({
         values,
         handleChange,
       
       }) => (
          <Form>
            {
              errMessage && <div className="messages">{ errMessage }</div>
            }

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

              <button type="submit" className="btn-curve btn-lit"><span>Send Message</span></button>
            </div>
          </Form>
       )}
        </Formik>
      </div>
    </div>
  )
}

export default ContactForm