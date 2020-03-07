const login = (req, res, bcrypt, pool) => {
  console.log('Inside login module:');
  console.log(req.body);
  const { user } = req.body;
  const { emailId } = req.body;
  const { password } = req.body;
  let tableName = '';

  if (user === 'company') {
    tableName = 'company_information';
  } else if(user === 'student'){
    tableName = 'student_information';
  } else {
    res.send('Wrong UserRole Given');
  }
  const userPresentSql = `SELECT * FROM ${tableName} WHERE EMAIL_ID = '${emailId}'`;
  pool.query(userPresentSql, (searchError, searchResult) => {
    if (searchError) {
      console.log(searchError);
      res.send('Error');
    }
    if (searchResult.length === 0) {
      console.log(`User with email: ${emailId} and role: ${user} is not present in table: ${tableName}`);
      res.send('User Not Present');
    } else {
      const foundUser = searchResult[0];
      console.log(`User found in table ${tableName}`);
      console.log(foundUser);
      bcrypt.compare(password, foundUser.password, (pwdCompareError, pwdCompareResult) => {
        if (pwdCompareError) {
          console.log('Password Compare Error: '+pwdCompareError);
          res.send('Error in comparing Password');
        }
        if (!pwdCompareResult) {
          res.send('Wrong Password');
        } else {
          console.log('Correct password given');
          res.send(foundUser);
        }
      });
    }
  });
};

exports.login = login;
