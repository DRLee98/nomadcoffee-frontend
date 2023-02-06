module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      url: "https://nomadcoffee-backend.up.railway.app/graphql",
    },
  },
};
