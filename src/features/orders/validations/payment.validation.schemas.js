import * as yup from 'yup';

export const paymentSchema = yup.object().shape({
  cardholderName: yup.string().when('paymentMethod', {
    is: 'credit',
    then: (schema) => schema.required('Cardholder name is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  paymentMethod: yup.string().required(),
  cardNumber: yup.string().when('paymentMethod', {
    is: 'credit',
    then: (schema) =>
      schema
        .required('Card number is required')
        .matches(/^\d{16}$/, 'Card number must be 16 digits'),
  }),
  expiryDate: yup.string().when('paymentMethod', {
    is: 'credit',
    then: (schema) =>
      schema
        .required('Expiry date is required')
        .matches(/^(0[1-9]|1[0-2])\/(\d{2})$/, 'Format must be MM/YY'),
  }),
  cvv: yup.string().when('paymentMethod', {
    is: 'credit',
    then: (schema) =>
      schema
        .required('CVV is required')
        .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
  }),
  paypalEmail: yup.string().when('paymentMethod', {
    is: 'paypal',
    then: (schema) =>
      schema
        .required('PayPal email is required')
        .email('Invalid email format'),
  }),
  deliveryNote: yup.string().when('paymentMethod', {
    is: 'cod',
    then: (schema) =>
      schema.max(200, 'Note must be less than 200 characters'),
  }),
});