import Image from 'next/image'
import Link from 'next/link'

/* 
	Props:
		data: The search result data
	
	This component controls how we render individual items from the search result.
*/

export default function ImageResult(props) {
	const {title} = props.data;
	const {contextLink, thumbnailLink, thumbnailWidth, thumbnailHeight} = props.data.image;
	return(
		<div class="m-1 hover:drop-shadow-md">
			<Link href={contextLink}>
			<Image src={thumbnailLink} width={thumbnailWidth} height={thumbnailWidth} alt={title}/>
			</Link>
		</div>
	);
}