import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";

const PRIMARY_COL_HEIGHT = 70;

const Option1 = () => {
  const theme = useMantineTheme();

  return (
    <Container my="md">
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col>
            <Skeleton
              radius="md"
              animate={false}
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>

      <Skeleton height={70} mt={15} radius="md" animate={false} />
    </Container>
  );
};

export default Option1;
