// validationSchemas.js
import * as yup from 'yup';

export const shippingSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  zipCode: yup.string().required('ZIP / Postal Code is required'),
  phone: yup.string().required('Phone number is required'),
});
