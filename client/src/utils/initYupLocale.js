import { setLocale } from 'yup'

/*
 * Set global validation locales.
 * For more information check https://github.com/jquense/yup#using-a-custom-locale-dictionary
 */
setLocale({
  mixed: {
    required: ({ path }) => `${path} is required`,
    min: ({ min, path }) =>
      `${path} has to be longer than ${min} characters!`,
    max: ({ min, path }) =>
      `${path} can't be longer than ${min} characters!`
  },
})