const School = require('../../models/schoolModel');
const Joi = require('joi');

// 🎯 Validation Schema using Joi
const schoolValidationSchema = Joi.object({
  schoolName: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().trim().email().required(),
  address: Joi.string().trim().min(5).required(),
  contactNo: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Contact number must be a 10-digit number',
    }),
  schoolType: Joi.string().valid('private', 'public', 'semi public').required(),
  website: Joi.string().uri().optional().allow(''),
  principalName: Joi.string().trim().min(3).max(100).required(),
  managementType: Joi.string()
    .valid('trust', 'government', 'private')
    .required(),
  noOfStudents: Joi.number().integer().min(1).required(),
  noOfStaff: Joi.number().integer().min(1).required(),
  courses: Joi.array().items(Joi.string()).optional(),
  languages: Joi.array().items(Joi.string()).optional(),
  studentTeacherRatio: Joi.string().trim().optional(),
  tuitionAndFees: Joi.string().trim().optional(),
  additionalFacilities: Joi.string().trim().optional(),
  transportAvailability: Joi.boolean().required(),
  scholarshipsOrFinancialAssistance: Joi.boolean().required(),
});

// 🎯 Add a new school
exports.addSchool = async (req, res) => {
  try {
    // ✅ Validate request data
    const { error } = schoolValidationSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    // ✅ Check if the email already exists
    const existingSchool = await School.findOne({ email: req.body.email });
    if (existingSchool) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'A school with this email already exists!',
        });
    }

    // ✅ Save the new school
    const school = new School(req.body);
    await school.save();

    res.status(201).json({ success: true, school });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
  }
};

// 🎯 Get all schools
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().sort({ createdAt: -1 }); // 🔥 Sorted by latest
    res.status(200).json({ success: true, count: schools.length, schools });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
  }
};

// 🎯 Get a single school by ID
exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school)
      return res
        .status(404)
        .json({ success: false, message: 'School not found' });

    res.status(200).json({ success: true, school });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Invalid ID format or server error',
        error: error.message,
      });
  }
};

// 🎯 Update a school
exports.updateSchool = async (req, res) => {
  try {
    // ✅ Validate updated data
    const { error } = schoolValidationSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    // ✅ Check if school exists
    const existingSchool = await School.findById(req.params.id);
    if (!existingSchool)
      return res
        .status(404)
        .json({ success: false, message: 'School not found' });

    // ✅ If email is updated, check for uniqueness
    if (req.body.email && req.body.email !== existingSchool.email) {
      const emailExists = await School.findOne({ email: req.body.email });
      if (emailExists)
        return res
          .status(400)
          .json({
            success: false,
            message: 'Email already in use by another school',
          });
    }

    // ✅ Perform update
    const updatedSchool = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, updatedSchool });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Invalid ID format or server error',
        error: error.message,
      });
  }
};

// 🎯 Delete a school
exports.deleteSchool = async (req, res) => {
  try {
    const deletedSchool = await School.findByIdAndDelete(req.params.id);
    if (!deletedSchool)
      return res
        .status(404)
        .json({ success: false, message: 'School not found' });

    res
      .status(200)
      .json({ success: true, message: 'School deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Invalid ID format or server error',
        error: error.message,
      });
  }
};
