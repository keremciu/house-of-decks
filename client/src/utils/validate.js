export default function validate(getValidationSchema, errors, setErrors) {
  return (values) => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      if (errors.length) setErrors([]);
      return {};
    } catch (error) {
      const aggregatedErrors = getErrorsFromValidationError(error);
      setErrors(Object.values(aggregatedErrors));
      return aggregatedErrors;
    }
  };
}

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
}
