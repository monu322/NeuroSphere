import { useState } from "react";
import { Formik, Form, Field } from "formik";

const PostCommentsForm = ({ SingleBlog }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: ""
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      setFormData(values);
    }, 400);
  };

  return (
    <div className="comment-form">
      <h5>Add Comment :</h5>
      <div className="form">
        <Formik
          initialValues={{
            name: "",
            email: "",
            comment: ""
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <Field
                    as="textarea"
                    id="form_comment"
                    name="comment"
                    placeholder="Your Comment"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Field
                    id="form_name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Field
                    id="form_email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <button className="btn-curve btn-color btn-lg" type="submit"><span>Submit</span></button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default PostCommentsForm