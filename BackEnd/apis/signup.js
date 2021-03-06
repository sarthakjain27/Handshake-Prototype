const signup = (req, res, bcrypt, saltRounds, pool) => {
  console.log('Inside signup module:');
  console.log(req.body);
  const { user } = req.body;
  const { emailId } = req.body;
  const { password } = req.body;
  const name = req.body.name.toLowerCase();
  let tableName = 'student_information';

  if (user === 'company') {
    tableName = 'company_information';
  }
  const alreadyPresentSql = `SELECT * FROM ${tableName} WHERE EMAIL_ID = '${emailId}'`;
  pool.query(alreadyPresentSql, (err, searchResult) => {
    if (err) {
      console.log(err);
      res.send('Error');
    }
    if (searchResult.length > 0) {
      console.log(`${emailId} for the role ${user} already exists`);
      res.send('Exists');
    } else {
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
          console.log(error);
          res.send('Hashing Error');
        }
        let insertSql = '';
        if (user === 'company') {
          const city = req.body.city.toLowerCase();
          const state = req.body.state.toLowerCase();
          const country = req.body.country.toLowerCase();
          insertSql = `INSERT INTO ${tableName} (company_name,email_id,password,city,state,country) VALUES ('${name}', '${emailId}', '${hash}' ,'${city}', '${state}', '${country}')`;
        } else {
          const collegeName = req.body.collegeName.toLowerCase();
          insertSql = `INSERT INTO ${tableName} (student_name,email_id,password,college_name) VALUES ('${name}', '${emailId}', '${hash}', '${collegeName}')`;
        }
        pool.query(insertSql, (insertError, result) => {
          if (insertError) {
            console.log(insertError);
            res.send('Error');
          }
          console.log(`User: ${emailId} created in Table: ${tableName} with Autogenerated ID: ${result.insertId}`);
          res.send(`User: ${emailId} created in Table: ${tableName} with Autogenerated ID: ${result.insertId}`);
        });
      });
    }
  });
};

exports.signup = signup;
