export const ERRORS = {
  required: 'This field is required',
  minLength: (field: string, minLength: number) =>
    `${field} must have a minimum of ${minLength} characters.`,
};
