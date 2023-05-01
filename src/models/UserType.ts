export type UserType = {
  username: string;
  is_admin?: boolean;
  id?: number;
  user_detail: {
    first_name: string;
    last_name: string;
    user_image: string;
    id?: number;
  };
  phone_numbers: phone[];
  addresses: addess[];
};

type phone = {
  phone_number: string;
  type: string;
  id?: number;
};

type addess = {
  street_address: string;
  postal_code: number;
  city: string;
  id?: number;
  country: {
    country_name: string;
    id?: number;
  };
};

export type UserSendType = {
  user: {
    username: string;
    password: string;
  };
  user_detail: {
    first_name: string;
    last_name: string;
    user_image: string;
  };
  user_phones: [
    {
      phone_number: string;
      type: string;
    }
  ];
  user_address: {
    street_address: string;
    postal_code: string;
    city: string;
    country_id: number;
  };
};
