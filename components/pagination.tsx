'use client';

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({
  links,
  lastPage,
}: {
  links: {
    url: string;
    label: string;
    active: boolean;
    id: number;
  }[];
  lastPage: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClickPage(pageNumber: number) {
    const params = new URLSearchParams(searchParams);

    if (pageNumber > 1) {
      if (pageNumber > lastPage) {
        params.set('page', lastPage.toString());
      } else {
        params.set('page', pageNumber.toString());
      }
    } else {
      params.delete('page');
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          className={`${
            links[0].url ? 'cursor-pointer' : 'cursor-auto text-slate-300 hover:text-slate-300'
          }`}
          onClick={() => {
            handleClickPage(Number(searchParams.get('page') || 1) - 1);
          }}
        >
          <PaginationPrevious />
        </PaginationItem>

        {links.map((link) => {
          if (link.label.includes('Previous') || link.label.includes('Next')) return null;

          if (link.label === '...') {
            return (
              <PaginationItem key={link.id} className="hidden md:inline-flex">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={link.id} className="hidden md:inline-flex cursor-pointer">
              <PaginationLink onClick={() => handleClickPage(Number(link.label))} isActive={true}>
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem
          className={`${
            links[links.length - 1].url
              ? 'cursor-pointer'
              : 'cursor-auto text-slate-300 hover:text-slate-300'
          }`}
          onClick={() => {
            handleClickPage(Number(searchParams.get('page') || 1) + 1);
          }}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
