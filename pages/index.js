import Head from 'next/head'
import { useState, useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import ImageResult from '../components/imageResult'
import { Waypoint } from 'react-waypoint'

/* 
  Image Search Audition Project

  This is probably less modular than it could be, but since this is a one-off, it doesn't especially *need* to be reusable.
*/

  // A one-page response copied from a successful result, and a dummy fetcher function that returns this object.
const testObject = {
  "kind": "customsearch#search",
  "url": {
    "type": "application/json",
    "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
  },
  "queries": {
    "request": [
      {
        "title": "Google Custom Search - \"test\"",
        "totalResults": "22200",
        "searchTerms": "\"test\"",
        "count": 10,
        "startIndex": 1,
        "inputEncoding": "utf8",
        "outputEncoding": "utf8",
        "safe": "off",
        "cx": "001361074102112665899:p7mybnrloug",
        "searchType": "image"
      }
    ],
    "nextPage": [
      {
        "title": "Google Custom Search - \"test\"",
        "totalResults": "22200",
        "searchTerms": "\"test\"",
        "count": 10,
        "startIndex": 11,
        "inputEncoding": "utf8",
        "outputEncoding": "utf8",
        "safe": "off",
        "cx": "001361074102112665899:p7mybnrloug",
        "searchType": "image"
      }
    ]
  },
  "context": {
    "title": "Fréttamyndir"
  },
  "searchInformation": {
    "searchTime": 0.221058,
    "formattedSearchTime": "0.22",
    "totalResults": "22200",
    "formattedTotalResults": "22,200"
  },
  "items": [
    {
      "kind": "customsearch#result",
      "title": "Government Members Test Negative for Coronavirus - Iceland Monitor",
      "htmlTitle": "Government Members <b>Test</b> Negative for Coronavirus - Iceland Monitor",
      "link": "https://cdn.mbl.is/frimg/1/22/54/1225433.jpg",
      "displayLink": "www.mbl.is",
      "snippet": "Government Members Test Negative for Coronavirus - Iceland Monitor",
      "htmlSnippet": "Government Members <b>Test</b> Negative for Coronavirus - Iceland Monitor",
      "mime": "image/jpeg",
      "fileFormat": "image/jpeg",
      "image": {
        "contextLink": "https://www.mbl.is/english/politics_and_society/2020/08/25/government_members_test_negative_for_coronavirus/",
        "height": 1094,
        "width": 1640,
        "byteSize": 136373,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4P1Xv03XqZE3Ac7QpQYTDW-6_2XKrA_jxFB-BFeRhGLhLSYcfeIdMvA&s",
        "thumbnailHeight": 100,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Q10 Products Explained | Anti-Ageing Skin Care | NIVEA",
      "htmlTitle": "Q10 Products Explained | Anti-Ageing Skin Care | NIVEA",
      "link": "https://images-us.nivea.com/-/media/global/advice/nice-skin/what-is-hyaluronic-acid/what-is-hyaluronic-acid-header.jpg?rx=516&ry=0&rw=2063&rh=806",
      "displayLink": "www.mbl.is",
      "snippet": "Q10 Products Explained | Anti-Ageing Skin Care | NIVEA",
      "htmlSnippet": "Q10 Products Explained | Anti-Ageing Skin Care | NIVEA",
      "mime": "image/jpeg",
      "fileFormat": "image/jpeg",
      "image": {
        "contextLink": "https://www.mbl.is/mm/augl/counter/104921_123233.html",
        "height": 806,
        "width": 2063,
        "byteSize": 220467,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcrh7BMXhB6uiORtCYqhd48SfOCYxQqn0hrPeyXPVjgreF0GhpWO5kGw&s",
        "thumbnailHeight": 59,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Bakuchiol in skincare | Face care | NIVEA Advice",
      "htmlTitle": "Bakuchiol in skincare | Face care | NIVEA Advice",
      "link": "https://images-us.nivea.com/-/media/local/gb/dam22/headers/nx1941_nivea_face_care_essentials_vid2_03-screen.jpg?rx=0&ry=0&rw=1600&rh=625",
      "displayLink": "www.mbl.is",
      "snippet": "Bakuchiol in skincare | Face care | NIVEA Advice",
      "htmlSnippet": "Bakuchiol in skincare | Face care | NIVEA Advice",
      "mime": "image/jpeg",
      "fileFormat": "image/jpeg",
      "image": {
        "contextLink": "https://www.mbl.is/mm/augl/counter/108445_131225.html",
        "height": 625,
        "width": 1600,
        "byteSize": 99214,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS00yWBCmq-VUp0Z2jOsoi0Q6VTNxs8g4wGvvf7mf2Svx_YX-ibFYiQIA&s",
        "thumbnailHeight": 59,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Magicbar - NIVEA",
      "htmlTitle": "Magicbar - NIVEA",
      "link": "https://images-us.nivea.com/-/media/local/gb/campaigns/web-banner---magicbar-png/2613810408701bannerbriefmagicbarsamendsop2.jpg?rx=0&ry=0&rw=2560&rh=1000",
      "displayLink": "www.mbl.is",
      "snippet": "Magicbar - NIVEA",
      "htmlSnippet": "Magicbar - NIVEA",
      "mime": "image/jpeg",
      "fileFormat": "image/jpeg",
      "image": {
        "contextLink": "https://www.mbl.is/mm/augl/counter/100287_112085.html",
        "height": 1000,
        "width": 2560,
        "byteSize": 219528,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMunyOhMBz-M6gUNYb2qE73uanNw_RsFRqOBpGtwDaz2DUc6ocTxXSPw&s",
        "thumbnailHeight": 59,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "COVID-19 Spreads Fast in Iceland - Iceland Monitor",
      "htmlTitle": "COVID-19 Spreads Fast in Iceland - Iceland Monitor",
      "link": "https://cdn.mbl.is/frimg/1/23/40/1234059.jpg",
      "displayLink": "www.mbl.is",
      "snippet": "COVID-19 Spreads Fast in Iceland - Iceland Monitor",
      "htmlSnippet": "COVID-19 Spreads Fast in Iceland - Iceland Monitor",
      "mime": "image/jpeg",
      "fileFormat": "image/jpeg",
      "image": {
        "contextLink": "https://www.mbl.is/english/news/2020/10/09/covid_19_spreads_fast_in_iceland/",
        "height": 1094,
        "width": 1640,
        "byteSize": 695350,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQco-cPqDgD4OUWT0-0WHzK20_JJjUQd7OSkzCvfmfe9C3YDHk4fHktU&s",
        "thumbnailHeight": 100,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Pillow fight, a traditional test of manhood takes place in ...",
      "htmlTitle": "Pillow fight, a traditional <b>test</b> of manhood takes place in ...",
      "link": "https://cdn.mbl.is/frimg/9/70/970370.jpg",
      "displayLink": "www.mbl.is",
      "snippet": "Pillow fight, a traditional test of manhood takes place in ...",
      "htmlSnippet": "Pillow fight, a traditional <b>test</b> of manhood takes place in ...",
      "mime": "image/jpeg",
      "fileFormat": "image/jpeg",
      "image": {
        "contextLink": "https://www.mbl.is/english/culture_and_living/2017/06/11/pillow_fight_a_traditional_test_of_manhood_takes_pl/",
        "height": 557,
        "width": 820,
        "byteSize": 73515,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxDB5oRDtzgx_6cYqFitZBr-_5c9G9PAymza2j1tKrwQBXxgdJ1T-pEw&s",
        "thumbnailHeight": 98,
        "thumbnailWidth": 144
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Will humanity pass the test?",
      "htmlTitle": "Will humanity pass the <b>test</b>?",
      "link": "https://cdn.mbl.is/m2/kQhp-cZ1wdJACTvaM1XXKRFlib8=/1640x1093/smart/frimg/8/44/844087.jpg",
      "displayLink": "www.mbl.is",
      "snippet": "Will humanity pass the test?",
      "htmlSnippet": "Will humanity pass the <b>test</b>?",
      "mime": "image/jpeg",
      "fileFormat": "image/jpeg",
      "image": {
        "contextLink": "https://www.mbl.is/ferdalog/frettir/2015/10/19/arctic_2015_will_humanity_pass_the_test/",
        "height": 1093,
        "width": 1640,
        "byteSize": 121688,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu1P7rLOoOi27NQIwCvMPETEjQFeKK9uRWIT9Ss6ZBaVnQ9Dz6zPgnqA&s",
        "thumbnailHeight": 100,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Nasal Spray Developed To Help Fight COVID-19 - Vísir",
      "htmlTitle": "Nasal Spray Developed To Help Fight COVID-19 - Vísir",
      "link": "https://www.visir.is/i/1D553B03967E3EE853730A274B00758B1B2D32BEDAAF45BD014785C15F9180BC_713x0.jpg",
      "displayLink": "www.visir.is",
      "snippet": "Nasal Spray Developed To Help Fight COVID-19 - Vísir",
      "htmlSnippet": "Nasal Spray Developed To Help Fight COVID-19 - Vísir",
      "mime": "image/jpeg",
      "fileFormat": "image/jpeg",
      "image": {
        "contextLink": "https://www.visir.is/g/20202025267d",
        "height": 475,
        "width": 713,
        "byteSize": 49266,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvRnnlkI_FoKT_a7CeAAYvcwB49-SdIJ_KBiPWBslZAuyzA2nQt5vB_s&s",
        "thumbnailHeight": 93,
        "thumbnailWidth": 140
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Iceland Dark Red on ECDC Map for the First Time - Iceland Monitor",
      "htmlTitle": "Iceland Dark Red on ECDC Map for the First Time - Iceland Monitor",
      "link": "https://cdn.mbl.is/frimg/1/30/97/1309719.jpg",
      "displayLink": "www.mbl.is",
      "snippet": "Iceland Dark Red on ECDC Map for the First Time - Iceland Monitor",
      "htmlSnippet": "Iceland Dark Red on ECDC Map for the First Time - Iceland Monitor",
      "mime": "image/jpeg",
      "fileFormat": "image/jpeg",
      "image": {
        "contextLink": "https://www.mbl.is/english/news/2021/11/19/iceland_dark_red_on_ecdc_map_for_the_first_time/",
        "height": 1158,
        "width": 1640,
        "byteSize": 158537,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO69UddUxDo89zPos0-hLdblFu0VXo9SXel__2noqmHle9plp7zsMIng&s",
        "thumbnailHeight": 106,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "European Banks",
      "htmlTitle": "European Banks",
      "link": "x-raw-image:///996de0e55dfd12795917d40b92164d1aa8ed313474f8ca151724189b584d0c0b",
      "displayLink": "www.mbl.is",
      "snippet": "European Banks",
      "htmlSnippet": "European Banks",
      "mime": "image/",
      "fileFormat": "image/",
      "image": {
        "contextLink": "https://www.mbl.is/media/91/391.pdf",
        "height": 407,
        "width": 1379,
        "byteSize": 27945,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGzI3YHemdZWZKs8evCPHVuAdXXJ_oGNcnLU5mM3utIGodhe6By-etdQ&s",
        "thumbnailHeight": 44,
        "thumbnailWidth": 150
      }
    }
  ]
}

function testFetcher(key) {
  return testObject;
}

//SWR Hook.
function fetcher(key) {
  return fetch(key).then(
    (res) => {
      if(!res.ok) {
        throw (`ERROR: ${res.status}`);
      }
      return(res.json());
    }
  );
}

export default function Home() {
  /*
  State initialization.
  State breakdown:
    searchResults: State storage for render-ready search results. Updates on useEffect.
    searchString: The value of the input field. Initial value: Empty String. Setter hooked into the form input onChange. Used for forming requestURL.
 */
  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState("");

  //Turning off revalidation because I keep accidentally burning through the 100 request per day limit.
  const SWROptions = {
    initialSize: 1
  }

  function getKey(pageIndex, previousPageData) {
    if(searchString) {
      let startOffset = (pageIndex*10) + 1;
      //API Key goes here. Change this if you want to rebuild and test.
      let apiKey = "AIzaSyC10izwLW9YnsNdhzWuz6bxPFUhk_L9K7o"
      return `https://content.googleapis.com/customsearch/v1?cx=001361074102112665899%3Ap7mybnrloug&q="${searchString}"&searchType=image&start=${startOffset}&num=10&key=${apiKey}`;
    } else return null;
  }
  const {data, error, isValidating, mutate, size, setSize} = useSWRInfinite(getKey, fetcher, SWROptions);

  //onSubmit hook for the search form. Sets requestURL and orders SWR to mutate.
  const onSubmit = (e) => {
      e.preventDefault();
      setSearchString(e.target.searchString.value);
  }

  //Fires when scrolling near the bottom of the page. Tells SWR to get more results.
  function onWaypointEnter() {
    setSize(size + 1);
  }

  //Building and storing render-ready results.
  useEffect(() => {
    if(data && !isValidating) {
      let newData = []
      data.forEach(
        page => {
          if(page.items) {
            page.items.forEach(
              item => {
                newData.push(<ImageResult key={item.title} data={item} />);
              }
            )
          }
        }
      );
      setSearchResults(newData);
    }
  }, [data, error, isValidating]);

  //Shows a spinny loader if SWR is validating, puts down a Waypoint if we have validated results.
  function renderWaypointOrLoader() {
    if(searchResults && !error) {
      if(isValidating) {
        return(
          <svg class="animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 50 50">
            <path fill="#FFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"/>
          </svg>
        )
      }
      if(!isValidating) {
        return <Waypoint onEnter={onWaypointEnter} />
      }
    }
  }

  function renderResultsOrError() {
    if(error) {
      return error;
    }
    if(searchResults && !error) {
      return searchResults;
    }
  }

  return (
    <div>
      <Head>
        <title>Myndaleit</title>
      </Head>

      <main>
        <h1 class="text-xl m-3">Myndaleit</h1>

        <div>
            <form onSubmit={onSubmit} method="post">
              <label class="m-1" htmlFor="searchString">Leita að:</label>
              <input class="m-1 p-1" type="text" id="searchString" name="searchString" />
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Leita</button>
            </form>
        </div>

        <div class="container flex flex-row flex-wrap h-full pt-4">
          {renderResultsOrError()}
          {renderWaypointOrLoader()}
        </div>
      </main>
    </div>
  )
}