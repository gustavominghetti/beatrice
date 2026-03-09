const { ApolloServer, gql } = require('apollo-server');

const typeVariants = gql`
  type Variant {
    variantId: ID
    name: String

    enclosureId: ID
  }

  type Enclosure {
    enclosureId: ID
    nome: String
    descricao: String
  }

  type Query {
    recintos: [Recinto]
  }
`;