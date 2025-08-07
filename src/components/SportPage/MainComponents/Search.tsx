import { useState } from "react";
import SearchIcon from "@/assets/search.svg";

import { useTranslation } from "react-i18next";

export default function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    console.log(query);
  };
  return (
    <>
      <div className="bg-neutrals-200 relative mt-10 mb-5 hidden gap-3 rounded-[100px] px-4 py-2 xl:flex">
        <SearchIcon
          className="[&>path]:stroke-neutrals-400 h-6 w-6 shrink-0"
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder={t("function.search")}
          className="text-neutrals-400 flex-grow bg-transparent outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </>
  );
}
