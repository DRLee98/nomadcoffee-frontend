export const getCategoryObj = (categories: string) => {
  const returnArray: { __typename: string; name: string; slug: any }[] = [];
  if (categories) {
    const categoriesList = categories.split(",") || [];
    const filterList = categoriesList.filter(
      (category) => category.trim() !== "",
    );
    filterList.forEach((category) => {
      const name = category.trim();
      const slug = getSlug(name);
      if (name !== "") {
        const categoryObj = {
          __typename: "Category",
          name,
          slug,
        };
        returnArray.push(categoryObj);
      }
    });
  }
  return returnArray;
};

const getSlug = (category: string) => {
  return category.replace(/ /gi, "_").toLowerCase();
};
