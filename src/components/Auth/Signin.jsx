import db, { auth, googleProvider } from "../../config/fire-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthProvider";

let role = "";

const Signin = () => {
  const router = useRouter();
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState();

  const authInfo = useContext(AuthContext);
  console.log(authInfo);

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

  const signInWithGoogle = async () => {
    const user = await signInWithPopup(auth, googleProvider);
    router.push("/");
  };

  const signInWithEmail = async ({ email, password }) => {
    const user = await signInWithEmailAndPassword(auth, email, password);

    const q = query(
      collection(db, "users"),
      where("userId", "==", user.user.uid)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      role = doc.data().role;
      console.log(role);
    });
    authInfo.user = role;
    authInfo.isLoggedIn = true;
    localStorage.setItem("authInfo", JSON.stringify(authInfo));
    setTimeout(() => {
      setNotification("");
    }, 2000);

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (validateForm(values)) {
      console.log(JSON.stringify(values));
      setErrMessage(null);
      setSubmitting(false);
      signInWithEmail(values);
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
                    {errMessage && (
                      <div className="form__errormessages">{errMessage}</div>
                    )}

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

                      <button type="submit" className="log-btn w-full">
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
              <p className="text-center mt-1 mb-1 text-white">or</p>
              <button
                onClick={signInWithGoogle}
                type="submit"
                className="google-btn bg-primary"
              >
                <span className="mx-auto">Continue with google</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
