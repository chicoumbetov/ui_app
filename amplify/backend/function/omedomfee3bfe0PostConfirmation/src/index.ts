/* Amplify Params - DO NOT EDIT
	API_OMEDOMREST_APIID
	API_OMEDOMREST_APINAME
	API_OMEDOM_GRAPHQLAPIENDPOINTOUTPUT
	API_OMEDOM_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const moduleNames = process.env.MODULES.split(',');
const modules = moduleNames.map((name) => require(`./${name}`));

exports.handler = (event, context, callback) => {
  for (let i = 0; i < modules.length; i += 1) {
    const { handler } = modules[i];
    handler(event, context, callback);
  }
};
