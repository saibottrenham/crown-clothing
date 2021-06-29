import { createSelector } from 'reselect';
import memoize from 'lodash.memoize'; 

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2, 
    jackets: 3,
    womans: 4,
    mens: 5
}

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ?  Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => (collections ? collections[collectionUrlParam] : null)
  )
);