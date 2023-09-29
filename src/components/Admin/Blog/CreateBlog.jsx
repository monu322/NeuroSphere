import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import CKEditor from "../../CKEditor";
import PreviewImage from "../../PreviewImage";
import uploadImage from "../../ImageUpload";
import { storage } from "../../../config/fire-config";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function CreateBlog() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [notification, setNotification] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  const router = useRouter();
  const initialValues = {
    img: "",
    title: "",
    tags: "",
    posterAvatar: "",
    posterName: "",
    postDescriptions: "",
    postMeta: "",
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const publishBlog = async (values, data) => {
    try {
      let image = "";
      if (values.img) {
        const compressedImg = await new Promise((resolve) => {
          new Compressor(values.img, {
            maxWidth: 1500,
            quality: 0.8,
            success(result) {
              resolve(result);
            },
            error(err) {
              console.error("Image compression error:", err);
              resolve(values.img);
            },
          });
        });

        const storageRef = ref(storage, `blogImages/${compressedImg.name}`);
        await uploadBytes(storageRef, compressedImg);
        image = await getDownloadURL(storageRef);
      }

      const response = await fetch("/api/Blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values,
          image,
          data,
          isPublished,
        }),
      });

      const { message, error } = await response.json();
      !error ? setNotification(message) : setNotification(error);
      clearNotification();
    } catch (error) {
      console.error("Error publishing blog:", error);
      setNotification("Error publishing blog");
      clearNotification();
    }
  };

  const saveBlog = async (values, data) => {
    try {
      let image = "";
      if (values.img) {
        const compressedImg = await new Promise((resolve) => {
          new Compressor(values.img, {
            maxWidth: 1500,
            quality: 0.8,
            success(result) {
              resolve(result);
            },
            error(err) {
              console.error("Image compression error:", err);
              resolve(values.img);
            },
          });
        });

        const storageRef = ref(storage, `blogImages/${compressedImg.name}`);
        await uploadBytes(storageRef, compressedImg);
        image = await getDownloadURL(storageRef);
      }
      const response = await fetch("/api/Blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
          image,
          values,
          isPublished,
        }),
      });

      const { message, error } = await response.json();
      if (error) {
        setNotification(error);
      } else {
        setNotification(message);
      }
      clearNotification();
    } catch (error) {
      console.error("Error saving blog:", error);
      setNotification("Error saving blog");
      clearNotification();
    }
  };
  //   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //     try {
  //       if (validateForm(values)) {
  //         setErrMessage(null);
  //         setSubmitting(false);
  //         if (isPublished) {
  //           await publishBlog(values, postContent);
  //           setNotification("Blog published");
  //         } else {
  //           await saveBlog(values, postContent);
  //           setNotification("Blog saved as draft");
  //         }

  //         resetForm();
  //         setTimeout(() => {
  //           router.push("/admin/blog");
  //           setNotification("");
  //         }, 2000);
  //       }
  //     } catch (error) {
  //       setNotification(error);
  //       clearNotification();
  //     }
  //   };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (isPublished) {
        await publishBlog(values, data);
        setNotification("Blog published");
      } else {
        await saveBlog(values, data);
        setNotification("Blog saved as draft");
      }

      // resetForm();
      // setTimeout(() => {
      //   router.push("/admin/blog");
      //   setNotification("");
      // }, 2000);
    } catch (error) {
      setNotification(error);
      clearNotification();
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting, setFieldValue, submitForm }) => (
          <Form>
            <div className="d-flex justify-content-between fix-top">
              <div className="text-dark pb-2 blg-head">Create Blog</div>
              <div>
                <button
                  type="button"
                  className="btn-blog mr-3"
                  onClick={() => {
                    setIsPublished(false);
                    submitForm();
                  }}
                >
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  className="btn-blog"
                  onClick={() => {
                    setIsPublished(true);
                    submitForm();
                  }}
                >
                  <span>Publish</span>
                </button>
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
                        <label htmlFor="title">Title</label>
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
                          <label htmlFor="content">Content</label>
                          <CKEditor
                            name="content"
                            onChange={(data) => {
                              setData(data);
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
                        {values.img && <PreviewImage file={values.img} />}
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
}
