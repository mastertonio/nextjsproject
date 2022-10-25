import { DndListHandleProps } from "@app/core/components/forms/Sections";
import {
  Button,
  Container,
  Divider,
  Grid,
  SimpleGrid,
  Skeleton,
  Stack,
  useMantineTheme,
  Image,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import SectionBlockQuotes from "./sectionComponents/BlockQuotes";
import SectionDescription from "./sectionComponents/Description";
import SectionHeader from "./sectionComponents/Header";
import SectionMedia from "./sectionComponents/VideoLinkMedia";
import CreateCalculator from "./sectionComponents/modals/CreateCalculator";
import MediaSelection from "./sectionComponents/modals/MediaSelection";
import ImageDropzone from "./sectionComponents/ImageTypeMedia";
import { useState } from "react";
import GifsMedia from "./sectionComponents/GifsMedia";
import VideoLinkMedia from "./sectionComponents/VideoLinkMedia";

const PRIMARY_COL_HEIGHT = 300;

type iDefaultSectionProps = {
  id: string;
  name: string;
  description: string;
  title: string;
  quote: string;
  media: string;
  price: number;
  author: string;
};

const DefaultSection: React.FC<iDefaultSectionProps> = ({
  name,
  id,
  description,
  media,
  price,
  quote,
  title,
  author,
}) => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  const [mediaType, setMediaType] = useState("");

  return (
    <div
      style={{
        marginBottom: 50,
        padding: 30,
        marginLeft: 30,
        backgroundColor: "white",
        borderRadius: 20
      }}
    >
      <SectionHeader id={id} title={title} price={price} />
      <Grid mb={40}>
        <Stack>
          <SectionDescription name={title} description={description} />
          <SectionBlockQuotes quote={quote} author={author} />
        </Stack>
        <Stack ml={'auto'}>
          {mediaType == "image" ? (
            <ImageDropzone />
          ) : mediaType == "gifs" ? (
            <GifsMedia />
          ) : mediaType == "video" ? (
            <VideoLinkMedia />
          ) : (
            ""
          )}
          <MediaSelection setMediaType={setMediaType} mediaType={mediaType} />
        </Stack>

        {/* <SectionMedia media={media} /> */}
      </Grid>
      {/* <Divider size="md" mb={5} />
      <Divider size="sm" mb={5} />
      <Divider size="xs" mb={40} /> */}
      {/* <Grid>
        <CreateCalculator />
        <Skeleton
          height={400}
          mt={15}
          ml={"auto"}
          width={"29%"}
          radius="md"
          animate={false}
        />
      </Grid> */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button leftIcon={<IconPlus />} variant="subtle"></Button>
      </div> */}
    </div>
  );
};

export default DefaultSection;
