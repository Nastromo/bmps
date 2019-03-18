const admin = require('firebase-admin');
var serviceAccount = require('../bemypass-firebase-adminsdk-4h57c-eda9f4db82.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

// This registration token comes from the client FCM SDKs.
var registrationToken = 'YOUR_REGISTRATION_TOKEN';

var message = {
  data: {
    title: `Hello`, 
    body: `I'm push notification`
  },
  token: registrationToken
};

// await admin.messaging().send(message);

module.exports = () => {
    admin
}