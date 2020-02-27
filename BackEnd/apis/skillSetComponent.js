const updateSkills = (req, res, pool) => {
  console.log('Inside updateSkills');
  console.log(req.body);
  console.log(req.body.skills);
  console.log(typeof req.body.skills);
  const studentId = parseInt(req.body.studentId, 10);
  const deleteSQL = `DELETE from skillset_info where student_id = '${studentId}'`;
  pool.query(deleteSQL, (deleteError, deleteResult) => {
    if (deleteError) {
      console.log('Error in deleting previous skills of student');
      console.log(deleteError);
      res.send('Error');
    }
    const insertSQL = 'INSERT INTO skillset_info (skill_name,student_id) VALUES ?';
    const values = [];
    req.body.skills.map((eachSkill) => {
      values.push([eachSkill, studentId]);
    });
    console.log(values);
    pool.query(insertSQL, [values], (insertError, insertResult) => {
      if (insertError) {
        console.log('Error in inserting new skills into db');
        console.log(insertError);
        res.send('Error');
      }
      res.send('Inserted Successfully');
    });
  });
};

const getSkills = (req, res, pool) => {
  console.log('Inside getSkills');
  console.log(req.body);
  const studentId = parseInt(req.body.studentId, 10);
  const searchSQL = `SELECT * from skillset_info where student_id = '${studentId}'`;
  pool.query(searchSQL, (searchError, searchResult) => {
    if (searchError) {
      console.log('Error in getting skills of student');
      console.log(searchError);
      res.send('Error');
    }
    if (searchResult) res.send(searchResult);
    else res.send('Error');
  });
};

exports.updateSkills = updateSkills;
exports.getSkills = getSkills;
