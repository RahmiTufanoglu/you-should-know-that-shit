export enum FACT_CATEGORY_ENUM {
  Politics = 'politics',
  Sport = 'sport',
  History = 'history',
  Science = 'science',
}

export const GetFactEnumId = (category: string): number => {
  switch (category) {
    case FACT_CATEGORY_ENUM.Politics:
      return 1;
    case FACT_CATEGORY_ENUM.Sport:
      return 2;
    case FACT_CATEGORY_ENUM.History:
      return 3;
    case FACT_CATEGORY_ENUM.Science:
      return 4;
    default:
      break;
  }
};
