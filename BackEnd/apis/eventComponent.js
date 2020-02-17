const createEvent = (req, res, pool) => {
  console.log('Inside createEvent module:');
  console.log(req.body);
  const eventName = req.body.eventName.toLowerCase();
  const { description } = req.body;
  const { time, date } = req.body;
  const street = req.body.street.toLowerCase();
  const city = req.body.city.toLowerCase();
  const state = req.body.cstate.toLowerCase();
  const country = req.body.country.toLowerCase();
  const { zipcode } = req.body;

  // storing array of strings which is being stringified and passed
  // so for manipulation would need to parse first.
  const eligibility = req.body.eligibility.toLowerCase();
  const companyId = parseInt(req.body.companyId, 10);

  const insertSQL = `INSERT INTO events_information (event_name, description, date, time, street, city, state, country, zipcode, company_id, eligibility) VALUES ('${eventName}', '${description}', '${date}', '${time}', '${street}', '${city}', '${state}', '${country}', '${zipcode}', '${companyId}', '${eligibility}')`;
  pool.query(insertSQL, (insertError, result) => {
    if (insertError) {
      console.log(insertError);
      console.log('Error in createEvent');
      res.send('Error');
    }
    console.log(`Event titled: ${eventName} created in Table: events_information with Autogenerated ID: ${result.insertId}`);
    res.send(`Event titled: ${eventName} created in Table: events_information with Autogenerated ID: ${result.insertId}`);
  });
};

const listCompanyCreatedEvents = (req, res, pool) => {
  console.log('Inside listCompanyCreatedEvents module:');
  console.log(req.body);
  const companyId = parseInt(req.body.companyId, 10);
  const searchSQL = `SELECT * FROM events_information where company_id = '${companyId}'`;
  pool.query(searchSQL, (searchError, result) => {
    if (searchError) {
      console.log(searchError);
      console.log('Error in listCompanyCreatedEvents');
      res.send('Error');
    }
    res.send(result);
  });
};


exports.createEvent = createEvent;
exports.listCompanyCreatedEvents = listCompanyCreatedEvents;
