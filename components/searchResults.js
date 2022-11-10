import ImageResult from './imageResult'
import { Waypoint } from 'react-waypoint'
import { useState, useEffect } from 'react'

/* 
	Props:
		results: Search result JSON.
		isValidating: SWR value. if there's a request or revalidation loading
		page, setPage: SWRInfinite size value and setter.

	This component controls the rendering of search results. Should only render something if there are any results.

	Whenever props.results changes, we build the render code by iterating through it and store it in the resultsCache state variable, and render that.

	Building the cache in useEffect stops the whole component from refreshing and launching the user back to the top of the results.

	But it's a bit scuffed, as the useEffect hook is currently the only place 
*/

export default function SearchResults(props) {
	function buildResultsCache() {
		return props.results.map((page) => {if(page.items) page.items.map((item) => <ImageResult key={item.title} data={item} />)});
	}

	const [resultsCache, setResultsCache] = useState(buildResultsCache());
	//TODO: Check if this works to initialize the resultsCache state.

	/* 
		Rebuild results whenever they change.
	*/
	useEffect(() => {
		setResultsCache(buildResultsCache());
	}, [props.results]);

	/* 
		_renderWaypoint() handles displaying our loading indicator, as well as setting our scroll waypoint.

		If SWR is still validating, show the loading indicator. If not, and props.results is not null, 
	*/

	function _renderLoaderOrWaypoint() {
		if(props.isValidating) {
			return(
				<svg class="animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 50 50">
					<path fill="#FFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"/>
				</svg>
			)
		}
		if(!props.isValidating && props.results) {
			return <Waypoint onEnter={onWaypointEnter} />
		}
	}

	if(props.error) return(<div>Sorry! Something went wrong!</div>);
	//For when SWR hasn't returned any results yet.
	if(!props.results) return(
		<div>{_renderLoaderOrWaypoint()}</div>
	);

	const onWaypointEnter = () => {
		if(!props.isValidating) {
			props.setPage(props.page+1);
		}
	}

	return (
		<div class="container flex flex-row flex-wrap h-full pt-4">
			{resultsCache}
			{_renderLoaderOrWaypoint()}
		</div>
	)
}