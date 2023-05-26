import {
    Container,
    Grid,
    SimpleGrid,
    Skeleton,
    useMantineTheme,
  } from "@mantine/core";
  
  const PRIMARY_COL_HEIGHT = 70;
  
  const Option3 = () => {
    const theme = useMantineTheme();
  
    return (
      <Container my="md">
        
        <Skeleton height={70} mt={15} mb={10} radius="md" animate={false} />
  
        <Skeleton height={70} mt={15} radius="md" animate={false} />
      </Container>
    );
  };
  
  export default Option3;
  