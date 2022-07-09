import ImageFinder from "./ImageFinder";
import ImageListContent from "./ImageListContent";

const dataSource = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format',
        imgForSubmit: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1000&fit=crop&auto=format',
        author: '@bkristastucchio',
        authorLink: 'https://unsplash.com/@bkristastucchio'
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=248&fit=crop&auto=format',
        imgForSubmit: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1000&fit=crop&auto=format',
        author: '@rollelflex_graphy726',
        authorLink: 'https://unsplash.com/@rollelflex_graphy726'
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=248&fit=crop&auto=format',
        imgForSubmit: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=1000&fit=crop&auto=format',
        author: '@nolanissac',
        authorLink: 'https://unsplash.com/@nolanissac'
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=248&fit=crop&auto=format',
        imgForSubmit: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1000&fit=crop&auto=format',
        author: '@arwinneil',
        authorLink: 'https://unsplash.com/@arwinneil'
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=248&fit=crop&auto=format',
        imgForSubmit: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=1000&fit=crop&auto=format',
        author: '@shelleypauls',
        authorLink: 'https://unsplash.com/@shelleypauls'
    },
];

interface ImageFinderSampleProps {
    setImageUrl(imageUrl: string): any
}

export default function ImageFinderSample(props: ImageFinderSampleProps) {
    return <ImageFinder renderBody={() => {
        return <ImageListContent dataSource={dataSource} imageOnClick={props.setImageUrl} />
    }} description="Use a sample Image" />
}