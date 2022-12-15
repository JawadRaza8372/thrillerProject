import React from "react";

const MultiBrandsRecentcs = ({ allProducts, allBrands }) => {
  let resultProducts = allProducts?.filter(
    (dat, index) => dat.collection_id === 21
  );
  return <div>MultiBrandsRecentcs</div>;
};

export default MultiBrandsRecentcs;
