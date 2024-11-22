export interface IProduct {
  id: string;
  title: string;
  condition: string;
  thumbnail_id: string;
  sanitized_title: string;
  permalink: string;
  thumbnail: string;
  currency_id: string;
  price: number;
  available_quantity: number;
  official_store_name: string;
  address: Address;
  attributes: Attribute[];
}

export interface Address {
  state_id: string;
  state_name: string;
  city_name: string;
}

export interface Attribute {
  id: string;
  name: string;
  value_id: null | string;
  value_name: null | string;
  values: AttributeValue[];
  source: number;
}

export interface AttributeValue {
  id: null | string;
  name: null | string;
  source: number;
}

export interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}
