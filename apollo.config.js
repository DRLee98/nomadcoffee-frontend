module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      url: "https://nomad-coffee-backend-0126.herokuapp.com/graphql",
    },
  },
};
