import { FiFilter } from "react-icons/fi";
import { Button } from "./ui/button";
const FilterButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      className="flex items-center bg-red-600 hover:bg-red-700 transition-all text-sm md:text-xl duration-300 cursor-pointer px-5 md:px-8 h-12 text-white"
    >
      <FiFilter className="inline-block text-sm lg:text-lg" />
      <span>Filters</span>
    </Button>
  );
};

export default FilterButton;
