export type AttributeType = {
  attribute: {
    attribute_name: string;
    category_id: number;
  };
  variants: variant[];
};

type variant = {
  value: string;
};
