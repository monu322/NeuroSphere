import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db, { storage } from "../../../config/fire-config";
import { serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UpdateBlogForm = ({ id }) => {
  const [blogId] = useState(id);
  const [tags, setTags] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [blogData, setBlogData] = useState("");

  const router = useRouter();
  const initialValues = {
    title: blogData?.title || "",
    tags: blogData?.tags || [""],
    content: blogData?.content || "",
    authorInfo: {
      name: blogData?.authorInfo?.name || "",
      about: blogData?.authorInfo?.about || "",
    },
    file: blogData?.file || null,
  };

  const validateForm = (formValues) => {
    if (!formValues.title || !formValues.tags || !formValues.content) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    if (formValues.title.length < 5) {
      setErrMessage("Title must be at least 5 characters");
      return false;
    }
    if (formValues.tags.length < 2) {
      setErrMessage("Tags must be atleast two characters");
      return false;
    }
    if (formValues.content.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }

    if (!formValues.file) {
      setErrMessage("Please select an image file");
      return false;
    }
    // if (!formValues.file.type.startsWith("image/")) {
    //   setErrMessage("Please select an image");
    //   return false;
    // }
    return true;
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
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

  const updateBlog = async ({ title, content, authorInfo, file }, tags) => {
    const storageRef = ref(storage, `blogImages/${file.name + file.size}`);
    const imgUpload = await uploadBytes(storageRef, file);
    const imageURL = await getDownloadURL(storageRef);
    const docRef = doc(db, "blogs", blogId);
    await updateDoc(docRef, {
      title,
      tags,
      content,
      authorInfo,
      file: imageURL,
      date: serverTimestamp(),
    });
    setNotification("Blogpost updated successfully");
    clearNotification();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (validateForm(values)) {
      setErrMessage(null);
      setSubmitting(false);
      updateBlog(values, tags);
      setTimeout(() => {
        router.push("/admin");
        setNotification("");
      }, 2000);
    }
  };

  const getBlogDataWithId = async (id) => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBlogData(docSnap.data());
    } else {
      console.log("No such document");
    }
  };
  console.log(blogData);

  useEffect(() => {
    if (id) {
      getBlogDataWithId(id);
    }
  }, [id]);

  return (
    <>
      {/* <section className="page-header crs"> */}
      <div className="container mt-2">
        {notification && <div className="notification">{notification}</div>}
        <div className="row">
          <div className="col-lg-12 text-dark mb-3 blg-head">Update Blog</div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-lg-7 col-md-7">
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
                            value={values.tags}
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
                        <span>Update</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-3 w-25">
                  <div className="row">
                    <div className="blog-box p-4 w-100 mb-3">
                      <h4 className="text-dark">Author Info</h4>

                      {errMessage && (
                        <div className="messages">{errMessage}</div>
                      )}

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
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue("file", event.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="blog-box p-4 w-100">
                      <Image
                        src={initialValues.file}
                        height={500}
                        width={500}
                        alt="blog image"
                        className="w-45 h-45"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UpdateBlogForm;
