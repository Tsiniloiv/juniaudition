import Head from 'next/head'
import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import SearchResults from '../components/searchResults'

/* 
  Image Search Audition Project

  This is probably less modular than it could be, but since this is a one-off, it doesn't especially *need* to be reusable.
*/

export default function Home() {
  /*
  State initialization.
  State breakdown:
    requestURL: The API call. Initial value: Empty String. Setter hooked into the form onSubmit.
    searchString: The value of the input field. Initial value: Empty String. Setter hooked into the form input onChange. Used for forming requestURL.
 */
  const [showResults, setShowResults] = useState(false);
  const [searchString, setSearchString] = useState("");

  //SWR Hook. Turning off revalidation because I keep accidentally burning through the 100 request per day limit.
  const fetcher = (requestURL) => fetch(requestURL).then((res) => {
    if(!res.ok) {
      throw "Response not OK!";
    } 
    return res.json()
  });
  const SWROptions = {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    initialSize: 5
  }
  const getKey = (pageIndex, previousPageData) => {
    let startOffset = (pageIndex*10) + 1;
    return `https://content.googleapis.com/customsearch/v1?cx=001361074102112665899%3Ap7mybnrloug&q="${searchString}"&searchType=image&start=${startOffset}&num=10&key=AIzaSyC10izwLW9YnsNdhzWuz6bxPFUhk_L9K7o`
  }
  const {data, error, isValidating, mutate, size, setSize} = useSWRInfinite(getKey, fetcher, SWROptions);

  //onSubmit hook for the search form. Sets requestURL and orders SWR to mutate.
  const onSubmit = (e) => {
      e.preventDefault();
      setSearchString(e.target.searchString.value);
  }

  return (
    <div>
      <Head>
        <title>Myndaleit</title>
      </Head>

      <main>
        <h1 class="text-xl m-3">Myndaleit</h1>

        <div class="container m-1">
            <form onSubmit={onSubmit} method="post">
              <label class="m-1" htmlFor="searchString">Leita að:</label>
              <input class="m-1 p-1" type="text" id="searchString" name="searchString" />
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Leita</button>
            </form>
        </div>

        <SearchResults results={data} error={error} isValidating={isValidating} page={size} setPage={setSize} />
      </main>
    </div>
  )
}