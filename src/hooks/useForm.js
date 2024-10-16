import * as yup from "yup";
import React from "react";
const byString = function (object, accessString) {
  accessString = accessString.replace(/\[(\w+)\]/g, ".$1");
  accessString = accessString.replace(/^\./, "");
  let accessKeys = accessString.split(".");
  for (let i = 0, n = accessKeys.length; i < n; ++i) {
    let key = accessKeys[i];
    if (key in object) {
      object = object[key];
    } else {
      return;
    }
  }
  return object;
};
Object.byString = byString;
function useForm(initdataModel, schema) {
  const [dataModel, setDataModel] = React.useState(initdataModel);
  const [validationErrors, setValidationErrors] = React.useState({});
  const [isBusy, setIsBusy] = React.useState(false);
  const validate = async () => {
    const options = { abortEarly: false, context: schema.cast(dataModel) };
    const errors = {};
    try {
      await schema.validate(dataModel, options);
      return null;
    } catch (err) {
      err.inner.forEach((item) => {
        errors[item.path] = item.message;
      });
      return errors;
    }
  };
  const validateProperty = async (field, value) => {
    const errors = { ...validationErrors };
    try {
      const objSchema = yup.reach(schema, field);
      await objSchema.validate(value);
      /**
       * if reached this block after promise it means validation success.
       * remove the errors if there is any regarding this field.
       */
      delete errors[field];
    } catch (err) {
      /**
       * invalid input detected. update with proper error message on the
       * respective field.
       */
      errors[field] = err.message;
    } finally {
      /**
       * finally we are just setting the erros to state.
       */
      setValidationErrors(errors);
    }
  };
  const handleSubmit = async (e, doSubmit, reset = true, options = {}) => {
    e.preventDefault();
    const errors = await validate();
    if (errors) return setValidationErrors(errors);
    // Form submission logic here ....
    function submission() {
      return new Promise(async (resolve, reject) => {
        try {
          await doSubmit(dataModel, e);
          if (reset) resetForm();
          return resolve();
        } catch (err) {
          return reject(err);
        }
      });
    }
    try {
      setIsBusy(true);
      await submission();
    } catch (err) {
      console.log(err);
    }
    setIsBusy(false);
  };
  const handleChange = ({ field, value }) => {
    const data = { ...dataModel };
    data[field] = value;
    setDataModel(data);
    validateProperty(field, value);
  };
  const resetForm = () => {
    setDataModel(initdataModel);
    setValidationErrors({});
  };
  const _isObject = (object) => object !== null && typeof object === "object";
  const _deepEqual = (referenceObject, testObject) => {
    const referenceKeys = Object.keys(referenceObject);
    const testKeys = Object.keys(testObject);
    if (referenceKeys.length !== testKeys.length) return false;
    for (const key of referenceKeys) {
      const referenceValue = referenceObject[key];
      const testValue = testObject[key];
      const hasProperties = _isObject(referenceValue);
      if (!hasProperties && referenceValue !== testValue) return false;
      if (hasProperties && !_deepEqual(referenceValue, testValue)) return false;
    }
    return true;
  };
  const hasUnsavedData = () => !_deepEqual(initdataModel, dataModel);
  const isFormValid = () => Object.keys(validationErrors).length === 0;
  React.useEffect(() => {
    console.log("datamodel", dataModel);
    console.log("validation error:", validationErrors);
  }, [dataModel, validationErrors]);
  /** validation runner is required the first time the form renders. */
  React.useEffect(() => {
    // (async function () {
    //   const errors = await validate();
    //   if (errors) return setValidationErrors(errors);
    // })();
  }, []);
  function initiateDataModel(dataModel) {
    setDataModel(dataModel);
  }
  return {
    dataModel,
    validationErrors,
    isBusy,
    handleChange,
    handleSubmit,
    initiateDataModel,
    isFormValid,
    resetForm,
    hasUnsavedData,
  };
}
export default useForm;
