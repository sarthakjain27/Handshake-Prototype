const companySearchForStudents = (req, res, pool) => {
  console.log('Inside companySearchForStudents');
  console.log(req.body);
  const { searchParam } = req.body;
  let searchSQL = '';
  if(searchParam === 'Name'){
    searchSQL = `SELECT student_id,student_name,college_name,date_of_birth,city,state,country,career_objective,contact_phone,contact_email,profile_picture_url
                  from student_information
                  where student_name like '%${req.body.value}%'`;
  } else if(searchParam === 'College Name'){
    searchSQL = `SELECT student_id,student_name,college_name,date_of_birth,city,state,country,career_objective,contact_phone,contact_email,profile_picture_url
                  from student_information
                  where college_name like '%${req.body.value}%'`;
  } else if(searchParam === 'Skill'){
    searchSQL = `select distinct b.student_id,b.student_name,b.college_name,b.date_of_birth,b.city,b.state,b.country,b.career_objective,b.contact_phone,b.contact_email,b.profile_picture_url 
                from skillset_info a, student_information b
                where a.student_id = b.student_id
                and a.skill_name like '%${req.body.value}%'`;
  } else if(searchParam === 'ALL') {
    searchSQL = `SELECT student_id,student_name,college_name,date_of_birth,city,state,country,career_objective,contact_phone,contact_email,profile_picture_url
                  from student_information`;
  } else res.send('Error');

  pool.query(searchSQL, (searchError, result) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in getAllPostedJobs');
      res.send('Error');
    }
    console.log(result);
    res.send(result);
  });
}

const getAllStudents = (req, res, pool) => {
  console.log('Inside companySearchForStudents');
  console.log(req.body);
  const searchSQL = `SELECT student_id,student_name,college_name,date_of_birth,city,state,country,career_objective,contact_phone,contact_email,profile_picture_url
                    from student_information`;
  pool.query(searchSQL, (searchError, result) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in getAllStudents');
      res.send('Error');
    }
    console.log(result);
    res.send(result);
  });
}

exports.companySearchForStudents = companySearchForStudents;
exports.getAllStudents = getAllStudents;