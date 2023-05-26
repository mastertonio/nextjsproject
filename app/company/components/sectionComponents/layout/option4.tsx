import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";

const PRIMARY_COL_HEIGHT = 70;

const Option4 = () => {
  const theme = useMantineTheme();

  return (
    <Container my="md">
      <Skeleton height={40} mt={25} mb={5} radius="md" animate={false} />

      <Skeleton height={40} mt={5} radius="md" animate={false} />
      <Skeleton height={40} mt={5} radius="md" animate={false} />
    </Container>
  );
};

export default Option4;
