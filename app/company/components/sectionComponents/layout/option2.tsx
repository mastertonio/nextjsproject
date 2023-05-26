import {
    Container,
    Grid,
    SimpleGrid,
    Skeleton,
    useMantineTheme,
  } from "@mantine/core";
  
  const PRIMARY_COL_HEIGHT = 70;
  
  const Option2 = () => {
    const theme = useMantineTheme();
  
    return (
      <Container my="md">
      <Skeleton height={70} mt={15} mb={10} radius="md" animate={false} />
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
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
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        </SimpleGrid>
  
      </Container>
    );
  };
  
  export default Option2;
  