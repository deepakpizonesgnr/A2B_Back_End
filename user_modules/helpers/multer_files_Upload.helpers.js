
const multer = require('multer');

// images upload and storage images path
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    if (file.fieldname === 'teaching_sample') {
    cb(null, './teacherSampleVideo/');
    }else if(file.fieldname === 'teacher_introduction_video'){
      cb(null, './teacherIntroductions/');
    }else if(file.fieldname === 'teacher_resume'){
      cb(null, './teacherResumes/');
    }else if(file.fieldname === 'profile_image'){
      cb(null, './teacherImages/');
    }

  },
  filename: function (req, file, cb) {
    cb(null, (new Date().getTime()) + '-' + file.originalname);
  }
});

// file filter and check images type
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'teaching_sample' || file.fieldname === 'teacher_introduction_video') {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/ogg'  || file.mimetype === 'video/x-matroska' ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if(file.fieldname === 'teacher_resume'){
    if(file.mimetype === 'application/pdf' ||  file.mimetype === 'application/doc' ||  file.mimetype === 'application/docx' ||  file.mimetype === 'application/msword'){
      cb(null, true);
    }else{
      cb(null, false);
    }
  }
  else if(file.fieldname === 'profile_image'){
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'  || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};
// upload file size (images size)
const uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


module.exports = {
  uploadFile
};