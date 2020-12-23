const { ApolloServer, gql } = require("apollo-server-lambda");
const AWS = require('aws-sdk');
const mailchimpClient = require('@mailchimp/mailchimp_marketing');

const MC_SERVER_SECRET_ID = 'MailChimpServer';
const MC_SERVER_SECRET_KEY = 'MAILCHIMP_SERVER';

const MC_API_KEY_SECRET_ID = 'MailChimpApiKey';
const MC_API_KEY_SECRET_KEY = 'MAILCHIMP_API_KEY';

const typeDefs = gql`
  type Query {
    campaignList: String
  }
`;

const getSecret = async (SecretId) => {
  const secretsManager = new AWS.SecretsManager();
  const secret = await secretsManager.getSecretValue({ SecretId }).promise();
  if (!secret) {
    throw new Error(`Secret not found for id: ${SecretId}`);
  }
  return JSON.parse(secret.SecretString);
};

const toMailChimpServer = async () => {
  const response = await getSecret(MC_SERVER_SECRET_ID);
  return response[MC_SERVER_SECRET_KEY];
};

const toMailChimpApiKey = async () => {
  const response = await getSecret(MC_API_KEY_SECRET_ID);
  return response[MC_API_KEY_SECRET_KEY];
};

const resolvers = {
  Query: {
    campaignList: async () => {
      const mailchimpServer = await toMailChimpServer();
      const mailchimpApiKey = await toMailChimpApiKey();
      mailchimpClient.setConfig({
        apiKey: mailchimpApiKey,
        server: mailchimpServer,
      });
      const campaigns = await mailchimpClient.campaigns.list();
      return JSON.stringify(campaigns);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
