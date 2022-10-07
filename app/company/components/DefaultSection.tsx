import { DndListHandleProps } from "@app/core/components/forms/Sections";
import {
  Container,
  Divider,
  Grid,
  SimpleGrid,
  Skeleton,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import SectionBlockQuotes from "./sectionComponents/BlockQuotes";
import SectionDescription from "./sectionComponents/Description";
import SectionHeader from "./sectionComponents/Header";
import SectionMedia from "./sectionComponents/Media";

const PRIMARY_COL_HEIGHT = 300;

type iDefaultSectionProps = {
  id: string;
  name: string;
  description: string;
};

const DefaultSection: React.FC<iDefaultSectionProps> = ({
  name,
  id,
  description,
}) => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
    <div
      style={{
        marginBottom: 50,
        padding: 30,
        backgroundColor: "white"
      }}
    >
      <SectionHeader id={id} />
      <Grid mb={40}>
        <Stack>
          <SectionDescription name={name} />
          <SectionBlockQuotes />
        </Stack>
        <SectionMedia />
      </Grid>
      <Divider size="md" mb={5}/>
      <Divider size="sm" mb={5}/>
      <Divider size="xs" mb={40}/>
      <Grid>
      <Skeleton height={600} mt={15} width={'70%'} radius="md" animate={false} />
      <Skeleton height={400} mt={15} ml={'auto'} width={'29%'} radius="md" animate={false} />
      </Grid>
    </div>
  );
};

export default DefaultSection;
