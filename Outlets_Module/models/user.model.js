const bcrypt = require('bcrypt');

const DBschema = [
  'email',
  'password',
  'last_name',
  'first_name',
  'status', //0 for Pending Approval, 1 for approved , 2 for rejected
  'role', //1 for super admin, 2 for teacher , 3 for student,
  'teacher_current_company',
  'teacher_title_at_company',
  'teacher_location',
  'teaching_sample',
  'teacher_introduction',
  'teacher_resume',
  'profile_image',
  'extra_info',
  'mobile',
  'student_type',
  'dob',
  //'is_deleted',
  'refresh_token',
];
const filtersSchema = [
  'id',
  'email',
  'password',
  'last_name',
  'first_name',
  'status', //0 for Pending Approval, 1 for approved , 2 for rejected
  'role', //1 for super admin, 2 for teacher , 3 for student,
  'is_deleted',
  'refresh_token',
];

const ROLES = [
  1, //for super admin
  2,// for teacher 
  3 //for student,
];

const USER_STATUS = [
  0,
  1
]

isValidPassword = async function (password,dbPassword) {
  try {
    return await bcrypt.compare(password,dbPassword);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  ROLES,
  DBschema,
  isValidPassword,
  filtersSchema,
  USER_STATUS
};
