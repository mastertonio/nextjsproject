import VideoLinkMedia from "@app/company/components/sectionComponents/VideoLinkMedia"
import { Blockquote, Grid, SimpleGrid, Stack } from "@mantine/core"
import dynamic from "next/dynamic"
import { Suspense, useEffect } from "react"
import QuotesCarousel from "./QuotesCarousel"

const VideoMedia = dynamic(() => import('@app/company/components/sectionComponents/VideoLinkMedia'), {
    ssr: false,
})

export type Description = {
    type: string
    text: string
}

export type Media = {
    type: string
    class: string
    mediaOrigin: string // youtubee or another video - will act as second type to the media type
    link: string
}

export type RevolverQuotes = {
    type: string
    elements: []
}

export type Content = {
    type: string,
    elements: any[],
}

type QuoteProps = {
    type: string,
    quote: {
        text: string,
        author: string,
    },
}

export type QuoteCarouselProps = {
    type: string,
    position: string, //top , bottom of writeup, outside = outside entire section header
    elements: QuoteProps[]
}

type iProjectionProps = {
    title: string
    subTitle: string
    description: string
    content: Content
    length: number
    quotes: QuoteCarouselProps
}


const Projection = ({ title, subTitle, description, content, length, quotes }: iProjectionProps) => {
    const desc = content.elements.length > 0 ? content.elements.filter((elem) => elem.type == "description") : null
    const mediaLink = content.elements.length > 0 ? content.elements.filter((elem) => elem.type == "media") : null
    // const quotes = content.elements.length > 0 ? content.elements.filter((elem) => elem.type == "revolver") : null

    const columns = content.elements.length > 0 ? content.elements.filter((elem) => elem.type !== "revolver").slice(0, 3).map((element, idx) => (element.type == "description" ?
        <Grid.Col span={element.span} key={idx} style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}><div dangerouslySetInnerHTML={{ __html: element.text }}></div></Grid.Col>
        : element.type == "media" ?
            <Suspense fallback={`Loading...`}>
                <Grid.Col key={idx} w={'40%'} span={element.span}>
                    <VideoMedia media={element.link ? element.link : null} />
                </Grid.Col>
            </Suspense> : "")) : null

    return (
        <div>
            <div style={{ marginRight: 22, marginLeft: 22 }}>
                <div dangerouslySetInnerHTML={{ __html: title }} />
                <div dangerouslySetInnerHTML={{ __html: subTitle }} />
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <Grid>
                {columns ? columns : ''}
                <div>
                    <QuotesCarousel type={quotes.type} position={quotes.position} elements={quotes.elements} />
                </div>
            </Grid>
            {/* { quotes.position == "bottom" ? (<QuotesCarousel type={quotes.type} position={quotes.position} elements={quotes.elements} />) : ""} */}
        </div>

    )
}

export default Projection