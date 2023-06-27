import React, { useState} from 'react'
import { Field, Form, Formik } from 'formik';

 const WorkForm = () => {

    const [errMessage, setErrMessage] = useState(null);

    const initialValues = {
        type: " ",
        link: " ",
        img:  " ",
        wideImg: " ",
        title: " ",
        description: " ",
        tags: " ",
        objective: " ",
        servicesIntro: " ",
        services: " ",
        outcomeText: " ",
        outcomes: " "
    };

    const validateForm = (formValues) => {
        if (!formValues.type || !formValues.title || !formValues.description || !formValues.tags || !formValues.objective || !formValues.servicesIntro || !formValues.services || !formValues.outcomeText || !formValues.outcomes) {
          setErrMessage("Please fill in all fields");
          return false;
        }
        if (formValues.type.length < 5) {
          setErrMessage("Name must be at least 5 characters");
          return false;
        }
        if (formValues.title.length < 5) {
          setErrMessage("Name must be at least 5 characters");
          return false;
        }
        if (formValues.description.length < 10) {
          setErrMessage("Message must be at least 10 characters");
          return false;
        }
        if (formValues.tags.length < 5) {
            setErrMessage("Name must be at least 5 characters");
            return false;
        }
        if (formValues.objective.length < 10) {
            setErrMessage("Message must be at least 10 characters");
            return false;
        }
        if (formValues.servicesIntro.length < 10) {
            setErrMessage("Message must be at least 10 characters");
            return false;
        }
        if (formValues.services.length < 10) {
            setErrMessage("Message must be at least 10 characters");
            return false;
        }
        if (formValues.outcomeText.length < 10) {
            setErrMessage("Message must be at least 10 characters");
            return false;
        }
        if (formValues.outcomes.length < 10) {
            setErrMessage("Message must be at least 10 characters");
            return false;
        }
        return true;
      };

      const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (validateForm(values)) {
            console.log(values)
          (JSON.stringify(values));
          setErrMessage(null);
          setSubmitting(false);
          resetForm();
        }
      };

  return (
    <>
          <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-9">
            <div className="cont text-center h2">Create Work</div>

            <div className="border border-secondary rounded border-2 p-4 w-75">
              {" "}
              {/* mb-100 */}
              <Formik
                const
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >{({
                values,
                setFieldValue}) => (
                <Form>
                  {errMessage && <div className="messages">{errMessage}</div>}

                  <div className="controls blog-form">
                    <div className="form-group d-flex flex-column">
                      <label htmlFor="Type">Type</label>
                      <Field
                        id="form_type"
                        type="text"
                        name="type"
                        placeholder="Work Type"
                        required="required"
                        value={values.type}
                      />
                    </div>

                    {/*<div className="form-group d-flex flex-column">
                      <label htmlFor="image"> Upload File </label>
                      <Field
                        id="form_img"
                        type="file"
                        name="img"
                        placeholder="image"
                        accept = "image/*"
                        required="required"
                        onChange= {(e)=>{Formik.setFieldValue("img",e.currentTarget.files[0])}}
                      />
                </div>*/}
                
                <div className="form-group d-flex flex-column">
                      <label htmlFor="Title">Title</label>
                      <Field
                        id="form_Title"
                        type="text"
                        name="title"
                        placeholder="Work Title"
                        required="required"
                        value={values.title}
                      />
                    </div>

                    <div className="form-group d-flex flex-column">
                      <label htmlFor="description">Description</label>
                      <Field
                        as="textarea"
                        id="form_description"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        required="required"
                        value={values.description}
                      />
                    </div>

                    <div className="form-group d-flex flex-column">
                      <label htmlFor="Tags">Tags</label>
                      <Field
                        id="form_tags"
                        type="text"
                        name="tags"
                        placeholder="Work Tag"
                        required="required"
                        value={values.tags}
                      />
                    </div>

                    <div className="form-group d-flex flex-column">
                      <label htmlFor="objective">Objective</label>
                      <Field
                        as="textarea"
                        id="form_objective"
                        name="objective"
                        placeholder="Objective"
                        rows="4"
                        required="required"
                        value={values.objective}
                      />
                    </div>

                    <div className="form-group d-flex flex-column">
                      <label htmlFor="servicesIntro">ServicesIntro</label>
                      <Field
                        as="textarea"
                        id="form_servicesIntro"
                        name="servicesIntro"
                        placeholder="ServicesIntro"
                        rows="4"
                        required="required"
                        value={values.servicesIntro}
                      />
                    </div>

                    <div className="form-group d-flex flex-column">
                      <label htmlFor="services">Services</label>
                      <Field
                        as="textarea"
                        id="form_services"
                        name="services"
                        placeholder="Services"
                        rows="4"
                        required="required"
                        value={values.services}
                      />
                    </div>

                    <div className="form-group d-flex flex-column">
                      <label htmlFor="outcomeText">outcomeText</label>
                      <Field
                        as="textarea"
                        id="form_outcomeText"
                        name="outcomeText"
                        placeholder="OutcomeText"
                        rows="4"
                        required="required"
                        value={values.outcomeText}
                      />
                    </div>
                    
                    <div className="form-group d-flex flex-column">
                      <label htmlFor="outcomes">outcomes</label>
                      <Field
                        as="textarea"
                        id="form_outcomes"
                        name="outcomes"
                        placeholder="outcomes"
                        rows="4"
                        required="required"
                        value={values.outcomes}
                      />
                    </div>

                    <button type="submit" className="btn-curve btn-lit">
                      <span>Create</span>
                    </button>
                  </div>
                </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default WorkForm;
