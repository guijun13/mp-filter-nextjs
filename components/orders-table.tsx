'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronsUpDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { useState } from 'react';
import type { OrderData } from '@/lib/types';

const formatter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export default function OrdersTable({ ordersData }: { ordersData: OrderData[] }) {
  const [dateSortValue, setDateSortValue] = useState('order_date');
  const [moneySortValue, setMoneySortValue] = useState('amount_in_cents');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick(sortValue: string) {
    const params = new URLSearchParams(searchParams);

    if (params.get('sort') === sortValue) {
      params.set('sort', `-${sortValue}`);
    } else if (params.get('sort') === `-${sortValue}`) {
      params.delete('sort');
    } else if (sortValue) {
      params.set('sort', sortValue);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead
            className="hidden md:table-cell cursor-pointer justify-end items-center gap-1"
            onClick={() => handleClick('order_date')}
          >
            Data
            <ChevronsUpDown className="w-4" />
          </TableHead>
          <TableHead
            className="text-right flex cursor-pointer justify-end items-center gap-1"
            onClick={() => handleClick('amount_in_cents')}
          >
            Valor
            <ChevronsUpDown className="w-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordersData?.map((order: OrderData) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {order.status === 'pending' ? 'Pendente' : 'Completo'}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{order.order_date.toString()}</TableCell>
            <TableCell className="text-right">
              {formatter.format(order.amount_in_cents / 100)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
