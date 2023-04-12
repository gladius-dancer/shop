export type CategoryType = {
  name: string,
  id: number,
  children_category: ChildCategory[],
  parent_category: {
    name: string,
    id: number
  }
}

type ChildCategory = {
  name: string,
  id: number
}