"use client";

import { useState } from "react";
import FilterButton from "@/components/FilterButton";
import FilterBox from "@/components/FilterBox";
import SearchCar from "@/components/SearchCar";

export default function FilterController() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center space-x-3">
      <FilterButton onClick={() => setOpen(true)} />
      <SearchCar />

      <FilterBox open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
