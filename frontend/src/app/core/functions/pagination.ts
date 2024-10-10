//types
import { PaginationValues } from '../types';

export const getPaginationValuesFromPage = (page: number, items = 6): PaginationValues => {
  const offset = page - 1;
  const limit = items;

  return {
    offset,
    limit,
  };
};

export const getFilteredPagination = (allPages: Array<number>, currentPage: number): Array<number> => {
  const length = allPages.length;
  if (length <= 9) return allPages;

  if (length >= 10) {
    const currentPageIndex = allPages.findIndex((page) => page === currentPage);
    const firstItem = allPages[0];
    const lastItem = allPages[allPages.length - 1];

    switch (currentPage) {
      case 1:
        return [...allPages.slice(0, 3), lastItem];

      case lastItem: {
        return [firstItem, ...allPages.slice(-3)];
      }

      default:
        const firstIndexBefore = currentPageIndex === 1 ? currentPageIndex - 2 : currentPageIndex === 2 ? currentPageIndex - 1 : currentPageIndex - 2;
        const beforeCurrentItems = allPages.slice(firstIndexBefore, currentPageIndex);

        const firstIndexAfter = currentPageIndex + 1 === lastItem - 1 ? currentPageIndex : currentPageIndex + 1;
        const secondAfterValue = currentPageIndex + 2 === lastItem ? 0 : currentPageIndex + 3 === lastItem ? 2 : 3;
        const secondIndexAfter = currentPageIndex + secondAfterValue
        const afterCurrentItems = allPages.slice(firstIndexAfter, secondIndexAfter);

        return [firstItem, ...beforeCurrentItems, currentPage, ...afterCurrentItems, lastItem];
    }
  }

  return allPages;
};
