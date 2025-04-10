import * as yup from 'yup'

export const schema = yup.object({
  title: yup.string().required('Title is required'),
  views: yup
    .number()
    .typeError('Views must be a number')
    .min(0, 'Views must be at least 0')
    .required('Views is required'),
})
