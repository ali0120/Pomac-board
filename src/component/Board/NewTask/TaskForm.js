import React, { useState } from "react";
import { Button, Modal, FormGroup, FormLabel } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./NewTask.css";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().nullable().required("Start Date is required"),
});

function TaskForm(props) {
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  const options = [
    { value: 'Ali', label: 'Ali' },
    { value: 'Ahmed', label: 'Ahmed' },
  ]
  return (
    <>

      <Formik
        initialValues={props.editedValues || props.initialValues}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Modal show={props.show} onHide={props.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>New Task</Modal.Title>
              </Modal.Header>
              <Form>
                <Modal.Body>
                  <FormGroup>
                    <FormLabel>Title</FormLabel>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className={`form-control ${formik.touched.title && formik.errors.title
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="title"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      className={`form-control ${formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                        }`}
                      as="textarea"
                    />
                    <ErrorMessage
                      component="div"
                      name="description"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>select user</FormLabel>
                    <Select isMulti options={options} />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Start Date</FormLabel>

                    <DatePicker
                      selected={formik.values.startDate}
                      name="startDate"
                      id="startDate"
                      onBlur={formik.handleBlur}
                      onChange={(date) =>
                        formik.setFieldValue("startDate", date)
                      }
                      className={`form-control ${formik.touched.startDate && formik.errors.startDate
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="startDate"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={imageChange}
                    />
                  </FormGroup>
                  {selectedImage && (
                    <div >
                      <img className='img--preview'
                        src={URL.createObjectURL(selectedImage)}
                        alt="Thumb"
                      />
                      <button className='del--image' onClick={removeSelectedImage}>
                        Remove This Image
                      </button>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={props.handleClose}
                    type="reset"
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    subnit
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          );
        }}
      </Formik>
    </>
  );
}

export default TaskForm;
