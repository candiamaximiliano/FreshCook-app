export const validUsername = new RegExp(
   '^[a-z0-9_-]{3,15}$'
);
export const validEmail = new RegExp(
   '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);
export const validPassword = new RegExp('^(?=.*[A-Za-z])(?=.*)[A-Za-z]{8,}$');

export const validateName = /^[a-zA-Z\s]+$/;

export const validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;