const Config = require('../config');

companyUpdateProfile = (req, res, pool) => {
  console.log('Inside companyUpdateProfile');
  console.log(req.body);
  if(req.file){
    console.log('Company Profile Picture Uploaded');
    console.log(req.file);
  }

  const companyName = req.body.companyName.toLowerCase();
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const {description, contact_phone} = req.body;
  const company_id = parseInt(req.body.company_id,10);
  const contact_email = req.body.contact_email.toLowerCase();
  let profile_picture_url = ''
  let updateSQL = ''
  if(req.file)
  {
    // append http://localhost:3001/ in frontend
    profile_picture_url = req.file.filename;
    updateSQL = `UPDATE company_information SET company_name='${companyName}',city='${city}',state='${state}',country='${country}',description='${description}',contact_phone='${contact_phone}',contact_email='${contact_email}', profile_picture_url='${profile_picture_url}' where company_id = '${company_id}'`;
  } else {
    updateSQL = `UPDATE company_information SET company_name='${companyName}',city='${city}',state='${state}',country='${country}',description='${description}',contact_phone='${contact_phone}',contact_email='${contact_email}' where company_id = '${company_id}'`;
  }
  pool.query(updateSQL, (updateError, result) => {
    if(updateError){
      console.log(updateError);
      console.log('Error in companyUpdateProfile');
      res.send('Error');
    } else {
      res.send('Updated');
    }
  })
}

getCompanyProfile = (req, res, pool) => {
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
}

exports.companyUpdateProfile = companyUpdateProfile;
exports.getCompanyProfile = getCompanyProfile;