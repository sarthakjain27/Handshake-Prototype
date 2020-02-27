const companyUpdateProfile = (req, res, pool) => {
  console.log('Inside companyUpdateProfile');
  console.log(req.body);
  if (req.file) {
    console.log('Company Profile Picture Uploaded');
    console.log(req.file);
  }

  const companyName = req.body.companyName.toLowerCase();
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const { description, contactPhone } = req.body;
  const companyId = parseInt(req.body.company_id, 10);
  const contactEmail = req.body.contact_email.toLowerCase();
  let profilePictureUrl = '';
  let updateSQL = '';
  if (req.file) {
    // append http://localhost:3001/ in frontend
    profilePictureUrl = req.file.filename;
    updateSQL = `UPDATE company_information SET company_name='${companyName}',city='${city}',state='${state}',country='${country}',description='${description}',contact_phone='${contactPhone}',contact_email='${contactEmail}', profile_picture_url='${profilePictureUrl}' where company_id = '${companyId}'`;
  } else {
    updateSQL = `UPDATE company_information SET company_name='${companyName}',city='${city}',state='${state}',country='${country}',description='${description}',contact_phone='${contactPhone}',contact_email='${contactEmail}' where company_id = '${companyId}'`;
  }
  pool.query(updateSQL, (updateError, result) => {
    if (updateError) {
      console.log(updateError);
      console.log('Error in companyUpdateProfile');
      res.send('Error');
    } else {
      console.log('Company Profile Updated');
      res.send('Updated');
    }
  });
};

const getCompanyProfile = (req, res, pool) => {
  console.log('Inside getCompanyProfile');
  console.log(req.body);
  const companyId = parseInt(req.body.companyId, 10);
  const searchSQL = `SELECT * FROM company_information where company_id = '${companyId}'`;
  pool.query(searchSQL, (searchError, result) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in getCompanyProfile');
      res.send('Error');
    }
    res.send(result[0]);
  });
};

const getCompanyDetailsForStudent = (req, res, pool) => {
  console.log('Inside getCompanyDetailsForStudent');
  console.log(req.body);
  const companyId = parseInt(req.body.companyId, 10);
  const searchSQL = `SELECT company_name,city,state,country,description,contact_phone,contact_email,profile_picture_url
                    FROM company_information where company_id = '${companyId}'`;
  pool.query(searchSQL, (searchError, result) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in getCompanyDetailsForStudent');
      res.send('Error');
    }
    res.send(result[0]);
  });
};

const studentUpdateProfile = (req, res, pool) => {
  console.log('Inside studentUpdateProfile');
  console.log(req.body);
  if (req.file) {
    console.log('Student Profile Picture Uploaded');
    console.log(req.file);
  }
  const studentName = req.body.studentName.toLowerCase();
  const collegeName = req.body.collegeName.toLowerCase();
  const { dateOfBirth } = req.body;
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const { careerObjective, contactPhone } = req.body;
  const contactEmail = req.body.contact_email.toLowerCase();
  const studentId = parseInt(req.body.student_id, 10);

  let profilePictureUrl = '';
  let updateSQL = '';
  if (req.file) {
    // append http://localhost:3001/ in frontend
    profilePictureUrl = req.file.filename;
    updateSQL = `UPDATE student_information SET student_name='${studentName}',college_name='${collegeName}',date_of_birth='${dateOfBirth}',city='${city}',state='${state}',country='${country}',career_objective='${careerObjective}',contact_phone='${contactPhone}',contact_email='${contactEmail}', profile_picture_url='${profilePictureUrl}' where student_id = '${studentId}'`;
  } else {
    updateSQL = `UPDATE student_information SET student_name='${studentName}',college_name='${collegeName}',date_of_birth='${dateOfBirth}',city='${city}',state='${state}',country='${country}',career_objective='${careerObjective}',contact_phone='${contactPhone}',contact_email='${contactEmail}' where student_id = '${studentId}'`;
  }
  pool.query(updateSQL, (updateError, result) => {
    if (updateError) {
      console.log(updateError);
      console.log('Error in studentUpdateProfile');
      res.send('Error');
    } else {
      console.log('Student Profile Updated');
      res.send('Updated');
    }
  });
};

