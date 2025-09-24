import useFetch from "./hooks/useFetch";

export const UseFetchQuestion = () => {
  const { data, error, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/"
  );

  console.log("data", data);
  console.log("error", error);
  console.log("loading", loading);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error has occurerd: {error}</p>;
  }

  return (
    <>
      {data && (
        <>
          {data.map((item: any) => {
            return (
              <div key={item.id}>
                <p>{item.userId}</p>
                <p>{item.title}</p>
              </div>
            );
          })}
        </>
      )}

      {/* <SearchAndFilter /> */}
    </>
  );
};
