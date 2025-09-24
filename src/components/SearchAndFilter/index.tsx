import { useEffect, useState, useMemo } from "react";
import "./search.css";
import useDebounce from "./hooks/useDebounce";

//Senior level:  We could like add debouncing

function SearchAndFilter() {
  const NAMES = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
    "Mallory",
    "Niaj",
    "Olivia",
    "Peggy",
    "Sybil",
    "Trent",
    "Victor",
    "Walter",
    "Xavier",
    "Yvonne",
    "Zara",
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { debounce } = useDebounce();

  const [debouncedResult, setDebouncedResult] = useState<string[]>([]);

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("handleFilterChange called");
    console.log("Event:", e);
    console.log("Current Target Value:", e.currentTarget.value);
    setSearchTerm(e.currentTarget.value);
    console.log("setSearchTerm called with:", e.currentTarget.value);
  }

  function filterNames(searchTerm: string) {
    const query = searchTerm ? searchTerm.trim().toLowerCase() : "";
    console.log("Processed query:", query);

    if (!query) {
      console.log("Query is empty, returning early from useEffect");
      return [];
    }

    const filtered = NAMES.filter((name) => {
      const lowerName = name.toLowerCase();
      const isMatch = lowerName.includes(query);
      console.log(
        `Filtering name: ${name}, lowercased: ${lowerName}, isMatch: ${isMatch}`
      );
      return isMatch;
    });

    console.log("Filtered names:", filtered);
    return filtered;
  }

  //   This without debouncing and usage of useMemo

  //   const filteredNames: string[] = useMemo(() => {
  //     console.log("useEffect triggered with searchTerm:", searchTerm);
  //     const query = searchTerm ? searchTerm.trim().toLowerCase() : "";
  //     console.log("Processed query:", query);

  //     if (!query) {
  //       console.log("Query is empty, returning early from useEffect");
  //       return [];
  //     }

  //     debounce(()=>{}, 1000)

  //     const filtered = NAMES.filter((name) => {
  //       const lowerName = name.toLowerCase();
  //       const isMatch = lowerName.includes(query);
  //       console.log(
  //         `Filtering name: ${name}, lowercased: ${lowerName}, isMatch: ${isMatch}`
  //       );
  //       return isMatch;
  //     });

  //     console.log("Filtered names:", filtered);
  //     return filtered;
  //   }, [searchTerm]);

  useEffect(() => {
    debounce(() => {
      const result = filterNames(searchTerm);
      setDebouncedResult(result);
    }, 300);
  }, [searchTerm]);

  return (
    <>
      <label className="filter-label" htmlFor="filter">
        {" "}
        Filter names
      </label>
      <input
        id="filter"
        type="text"
        value={searchTerm}
        onChange={handleFilterChange}
      />

      {/* using useMemo */}
      {/* {filteredNames.map((item) => {
        return (
            <p key={item} className="">{item}</p>
        );
      })} */}

      {/* Using debouncing */}
      {debouncedResult.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </>
  );
}

export default SearchAndFilter;
