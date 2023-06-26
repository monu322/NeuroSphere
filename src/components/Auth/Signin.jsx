import db from "../../config/fire-config";
import { collection, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";

const Signin = () => {
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState();

  const initialValues = {
    email: "",
    password: "",
  };

  const validateForm = (formValues) => {
    if (!formValues.email || !formValues.password) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
      setErrMessage("Email is invalid");
      return false;
    }
    if (formValues.password.length < 7) {
      setErrMessage("Message must be at least 7 characters");
      return false;
    }
    return true;
  };

  //   const authenticate = async ({ email, password }) => {
  //     const userCollection = collection(db, "users");
  //     const user = await getDoc(userCollection, email);
  //     console.log(user);
  //     if (user.exists()) {
  //       console.log("Document data:", user.data());
  //     } else {
  //       user.data();
  //       console.log("No such document!");
  //     }
  //     console.log(user);
  //     setNotification("User Verified");
  //     setTimeout(() => {
  //       setNotification("");
  //     }, 2000);
  //   };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (validateForm(values)) {
      console.log(JSON.stringify(values));
      setErrMessage(null);
      setSubmitting(false);
      //   authenticate(values);
      resetForm();
    }
  };
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="cont">
            <div className="login border-secondary bg-gray mx-auto p-4">
              <h4 className="text-center text-xl">Sign in</h4>
              <div className="">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form>
                    {errMessage && <div className="messages">{errMessage}</div>}

                    <div className="controls blog-form">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Tag">Email</label>
                        <Field
                          id="form_tag"
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          required="required"
                          className="input"
                        />
                      </div>

                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Tag">Password</label>
                        <Field
                          id="form_tag"
                          type="password"
                          name="password"
                          placeholder="*********"
                          required="required"
                          className="input"
                        />
                      </div>

                      <button type="submit" className="log-btn">
                        <span>Sign in</span>
                      </button>

                      <div className="d-flex justify-content-between text-secondary fs-6">
                        <Link href="/forgot-password">
                          <a className="fgt-pswd">Forgot Password</a>
                        </Link>
                        <Link href="/auth/signup">
                          <a className="link-to">
                            <span>New user?</span> Sign up
                          </a>
                        </Link>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
