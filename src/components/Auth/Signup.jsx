import db, { auth, googleProvider } from "../../config/fire-config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthProvider";

let role = "";
const Signup = () => {
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState();

  const router = useRouter();
  const { roleInfo, user, handleLogin } = useContext(AuthContext);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validateForm = (formValues) => {
    if (!formValues.name || !formValues.email || !formValues.password) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    if (formValues.name.length < 3) {
      setErrMessage("Name must be at least 3 characters");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
      setErrMessage("Email is invalid");
      return false;
    }
    if (formValues.password.length < 7) {
      setErrMessage("Password must be at least 7 characters");
      return false;
    }
    return true;
  };

  const signInWithGoogle = async () => {
    const user = await signInWithPopup(auth, googleProvider);
    const userCollection = collection(db, "users");
    const q = query(
      collection(db, "users"),
      where("userId", "==", user.user.uid)
    );
    const querySnapshot = await getDocs(q);
    const isAlreadyExist = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().length > 0) {
        role = doc.data().role;
        isAlreadyExist = true;
      }
    });
    if (!isAlreadyExist) {
      const data = await addDoc(userCollection, {
        userId: user?.user.uid,
        role: "user",
      });
      role = "user";
    }

    handleLogin(role);
    router.push("/");
  };

  const createUser = async ({ name, email, password }) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user.user.uid);
    const userCollection = collection(db, "users");
    const data = await addDoc(userCollection, {
      userId: user?.user.uid,
      role: "user",
    });
    await signOut(auth);
    setNotification("Account created successfully");
    setTimeout(() => {
      setNotification("");
    }, 2000);
    router.push("/auth/signin");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (validateForm(values)) {
      console.log(JSON.stringify(values));
      setErrMessage(null);
      setSubmitting(false);
      createUser(values);
    }
  };

  useEffect(() => {
    if (user && roleInfo === "admin") router.push("/admin");
    if (user && roleInfo === "user") router.push("/");
  }, [user]);
  return (
    <>
      {!user && (
        <section className="page-header">
          <div className="container">
            <div className="signup__cont">
              <div className="login border-secondary bg-gray mx-auto p-4">
                <h4 className="text-center text-xl">Sign up</h4>
                <div className="">
                  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                      {errMessage && (
                        <div className="form__errorMessage">{errMessage}</div>
                      )}

                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="Title">Name</label>
                          <Field
                            id="form_title"
                            type="text"
                            name="name"
                            placeholder="Blog Title"
                            required="required"
                            className="input"
                          />
                        </div>

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
                          <span>Sign up</span>
                        </button>
                        <div className=" text-center text-secondary">
                          <Link href="/auth/signin">
                            <a className="link-to">
                              <span>Aready a user?</span> Sign in
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
      )}
    </>
  );
};

export default Signup;
