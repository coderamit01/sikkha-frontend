"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

const SearchTutor = ({ search }: { search?: string }) => {
  const { replace } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(search || "");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue.trim()) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }

      replace(`${pathName}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <InputGroup className="mb-5 h-10 rounded-3">
      <InputGroupInput
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchTutor;
