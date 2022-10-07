import { Grid, Text } from "@mantine/core";

type iSectionHeaderProps = {
    id: string
}

const SectionHeader: React.FC<iSectionHeaderProps> = ({ id }) => {
  return (
      <Grid grow  justify="space-between" mb={10}>
        <Text size={40} weight={700}>{id}</Text>
        <Text color="green" size={40} weight={700}>${Math.floor(Math.random()*50000)}</Text>
      </Grid>
  );
};

export default SectionHeader;
