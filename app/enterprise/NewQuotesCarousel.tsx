import { Blockquote } from '@mantine/core';
import Slider from 'react-slick';
import { QuoteCarouselProps } from './Projection';


const NewQuotesCarousel: React.FC<QuoteCarouselProps> = ({ elements }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true
    }

    const slides = elements.map((quote, index) => (
        <div className="pl-[20px] pr-[20px] mb-8" key={index}>
            <Blockquote cite={quote.quote.author ? ("- " + quote.quote.author) : ""}>
                <div dangerouslySetInnerHTML={{ __html: quote.quote.text }}></div>
            </Blockquote>
        </div>
    ));

    return (
        <div className='container'>
            <Slider {...settings}>
                {slides}
            </Slider>
        </div>
    )
}

export default NewQuotesCarousel