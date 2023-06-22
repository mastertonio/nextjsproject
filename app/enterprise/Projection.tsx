import VideoLinkMedia from "@app/company/components/sectionComponents/VideoLinkMedia";
import { Blockquote, Grid, SimpleGrid, Stack, Text, Divider } from "@mantine/core";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import ReactPlayer from 'react-player';
import QuotesCarousel from "./NewQuotesCarousel";
import he from 'he';

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
  content: any;
  // length: number;
  // quotes: QuoteCarouselProps;
};

const Projection = ({
  title,
  // subTitle,
  description,
  content,
  // length,
  // quotes,
}: iProjectionProps) => {
  console.log(title)
  // const columns =
  //   content.elements[0].length > 0
  //     ? content.elements[0]
  //       .filter((elem:any) => elem.dataType !== "revolver")
  //       .slice(0, 3)
  //       .map((element:any, idx:any) =>
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
  //         )
  //       )
  //     : null;

  return (
    <div className="overflow-hidden bg-white shadow p-[20px]">
      <div className="ml-[22px] mr-[22px]">
        <h1 className="text-left text-[#676a6c] text-[26px] sm:text-[30px] font-medium mb-[20px]">{title} <span className="float-right text-[#216C2A] font-bold">$0</span></h1>
        <Divider my="sm" color="#eee" size={1} className="mt-[20px] mb-[20px]" />
        {/* <div dangerouslySetInnerHTML={{ __html: title }} /> */}
        {/* <div dangerouslySetInnerHTML={{ __html: subTitle }} /> */}
        {/* <div dangerouslySetInnerHTML={{ __html: description }} /> */}
      </div>
      <Grid className="ml-[22px] mr-[22px]" columns={24}>
        <Grid.Col
          md={14}
          lg={14}
          className="lg:ml-0 md:ml-0 md:mr-0 lg:mr-0 mt-0"
        >
          <Text ml={30} dangerouslySetInnerHTML={{ __html: description ? he.decode(description) : "" }} color="dark" />
          <Divider my="sm" color="#eee" size={1} />
        </Grid.Col>
        <Suspense fallback={`Loading...`}>
          <Grid.Col md={10} lg={10}>
            {content.elements[0] ? (
              <div className="relative pt-[56.2353%]">
                <ReactPlayer
                  controls
                  playing
                  light={true}
                  className="absolute top-0 left-0"
                  url={content.elements[0]?.link ?? ''}
                  width="100%"
                  height="100%"
                />
              </div>
            ) : null}
          </Grid.Col>
        </Suspense>
        {/* {quotes.position == "top" ? (
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
        )} */}
      </Grid>
      {/* { quotes.position == "bottom" ? (<QuotesCarousel type={quotes.type} position={quotes.position} elements={quotes.elements} />) : ""} */}
    </div>
  );
};

export default Projection;
