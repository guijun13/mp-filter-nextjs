import FilterDropdown from '@/components/filter-dropdown';
import OrdersTable from '@/components/orders-table';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface orderData {
  id: number;
  customer_name: string;
  customer_email: string;
  order_date: Date;
  amount_in_cents: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

async function getOrdersData() {
  const response = await fetch('https://apis.codante.io/api/orders-api/orders');
  const orders = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return orders.data;
}

export default async function Component() {
  const ordersData: orderData[] = await getOrdersData();

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>Uma listagem de pedidos do seu negócio.</CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput />
            <FilterDropdown />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable ordersData={ordersData} />
          <div className="mt-8">
            <Pagination />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
