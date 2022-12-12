import { Blockquote, Image, Card, Text, Group, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconStar } from '@tabler/icons';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react';
import { QuoteCarouselProps } from './Projection';


const quotes = [
    {
        type: "quote",
        quote: {
            text: "We love the tool! It is changing the conversation we have with our existing customers.",
            author: "David Verhaag, Vice President Customer Success",
        },
    },
    {
        type: "quote",
        quote: {
            text: "Hey Michael, I created an ROI for my first client yesterday and we closed today. The ROI Shop made getting approval from the CFO a piece of cake and resulted in my first sale!",
            author: "Natalie Grant - Sales Rep",
        },
    },
    {
        type: "quote",
        quote: {
            text: "IT spending is on the decline - It will be more important than ever to arm your <q>Champion</q>> with the tools necessary to sell the project internally.",
            author: "Gartner",
        },
    },
]

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
            style={{ backgroundColor: "#fff" }}
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