export interface ProductTable {
  product_id: number;
  product_name: string;
  product_image: string;
  total_quantity_returned: string;
  number_of_returns: number;
  return_rate: string;
  trend: number[];
}

export interface ChartReason {
  label: string;
  count: number;
  percentage: number;
}
