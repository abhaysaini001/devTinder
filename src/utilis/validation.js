const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("first Name is Not Valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email id is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password :");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

const canChangePassword = (lastChanged)=>{
if(!lastChanged) return true;

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return lastChanged < sevenDaysAgo;
}



module.exports = {
  validateSignUpData,
  validateEditProfileData,
  canChangePassword
};
