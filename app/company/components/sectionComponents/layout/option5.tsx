import {
    Container,
    Grid,
    SimpleGrid,
    Skeleton,
    useMantineTheme,
  } from "@mantine/core";
  
  const PRIMARY_COL_HEIGHT = 70;
  
  const Option5 = () => {
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  
    return (
      <Container my="md">
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        </SimpleGrid>
  
        <Skeleton height={70} mt={15} radius="md" animate={false} />
      </Container>
    );
  };
  
  export default Option5;
  