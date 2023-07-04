import db from "../../../config/fire-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";

const BlogForm = () => {
  const [tags, setTags] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState();

  const router = useRouter();
  const initialValues = {
    title: "",
    tags: [""],
    content: "",
    authorInfo: {
      name: "",
      about: "",
    },
    file: "",
  };

  const validateForm = (formValues) => {
    if (!formValues.title || !formValues.tags || !formValues.content) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    if (formValues.title.length < 5) {
      setErrMessage("Name must be at least 5 characters");
      return false;
    }
    if (formValues.tags.length < 5) {
      setErrMessage("Name must be at least 5 characters");
      return false;
    }
    if (formValues.content.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }

    // if (!formValues.file) {
    //   setErrMessage("Please select an image file");
    //   return false;
    // }
    // if (!formValues.file.type.startswith("image/")) {
    //   setErrMessage("Please select an image");
    //   return false;
    // }
    return true;
  };

  const handleTagKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " " || event.key === ",") {
      event.preventDefault();

      const tagValue = event.target.value.trim();
      if (tags.includes(tagValue)) return null;
      if (tagValue) {
        setTags((prevTags) => [...prevTags, tagValue]);
        event.target.value = "";
      }
    }
  };

  const handleTagRemove = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const createBlog = async ({ title, tags, content, authorInfo }) => {
    const blogCollection = collection(db, "blogs");
    const res = await addDoc(blogCollection, {
      title,
      tags,
      content,
      authorInfo,
      date: serverTimestamp(),
    });
    setNotification("Blogpost created successfully");
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (validateForm(values)) {
      console.log(JSON.stringify(values));
      setErrMessage(null);
      setSubmitting(false);
      createBlog(values);
      resetForm();
      setTimeout(() => {
        router.push("/admin");
        setNotification("");
      }, 2000);
    }
  };
  return (
    <>
      {/* <section className="page-header crs"> */}
      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-12 text-dark mb-3 blg-head">Create Blog</div>
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="row">
              <div className="col-lg-7 col-md-7">
                {notification}

                <div className="blog-box p-4">
                  {errMessage && (
                    <div className="form_Messages text-danger">
                      {errMessage}
                    </div>
                  )}

                  <div className="controls blog-form">
                    <div className="form-group d-flex flex-column">
                      <label htmlFor="Title">Title</label>
                      <Field
                        id="form_title"
                        type="text"
                        name="title"
                        placeholder="Blog Title"
                        required="required"
                        className="border border-secondary"
                      />
                    </div>

                    <div className="form-group d-flex flex-column">
                      <div>
                        <label htmlFor="Tag">Tag</label>
                        <Field
                          type="text"
                          id="tags"
                          name="tags"
                          placeholder="Tags"
                          onKeyDown={handleTagKeyDown}
                        />
                        <div>
                          {tags.map((tag, index) => (
                            <span className="tag" key={index}>
                              {tag}
                              <button
                                type="button"
                                className="tag-remove"
                                onClick={() => handleTagRemove(index)}
                              >
                                X
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="form-group d-flex flex-column">
                      <label htmlFor="content">Content</label>
                      <Field
                        as="textarea"
                        id="form_content"
                        name="content"
                        placeholder="Content"
                        rows="4"
                        required="required"
                      />
                    </div>

                    <button type="submit" className="btn-blog">
                      <span>Create</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-3 w-25">
                <div className="row">
                  <div className="blog-box p-4 w-100 mb-3">
                    <h4 className="text-dark">Author Info</h4>

                    {errMessage && <div className="messages">{errMessage}</div>}

                    <div className="controls blog-form">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Title">Name</label>
                        <Field
                          id="form_author_name"
                          type="text"
                          name="authorInfo.name"
                          placeholder="John Doe"
                          required="required"
                          className="border border-secondary"
                        />
                      </div>

                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Tag">About</label>
                        <Field
                          id="form_author_about"
                          type="text"
                          name="authorInfo.about"
                          placeholder="Technology, Real Estate"
                          required="required"
                        />
                      </div>
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Tag">Add Image</label>
                        <Field
                          type="file"
                          id="file"
                          name="file"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="blog-box p-4 w-100">
                    <h4 className="text-dark">Author Info</h4>

                    {errMessage && <div className="messages">{errMessage}</div>}

                    <div className="controls blog-form">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Title">Name</label>
                        <Field
                          id="form_title"
                          type="text"
                          name="title"
                          placeholder="Blog Title"
                          required="required"
                          className="border border-secondary"
                        />
                      </div>

                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Tag">About</label>
                        <Field
                          id="form_tag"
                          type="text"
                          name="tags"
                          placeholder="Technology, Real Estate"
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default BlogForm;