const getStudentBasicDetails = (req, res, pool) => {
  console.log('Inside getStudentBasicDetails');
  console.log(req.body);
  const studentId = parseInt(req.body.studentId, 10);
  const searchSQL = `select a.student_name, a.college_name, a.date_of_birth, a.city, a.state, a.country, a.career_objective, a.contact_email, a.contact_phone, a.profile_picture_url
                    from student_information a 
                    where student_id = '${studentId}'`;
  pool.query(searchSQL, (searchError, searchResult) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in getStudentBasicDetails');
      res.send('Error');
    }
    res.send(searchResult[0]);
  });
};

const getStudentProfile = (req, res, pool) => {
  console.log('Inside getStudentProfile');
  console.log(req.body);
  const studentId = parseInt(req.body.studentId, 10);
  const searchSQL = `SELECT * FROM student_information where student_id = '${studentId}'`;
  pool.query(searchSQL, (searchError, result) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in getStudentProfile');
      res.send('Error');
    }
    if (result) res.send(result[0]);
    else res.send('Error');
  });
};

const createEducation = (req, res, pool) => {
  console.log('Inside createEducation');
  console.log(req.body);
  const collegeName = req.body.collegeName.toLowerCase();
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const degree = req.body.degree.toLowerCase();
  const major = req.body.major.toLowerCase();
  const { yearOfPassing, cgpa } = req.body;
  const studentId = parseInt(req.body.studentId, 10);

  const insertSQL = `INSERT INTO education_information (college_name,city,state,country,degree,major,year_of_passing,cgpa,student_id) VALUES ('${collegeName}', '${city}', '${state}', '${country}', '${degree}', '${major}', '${yearOfPassing}', '${cgpa}', '${studentId}')`;
  pool.query(insertSQL, (insertError, result) => {
    if (insertError) {
      console.log(`Error in createEducation while inserting ${insertError}`);
      res.send('Error');
    }
    console.log(`StudentID ${studentId} education created in Table: education_information with Autogenerated ID: ${result.insertId}`);
    res.send(`StudentID ${studentId} education created in Table: education_information with Autogenerated ID: ${result.insertId}`);
  });
};

const updateEducation = (req, res, pool) => {
  console.log('Inside updateEducation');
  console.log(req.body);
  const collegeName = req.body.collegeName.toLowerCase();
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const degree = req.body.degree.toLowerCase();
  const major = req.body.major.toLowerCase();
  const { yearOfPassing, cgpa } = req.body;
  const educationId = parseInt(req.body.educationId, 10);

  const updateSQL = `UPDATE education_information SET college_name='${collegeName}',city='${city}',state='${state}',country='${country}',degree='${degree}',major='${major}',year_of_passing='${yearOfPassing}',cgpa='${cgpa}' where education_id = '${educationId}'`;
  pool.query(updateSQL, (updateError, result) => {
    if (updateError) {
      console.log(`Error in updateEducation while updating ${updateError}`);
      res.send('Error');
    }
    console.log('Education Updated');
    res.send('Updated');
  });
};

const deleteEducation = (req, res, pool) => {
  console.log('Inside deleteEducation');
  console.log(req.body);
  const educationId = parseInt(req.body.educationId, 10);
  const deleteSQL = `DELETE FROM education_information where education_id = '${educationId}'`;
  pool.query(deleteSQL, (deleteError, result) => {
    if (deleteError) {
      console.log(`Error in deleteEducation ${deleteError}`);
      res.send('Error');
    }
    console.log('Education Deleted');
    res.send('Deleted');
  });
};

