const { ApolloServer, gql } = require("apollo-server-lambda");
const { AWS } = require('aws-sdk');

const getSecretKey = async () => {
  const secretsManager = new AWS.SecretsManager();
  const secret = await secretsManager.getSecretValue({ 
    SecretId: 'MICKEY_SECRET_KEY'
  }).promise();
  if (!secret) {
    throw new Error('Secret not found');
  }
  return JSON.parse(secret.SecretString);
};

const typeDefs = gql`
  type Query {
    hello: String
    betterHello: String
  }
`;

const resolvers = {
  Query: {
    hello: (obj, params, context) => `Hello from Apollo. Key`,
    betterHello: async () => {
      const secretKey = await getSecretKey;
      return `Secret key is: ${secretKey}`;
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
