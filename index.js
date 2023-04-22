/*function authorize() {
    return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/forms"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
  }
  */

'use strict';


import path  from 'path'
import google from '@googleapis/forms'
import authenticate from '@google-cloud/local-auth'

const formID = '17OknLJadJsEAVaCiBSZluSAW_QewjxAXmevk7_9_yT0';


async function runSample() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, 'credentials.json'),
    scopes: 'https://www.googleapis.com/auth/forms.responses.readonly',
  });
  const forms = google.forms({
    version: 'v1',
    auth: auth,
  });
  const res = await forms.forms.responses.list({
    formId: formID,
  });
  console.log(res.data);
  return res.data;
}



if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;
