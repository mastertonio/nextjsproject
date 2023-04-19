import VideoLinkMedia from "@app/company/components/sectionComponents/VideoLinkMedia";
import { Blockquote, Grid, SimpleGrid, Stack } from "@mantine/core";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import QuotesCarousel from "./NewQuotesCarousel";

const VideoMedia = dynamic(
  () => import("@app/company/components/sectionComponents/VideoLinkMedia"),
  {
    ssr: false,
  }
);

export type Description = {
  type: string;
  text: string;
};

export type Media = {
  type: string;
  class: string;
  mediaOrigin: string; // youtubee or another video - will act as second type to the media type
  link: string;
};

export type RevolverQuotes = {
  type: string;
  elements: [];
};

export type Content = {
  type: string;
  elements: any[];
};

type QuoteProps = {
  type: string;
  quote: {
    text: string;
    author: string;
  };
};

export type QuoteCarouselProps = {
  type: string;
  position: string; //top , bottom of writeup, outside = outside entire section header
  elements: QuoteProps[];
};

type iProjectionProps = {
  title: string;
  // subTitle: string;
  description: string;
  // content: Content;
  // length: number;
  // quotes: QuoteCarouselProps;
};

const Projection = ({
  title,
  // subTitle,
  description,
  // content,
  // length,
  // quotes,
}: iProjectionProps) => {
  console.log(title)
  // const columns =
  //   content.elements.length > 0
  //     ? content.elements
  //       .filter((elem) => elem.type !== "revolver")
  //       .slice(0, 3)
  //       .map((element, idx) =>
  //         element.type == "description" ? (
  //           <Grid.Col
  //             span={element.span}
  //             key={idx}
  //             className="ml-[30px] mr-[30px] mt-[30px] max-w-[100%] sm:max-w-[50%]"
  //           >
  //             <div dangerouslySetInnerHTML={{ __html: element.text }}></div>
  //           </Grid.Col>
  //         ) : element.type == "media" ? (
  //           <Suspense fallback={`Loading...`}>
  //             <Grid.Col key={idx} span={element.span} className="sm:w-[40%] w-[100%]">
  //               <VideoMedia media={element.link ? element.link : null} />
  //             </Grid.Col>
  //           </Suspense>
  //         ) : (
  //           ""
  //         )4
  //       )
  //     : null;

  return (
    <div className="overflow-hidden">
      <div className="ml-[22px] mr-[22px]">
        <div dangerouslySetInnerHTML={{ __html: title }} />
        {/* <div dangerouslySetInnerHTML={{ __html: subTitle }} /> */}
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      {/* <Grid className="sm:flex block">
        {quotes.position == "top" ? (
          <QuotesCarousel
            type={quotes.type}
            position={quotes.position}
            elements={quotes.elements}
          />
        ) : (
          ""
        )}
        {columns ? columns : ""}
        {quotes.position == "bottom" ? (
          <QuotesCarousel
            type={quotes.type}
            position={quotes.position}
            elements={quotes.elements}
          />
        ) : (
          ""
        )}
      </Grid> */}
      {/* { quotes.position == "bottom" ? (<QuotesCarousel type={quotes.type} position={quotes.position} elements={quotes.elements} />) : ""} */}
    </div>
  );
};

export default Projection;
