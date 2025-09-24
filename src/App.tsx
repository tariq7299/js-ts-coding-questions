import { useEffect, useState, useMemo } from "react";
import "./App.css";

function App() {
  const arr = [2, [3, 5], [4, [8, 21]]];
  /* 
    We need to flaten this array and make
    Approahc 1: We could like use a flatMap to like return all the arrays flattend
    Approach 2: we could like use normal map
  
  */

  const flatArrFunc = (arr: any[]): any => {
    const flattenedArr: any = [];
    const flatArrRecsuvely = (arr: any[]) => {
      const nestedArray = [...arr];

      for (const ele of nestedArray) {
        if (Array.isArray(ele)) {
          flatArrRecsuvely(ele);
        } else {
          flattenedArr.push(ele);
        }
      }
    };

    flatArrRecsuvely(arr);

    return flattenedArr;
  };

  // Using .flat()
  useEffect(() => {
    const flattend = arr.flat(Infinity);
    console.log("flattend", flattend);
    console.log("arr", arr);
  }, []);

  // Using custom implelmentation
  // useEffect(() => {
  //   const flattend = flatArrFunc(arr);
  //   console.log("flattend", flattend);
  //   console.log("arr", arr);
  // }, []);

  return <>{/* <SearchAndFilter /> */}</>;
}

export default App;
