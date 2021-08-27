interface routesType {
  home: string;
  signUp: string;
  addShop: string;
  shopDetail: Function;
  editShop: Function;
  myProfile: string;
}

const routes: routesType = {
  home: "/",
  signUp: "/sign-up",
  addShop: "/add",
  shopDetail: (id: string) => (id ? `/shop/${id}` : "/shop/:id"),
  editShop: (id: string) => (id ? `/shop/${id}/edit` : "/shop/:id/edit"),
  myProfile: "/profile",
};

export default routes;
