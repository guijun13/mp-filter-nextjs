import FilterDropdown from '@/components/filter-dropdown';
import OrdersTable from '@/components/orders-table';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';
import { unstable_noStore as noStore } from 'next/cache';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';

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

async function getOrdersData(query: string, filter: string, currentPage: number) {
  noStore();
  let url = `https://apis.codante.io/api/orders-api/orders`;

  if (query !== '') {
    url += `?search=${query}`;
  }

  if (filter !== '') {
    url += `${query !== '' ? '&' : '?'}status=${filter}`;
  }

  if (currentPage > 1) {
    url += `${query !== '' || filter !== '' ? '&' : '?'}page=${currentPage}`;
  }

  const response = await fetch(url);
  const orders = await response.json();

  console.log(orders);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return orders.data;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    filter?: string;
  };
}) {
  const query = searchParams?.query || '';
  const filter = searchParams?.filter || '';
  const currentPage = Number(searchParams?.page) || 1;
  const ordersData: orderData[] = await getOrdersData(query, filter, currentPage);

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
          <Suspense key={query + currentPage}>
            <OrdersTable ordersData={ordersData} />
          </Suspense>
          <div className="mt-8">
            <Pagination />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
