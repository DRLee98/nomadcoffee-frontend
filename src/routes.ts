interface routesType {
  home: string;
  signUp: string;
  myProfile: string;
  profile: Function;
  editProfile: string;
  followUser: Function;
  addShop: string;
  shopDetail: Function;
  editShop: Function;
  category: Function;
  search: Function;
}

const routes: routesType = {
  home: "/",
  signUp: "/sign-up",
  myProfile: "/profile",
  profile: (id: string) => (id ? `/profile/${id}` : "/profile/:id"),
  editProfile: "/profile/edit",
  followUser: (id: string) =>
    id ? `/profile/${id}/follow` : "/profile/:id/follow",
  addShop: "/add",
  shopDetail: (id: string) => (id ? `/shop/${id}` : "/shop/:id"),
  editShop: (id: string) => (id ? `/shop/${id}/edit` : "/shop/:id/edit"),
  category: (slug: string) => (slug ? `/category/${slug}` : "/category/:slug"),
  search: (word: string) => (word ? `/search/${word}` : "/search/:word"),
};

export default routes;