const getAllEducation = (req, res, pool) => {
  console.log('Inside getAllEducation');
  console.log(req.body);
  const studentId = parseInt(req.body.studentId, 10);
  const searchSQL = `SELECT * FROM education_information where student_id = '${studentId}'`;
  pool.query(searchSQL, (searchError, result) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in getAllEducation');
      res.send('Error');
    }
    if (result) res.send(result);
    else res.send('Error');
  });
};

const createProfessionalExperience = (req, res, pool) => {
  console.log('Inside createProfessionalExperience');
  console.log(req.body);
  const companyName = req.body.companyName.toLowerCase();
  const title = req.body.title.toLowerCase();
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const { startDate, endDate, description } = req.body;
  const studentId = parseInt(req.body.studentId, 10);

  const insertSQL = `INSERT INTO experience_information (company_name,title,city,state,country,start_date,end_date,work_description,student_id) VALUES ('${companyName}','${title}','${city}','${state}','${country}','${startDate}','${endDate}','${description}','${studentId}')`;
  pool.query(insertSQL, (insertError, result) => {
    if (insertError) {
      console.log(`Error in createProfessionalExperience while inserting ${insertError}`);
      res.send('Error');
    }
    console.log(`StudentID ${studentId} experience created in Table: experience_information with Autogenerated ID: ${result.insertId}`);
    res.send(`StudentID ${studentId} experience created in Table: experience_information with Autogenerated ID: ${result.insertId}`);
  });
};

const updateProfessionalExperience = (req, res, pool) => {
  console.log('Inside updateProfessionalExperience');
  console.log(req.body);
  const companyName = req.body.companyName.toLowerCase();
  const title = req.body.title.toLowerCase();
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const { startDate, endDate, description } = req.body;
  const experienceId = parseInt(req.body.experienceId, 10);

  const updateSQL = `UPDATE experience_information SET company_name='${companyName}',title='${title}',city='${city}',state='${state}',country='${country}',start_date='${startDate}',end_date='${endDate}',work_description='${description}' where experience_id = '${experienceId}'`;
  pool.query(updateSQL, (updateError, result) => {
    if (updateError) {
      console.log(`Error in updateProfessionalExperience while updating ${updateError}`);
      res.send('Error');
    }
    console.log('Experience Updated');
    res.send('Updated');
  });
};

const deleteProfessionalExperience = (req, res, pool) => {
  console.log('Inside deleteProfessionalExperience');
  console.log(req.body);
  const experienceId = parseInt(req.body.experienceId, 10);
  const deleteSQL = `DELETE FROM experience_information where experience_id = '${experienceId}'`;
  pool.query(deleteSQL, (deleteError, result) => {
    if (deleteError) {
      console.log(`Error in deleteProfessionalExperience ${deleteError}`);
      res.send('Error');
    }
    console.log('Experience Deleted');
    res.send('Deleted');
  });
};

const getAllProfessionalExperience = (req, res, pool) => {
  console.log('Inside getAllProfessionalExperience');
  console.log(req.body);
  const studentId = parseInt(req.body.studentId, 10);
  const searchSQL = `SELECT * FROM experience_information where student_id = '${studentId}'`;
  pool.query(searchSQL, (searchError, result) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in getAllProfessionalExperience');
      res.send('Error');
    }
    if (result) res.send(result);
    else res.send('Error');
  });
};


exports.companyUpdateProfile = companyUpdateProfile;
exports.getCompanyProfile = getCompanyProfile;
exports.studentUpdateProfile = studentUpdateProfile;
exports.getStudentProfile = getStudentProfile;
exports.createEducation = createEducation;
exports.updateEducation = updateEducation;
exports.deleteEducation = deleteEducation;
exports.getAllEducation = getAllEducation;
exports.createProfessionalExperience = createProfessionalExperience;
exports.updateProfessionalExperience = updateProfessionalExperience;
exports.deleteProfessionalExperience = deleteProfessionalExperience;
exports.getAllProfessionalExperience = getAllProfessionalExperience;
exports.getStudentBasicDetails = getStudentBasicDetails;
exports.getCompanyDetailsForStudent = getCompanyDetailsForStudent;
