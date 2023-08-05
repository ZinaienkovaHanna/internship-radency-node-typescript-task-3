import * as yup from 'yup';

export const validateNoteSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    date: yup.date().default(() => new Date()),
    category: yup.string().required('Category is required'),
    content: yup.string().required('Content is required'),
    archived: yup.boolean().default(false),
});
