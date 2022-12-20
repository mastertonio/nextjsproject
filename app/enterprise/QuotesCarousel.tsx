import { Blockquote, Image, Card, Text, Group, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconStar } from '@tabler/icons';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react';
import { QuoteCarouselProps } from './Projection';


const QuotesCarousel: React.FC<QuoteCarouselProps> = ({ type, position, elements }) => {
    const autoplay = useRef(Autoplay({ delay: 4000 }));
    const slides = elements.map((quote) => (
        <Carousel.Slide key={quote.quote.text}>
            <Blockquote cite={quote.quote.author ? ("- " + quote.quote.author) : ""}>
                <div dangerouslySetInnerHTML={{ __html: quote.quote.text }}></div>
            </Blockquote>
        </Carousel.Slide>
    ));

    return (
        <Carousel
            mb={8}
            style={{ }}
            loop
            withControls={false}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
        >
            {slides}
        </Carousel>
    );
}


export default QuotesCarousel