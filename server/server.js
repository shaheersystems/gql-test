import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@test.com",
    isAdmin: false,
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@test.com",
    isAdmin: true,
  },
  {
    id: "3",
    name: "Alice",
    email: "alice@test.com",
    isAdmin: false,
  },
];

const typeDefs = `
    type Query {
       getUsers: [User]
       getUserById(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, email: String!, isAdmin: Boolean): User
    }

    type User {
        id: ID
        name: String
        email: String
        isAdmin: Boolean
    }
`;
const resolvers = {
  Query: {
    getUsers: () => users,
    getUserById: (parent, args) => {
      // Fixed: Added parent parameter and corrected args access
      const { id } = args;
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, email, isAdmin } = args;
      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        isAdmin: isAdmin ? true : false,
      };
      users.push(newUser);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at ${url}`);
