const companySearchForStudents = (req, res, pool) => {
  console.log('Inside companySearchForStudents');
  console.log(req.body);
  const { searchParam } = req.body;
  let searchSQL = '';
  if (searchParam === 'Name') {
    searchSQL = `SELECT a.student_id,a.student_name,a.college_name,a.date_of_birth,a.city,a.state,a.country,a.career_objective,a.contact_phone,a.contact_email,a.profile_picture_url,
                  GROUP_CONCAT(b.major) as allMajors
                  from student_information a LEFT JOIN education_information b
                  on a.student_id = b.student_id
                  where a.student_name like '%${req.body.value}%'
                  group by a.student_id`;
  } else if (searchParam === 'College Name') {
    searchSQL = `SELECT a.student_id,a.student_name,a.college_name,a.date_of_birth,a.city,a.state,a.country,a.career_objective,a.contact_phone,a.contact_email,a.profile_picture_url,
                  GROUP_CONCAT(b.major) as allMajors
                  from student_information a LEFT JOIN education_information b
                  on a.student_id = b.student_id
                  where a.college_name like '%${req.body.value}%' 
                  group by a.student_id`;
  } else if (searchParam === 'Skill') {
    searchSQL = `select distinct b.student_id,b.student_name,b.college_name,b.date_of_birth,b.city,b.state,b.country,b.career_objective,b.contact_phone,b.contact_email,b.profile_picture_url 
                from skillset_info a, student_information b
                where a.student_id = b.student_id
                and a.skill_name like '%${req.body.value}%'`;
  } else if (searchParam === 'ALL') {
    searchSQL = `SELECT a.student_id,a.student_name,a.college_name,a.date_of_birth,a.city,a.state,a.country,a.career_objective,a.contact_phone,a.contact_email,a.profile_picture_url,
                GROUP_CONCAT(b.major) as allMajors
                from student_information a
                LEFT JOIN education_information b
                on a.student_id = b.student_id
                group by a.student_id`;
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
};

const getAllStudents = (req, res, pool) => {
  console.log('Inside companySearchForStudents');
  console.log(req.body);
  const searchSQL = `SELECT a.student_id,a.student_name,a.college_name,a.date_of_birth,a.city,a.state,a.country,a.career_objective,a.contact_phone,a.contact_email,a.profile_picture_url,
                    GROUP_CONCAT(b.major) as allMajors
                    from student_information a
                    LEFT JOIN education_information b
                    on a.student_id = b.student_id
                    group by a.student_id`;
  pool.query(searchSQL, (searchError, result) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in getAllStudents');
      res.send('Error');
    }
    console.log(result);
    res.send(result);
  });
};

exports.companySearchForStudents = companySearchForStudents;
exports.getAllStudents = getAllStudents;
