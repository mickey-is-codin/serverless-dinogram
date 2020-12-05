const { ApolloServer, gql } = require("apollo-server-lambda");
const AWS = require('aws-sdk');

const typeDefs = gql`
  type Query {
    hello: String
    betterHello: String
  }
`;

const getSecretKey = async () => {
  const secretsManager = new AWS.SecretsManager();
  const SecretId = 'TestSecretKey';
  const secret = await secretsManager.getSecretValue({ SecretId }).promise();
  if (!secret) {
    throw new Error('Secret not found');
  }
  return JSON.parse(secret.SecretString);
};

const resolvers = {
  Query: {
    hello: (obj, params, context) => `Hello from Apollo. Key`,
    betterHello: async () => {
      const secretKey = 'MICKEY_SECRET_KEY';
      const response = await getSecretKey();
      const secretValue = response[secretKey];
      return `Secret key is: ${secretValue}`;
    }
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
