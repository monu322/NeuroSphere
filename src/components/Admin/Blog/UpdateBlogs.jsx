import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db, { storage } from "../../../config/fire-config";
import { serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CKEditor from "../../CKEditor";
import PreviewImage from "../../PreviewImage";
import uploadImage from "../../ImageUpload";
import Compressor from "compressorjs";
// import { storage } from "../../../config/fire-config";

const UpdateBlogForm = ({ id }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [blogId] = useState(id);
  const [errMessage, setErrMessage] = useState(null);
  const [notification, setNotification] = useState("");
  const [blogData, setBlogData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPublished, setIsPublished] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [save, setSave] = useState(null);
  const [unpublish, setUnpublish] = useState(false);

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

  const unPublishBlog = async (values, data) => {
    let image = "";
    if (img && values.img) {
      image = values.img;
    } else if (!values.img) {
      image = img;
    }
    const response = await fetch("/api/Blog", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        image,
        data,
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
  const updateBlog = async (values, data) => {
    let image = "";
    setIsPublished(true);
    if (values.img) {
      image = values.img;
    }
    const response = await fetch("/api/Blog", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        image,
        data,
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

  const saveBlog = async (values, data) => {
    let image = "";
    if (values.img) {
      image = values.img;
    }
    const response = await fetch("/api/Blog", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        image,
        data,
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
        await saveBlog(values, data);
        setIsLoading(false);
        setIsSuccess(true);
        setNotification("Blog saved as draft");
        setTimeout(() => {
          router.push("/admin/drafts");
          setNotification("");
        }, 2000);
      } else {
        if (unpublish) {
          await unPublishBlog(values, data);
        } else {
          await updateBlog(values, data);
          setIsLoading(false);
        }
      }
    }
  };

  const handlePreview = (Text) => {
    const slug = Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    console.log("clicked preview");
    const liveWebsiteUrl = "https://www.neurosphere.tech/blog";
    const blogUrl = `${liveWebsiteUrl}/${slug}-1-10-${id}`;
    window.open(blogUrl, "_blank");
  };

  const getBlogDataWithId = async (id) => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setIsPublished(docSnap.data().isPublished);
      setBlogData(docSnap.data());
      setData(docSnap.data().data);
    } else {
      console.log("No such document");
    }
  };
  console.log(blogData.data);

  useEffect(() => {
    if (id) {
      getBlogDataWithId(id);
    }
  }, [id]);
  // useEffect(() => {
  //   console.log("From the update form useeffect" + " " + isPublished);
  // }, [isPublished]);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

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
                      onClick={() => handlePreview(blogData.title)}
                    >
                      Preview
                    </button>
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
                      onClick={() => handlePreview(blogData.title)}
                    >
                      Preview
                    </button>
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
                <div className="col-lg-12 col-md-12 mb-3">
                  <div className="blog-box p-4">
                    {errMessage && (
                      <div className="form_Messages text-danger">
                        {errMessage}
                      </div>
                    )}

                    <div className="controls blog-form">
                      <div className="form-group">
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
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 mb-3">
                  <div className="blog-box p-4">
                    <div className="controls blog-form">
                      <div className="form-group d-flex flex-column">
                        <div>
                          <label htmlFor="postDescriptions">Description</label>
                          <Field
                            required="required"
                            as="textarea"
                            type="text"
                            id="postDescriptions"
                            name="postDescriptions"
                            placeholder="Blog Intro"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 mb-3">
                  <div className="blog-box p-4">
                    <div className="controls blog-form">
                      <div className="form-group d-flex flex-column">
                        <div>
                          <label htmlFor="postDescriptions">Content</label>
                          <CKEditor
                            data={data}
                            name="description"
                            onChange={(data) => {
                              setData(data);
                              setBlogData({ ...blogData, data: data });
                              console.log(blogData);
                            }}
                            editorLoaded={editorLoaded}
                            uploadImage={uploadImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-lg-6 col-md-6">
                  <div className="blog-box p-4 w-100">
                    {errMessage && <div className="messages">{errMessage}</div>}

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
                <div className="col-lg-6 col-md-6">
                  <div className="blog-box p-4 w-100">
                    {errMessage && <div className="messages">{errMessage}</div>}

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
                        {values.posterAvatar && (
                          <PreviewImage file={values.posterAvatar} />
                        )}
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
                      {/* <div className="form-group d-flex flex-column">
                        <label htmlFor="postMeta">Post Meta</label>

                        <Field
                          id="postMeta"
                          type="text"
                          name="postMeta"
                          placeholder="Post Meta"
                          className="border border-secondary"
                        />
                      </div> */}
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
