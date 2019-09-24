'use strict';

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4');

const patientsTable = process.env.PATIENTS_TABLE;

// Create a response
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    headers: {
        'Content-Type': `application/json`,
        'Access-Control-Allow-Origin': `*`,
        'Access-Control-Allow-Methods': `GET, POST, PUT, DELETE`,
        'Access-Control-Allow-Credentials': `true`
    },
    body: JSON.stringify(message)
  };
}
function sortByDate(a, b) {
  if (a.createdAt > b.createdAt) {
    return -1;
  } else return 1;
}

// Create a patient
module.exports.createPatient = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  if (
    !reqBody.nome || reqBody.nome.trim() === '' ||
    !reqBody.cpf || reqBody.cpf.trim() === '' || 
    !reqBody.nascimento || reqBody.nascimento.trim() === '' ||
    !reqBody.email || reqBody.email.trim() === '' ||
    !reqBody.telefone || reqBody.telefone.trim() === '' ||
    !reqBody.plano || reqBody.plano.trim() === '' ||
    !reqBody.nrCarteira || reqBody.nrCarteira.trim() === ''
  ) {
    return callback(
      null,
      response(400, {
        error: 'Patient incomplete'
      })
    );
  }

  const patient = {
    id: uuid(),
    createdAt: new Date().toISOString(),
    userId: 1,
    nome: reqBody.nome,
    cpf: reqBody.cpf,
    nascimento: reqBody.nascimento,
    email: reqBody.email,
    telefone: reqBody.telefone,
    plano: reqBody.plano,
    nrCarteira: reqBody.nrCarteira
  };

  return db
    .put({
      TableName: patientsTable,
      Item: patient
    })
    .promise()
    .then(() => {
      callback(null, response(201, patient));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

// Get all patients
module.exports.getAllPatients = (event, context, callback) => {
  return db
    .scan({
      TableName: patientsTable
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Get number of patients
module.exports.getPatients = (event, context, callback) => {
  const numberOfPatients = event.pathParameters.number;
  const params = {
    TableName: patientsTable,
    Limit: numberOfPatients
  };
  return db
    .scan(params)
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Get a single patient
module.exports.getPatient = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id
    },
    TableName: patientsTable
  };

  return db
    .get(params)
    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else callback(null, response(404, { error: 'Patient not found' }));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Update a patient
module.exports.updatePatient = (event, context, callback) => {
  const id = event.pathParameters.id;
  const reqBody = JSON.parse(event.body);
  const { nome, cpf, nascimento, email, telefone, plano, nrCarteira } = reqBody;  

  const params = {
    Key: {
      id: id
    },
    TableName: patientsTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET nome = :nome, cpf = :cpf, nascimento = :nascimento,'+
                      ' email = :email, telefone = :telefone, plano = :plano, nrCarteira = :nrCarteira ',
    ExpressionAttributeValues: {
      ':nome': nome,
      ':cpf': cpf,
      ':nascimento': nascimento,
      ':email': email,
      ':telefone': telefone,
      ':plano': plano,
      ':nrCarteira': nrCarteira
    },
    ReturnValues: 'ALL_NEW'
  };
  console.log('Updating');

  return db
    .update(params)
    .promise()
    .then((res) => {
      console.log(res);
      callback(null, response(200, res.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Delete a patient
module.exports.deletePatient = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: patientsTable
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: 'Patient deleted successfully' }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};