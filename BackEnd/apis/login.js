const login = (req, res, bcrypt, databaseConnection) => {
  console.log(`Inside login module: ${JSON.stringify(req.body)}`);
  const { user } = req.body;
  const { emailId } = req.body;
  const { password } = req.body;
  let tableName = 'student_information';

  if (user === 'company') {
    tableName = 'company_information';
  }
  const userPresentSql = `SELECT * FROM ${tableName} WHERE EMAIL_ID = '${emailId}'`;
  databaseConnection.query(userPresentSql, (searchError, searchResult) => {
    if (searchError) throw searchError;
    if (searchResult.length === 0) {
      console.log(`User with email: ${emailId} and role: ${user} is not present in table: ${tableName}`);
      res.send('User Not Present');
    } else {
      const foundUser = searchResult[0];
      console.log(`User found in table ${tableName}`);
      console.log(foundUser);
      bcrypt.compare(password, foundUser.password, (pwdCompareError, pwdCompareResult) => {
        if (pwdCompareError) throw pwdCompareError;
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
