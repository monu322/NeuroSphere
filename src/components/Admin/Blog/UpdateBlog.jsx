import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db, { storage } from "../../../config/fire-config";
import { serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PreviewImage from "../../PreviewImage";

const UpdateBlogForm = ({ id }) => {
  const [blogId] = useState(id);
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [blogData, setBlogData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPublished, setIsPublished] = useState(null);
  const [save, setSave] = useState(null);
  const [unpublish, setUnpublish] = useState(false);
  const [postContent, setPostContent] = useState([
    { heading: "", paragraphs: "", paragraphsImg: "" },
  ]);

  const router = useRouter();
  const initialValues = {
    img: blogData?.img || "",
    title: blogData?.title || "",
    tags: Array.isArray(blogData?.tags)
      ? blogData.tags.join(",")
      : blogData?.tags || "",
    posterAvatar: blogData?.posterAvatar || "",
    posterName: blogData?.posterName || "",
    postDescriptions: blogData?.postDescriptions || "",
    postMeta: blogData?.postMeta || "",
  };

  const validateForm = (formValues) => {
    if (!formValues.title || !formValues.postDescriptions) {
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
    if (formValues.postDescriptions.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }

    if (!formValues.img) {
      setErrMessage("Please select an image file");
      return false;
    }
    // if (!formValues.img.type.startsWith("image/")) {
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

  const handlePostContentChange = (index, field, value) => {
    let postData = [...postContent];
    postData[index][field] = value;
    setPostContent(postData);
  };

  const handleImageUpload = async (index, event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `blogImages/${file.name + file.size}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    handlePostContentChange(index, "paragraphsImg", imageUrl);
  };
  const addPostContent = () => {
    const newPostContent = { heading: "", paragraphs: "", paragraphsImg: "" };

    setPostContent([...postContent, newPostContent]);
  };

  const unPublishBlog = async (values, postContent) => {
    let image;
    if (values.img) {
      const storageRef = ref(
        storage,
        `blogImages/${values.img.name + values.img.size}`
      );
      await uploadBytes(storageRef, values.img);
      image = await getDownloadURL(storageRef);
    }
    const response = await fetch("/api/Blog", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        image,
        postContent,
        blogId,
        unpublish,
      }),
    });
    if (response.ok) {
      setIsSuccess(true);
    }
    const { message, error } = await response.json();
    !error ? setNotification(message) : setNotification(error);
    clearNotification();
    // router.push("/admin/blog");
  };
  const updateBlog = async (values, postContent) => {
    let image;
    setIsPublished(true);
    if (values.img) {
      const storageRef = ref(
        storage,
        `blogImages/${values.img.name + values.img.size}`
      );
      await uploadBytes(storageRef, values.img);
      image = await getDownloadURL(storageRef);
    }
    const response = await fetch("/api/Blog", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        image,
        postContent,
        blogId,
        isPublished,
      }),
    });
    if (response.ok) {
      setIsSuccess(true);
    }
    const { message, error } = await response.json();
    !error ? setNotification(message) : setNotification(error);
    clearNotification();
    // router.push("/admin/blog");
  };

  const saveBlog = async (values, postContent) => {
    let image;
    if (values.img) {
      const storageRef = ref(
        storage,
        `blogImages/${values.img.name + values.img.size}`
      );
      await uploadBytes(storageRef, values.img);
      image = await getDownloadURL(storageRef);
    }
    const response = await fetch("/api/Blog", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        image,
        postContent,
        blogId,
        isPublished,
      }),
    });
    if (response.ok) {
      setIsSuccess(true);
      setIsLoading(false);
    }
    const { message, error } = await response.json();
    if (error) {
      setNotification(error);
    } else {
      setNotification(message);
    }
    clearNotification();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    if (validateForm(values)) {
      setErrMessage(null);
      setSubmitting(false);

      if (save) {
        await saveBlog(values, postContent);
        setIsLoading(false);
        setIsSuccess(true);
        setNotification("Blog saved as draft");
        setTimeout(() => {
          router.push("/admin/drafts");
          setNotification("");
        }, 2000);
      } else {
        if (unpublish) {
          await unPublishBlog(values, postContent);
        } else {
          await updateBlog(values, postContent);
          setIsLoading(false);
        }
      }
    }
  };

  const getBlogDataWithId = async (id) => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setIsPublished(docSnap.data().isPublished);
      setBlogData(docSnap.data());
      if (docSnap.data()?.postContent) {
        setPostContent(docSnap.data().postContent);
      }
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
  useEffect(() => {
    console.log("From the update form useeffect" + " " + isPublished);
  }, [isPublished]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, isSubmitting, setFieldValue, submitForm }) => (
          <Form>
            <div className="d-flex justify-content-between fix-top">
              {isPublished === false ? (
                <div className="text-dark pb-2 blg-head"> Saved Blogs</div>
              ) : (
                <div className="text-dark pb-2 blg-head"> Update Blog</div>
              )}
              <div>
                {isPublished === false ? (
                  <>
                    <button
                      type="button"
                      className="btn-blog mr-3"
                      onClick={() => {
                        setSave(true);
                        submitForm();
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn-blog"
                      onClick={() => {
                        setIsPublished(true);
                        submitForm();
                      }}
                    >
                      Publish
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn-blog mr-3"
                      onClick={() => {
                        setUnpublish(true);
                        submitForm();
                      }}
                    >
                      <span>Unpublish</span>
                    </button>
                    <button
                      type="button"
                      className="btn-blog"
                      onClick={() => {
                        submitForm();
                      }}
                    >
                      <span>Update</span>
                    </button>
                  </>
                )}
                {isLoading && (
                  <i className="fas fa-spinner fa-spin spinner"></i>
                )}
                {isSuccess && <i className="fas fa-check check"></i>}
              </div>
            </div>
            <div className="container mt-2 mb-4">
              {notification && (
                <div className="notification">{notification}</div>
              )}

              <div className="row blg__form--pad">
                <div className="col-lg-7 col-md-7">
                  <div className="blog-box p-4">
                    {errMessage && (
                      <div className="form_Messages text-danger">
                        {errMessage}
                      </div>
                    )}

                    <div className="controls blog-form">
                      <div className="form-group d-flex flex-column">
                        <label htmlFor="Title">Blog Title</label>
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
                          <label htmlFor="postDescriptions">
                            Post Description
                          </label>
                          <Field
                            required="required"
                            as="textarea"
                            type="text"
                            id="postDescriptions"
                            name="postDescriptions"
                            placeholder="Post Description"
                          />
                        </div>
                      </div>

                      <div className="form-group d-flex flex-column">
                        <h4 className="text-dark">Post Content</h4>
                        {postContent?.map((post, index) => {
                          return (
                            <div key={index} className="controls blog-form">
                              <div className="form-group d-flex flex-column">
                                <label htmlFor="heading">
                                  Heading {index + 1}
                                </label>
                                <input
                                  id="heading"
                                  type="text"
                                  value={post.heading}
                                  onChange={(event) =>
                                    handlePostContentChange(
                                      index,
                                      "heading",
                                      event.target.value
                                    )
                                  }
                                  placeholder="Post Heading"
                                  className="border border-secondary"
                                />
                              </div>

                              <div className="form-group d-flex flex-column">
                                <label htmlFor="paragraphs">
                                  Paragraphs {index + 1}
                                </label>
                                <textarea
                                  id="paragraphs"
                                  value={post.paragraphs}
                                  onChange={(event) =>
                                    handlePostContentChange(
                                      index,
                                      "paragraphs",
                                      event.target.value
                                    )
                                  }
                                  placeholder="Post Paragraphs"
                                  className="border border-secondary post_para"
                                />
                              </div>
                              <div className="form-group d-flex flex-column">
                                {post.paragraphsImg && (
                                  <PreviewImage imgUrl={post.paragraphsImg} />
                                )}
                                <label htmlFor="Tag">
                                  Add Paragrapgh Image
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(event) => {
                                    handleImageUpload(index, event);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                        <button
                          onClick={addPostContent}
                          type="button"
                          className="btn_post-content"
                          // disabled={isButtonDisabled}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-4">
                  <div className="row">
                    <div className="blog-box p-4 w-100 mb-3">
                      {errMessage && (
                        <div className="messages">{errMessage}</div>
                      )}

                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="Tag">Tags</label>
                          <Field
                            type="text"
                            id="tags"
                            placeholder="Tags"
                            name="tags"
                          />
                        </div>
                        <div className="form-group d-flex flex-column">
                          {values.img && <PreviewImage imgUrl={values.img} />}
                          {!values.img ? (
                            <label htmlFor="Tag">Add Image</label>
                          ) : (
                            <p>Post Image</p>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue("img", event.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="blog-box p-4 w-100 mb-3">
                      {errMessage && (
                        <div className="messages">{errMessage}</div>
                      )}

                      <div className="controls blog-form">
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="posterName">Author Name</label>
                          <Field
                            id="posterName"
                            type="text"
                            name="posterName"
                            placeholder="Poster Name"
                            className="border border-secondary"
                          />
                        </div>
                        <div className="form-group d-flex flex-column">
                          {/* {values.posterAvatar && (
                            <PreviewImage file={values.posterAvatar} />
                          )} */}
                          {!values.posterAvatar ? (
                            <label htmlFor="Tag">Add Avatar</label>
                          ) : (
                            <p></p>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue(
                                "posterAvatar",
                                event.target.files[0]
                              );
                            }}
                          />
                        </div>
                        <div className="form-group d-flex flex-column">
                          <label htmlFor="postMeta">Post Meta</label>

                          <Field
                            id="postMeta"
                            type="text"
                            name="postMeta"
                            placeholder="Post Meta"
                            className="border border-secondary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateBlogForm;
