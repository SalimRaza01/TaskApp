const yup = require('yup');

const taskSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().oneOf(['Pending', 'Completed'], 'Invalid status').required('Status is required'),
  deadline: yup.string().required('Deadline is required'),
  createdAt: yup.string().required('Creation date is required'),
});


