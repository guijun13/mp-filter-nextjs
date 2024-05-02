'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(searchValue: string) {
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set('search', searchValue);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  );
}
