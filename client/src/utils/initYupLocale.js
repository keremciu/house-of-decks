import { setLocale } from 'yup'

/*
 * Set global validation locales.
 * For more information check https://github.com/jquense/yup#using-a-custom-locale-dictionary
 */
setLocale({
  mixed: {
    required: ({ label }) => `${label} is required`,
    min: ({ min, label }) =>
      `${label} has to be longer than ${min} characters!`,
    max: ({ min, label }) =>
      `${label} can't be longer than ${min} characters!`
  },
})