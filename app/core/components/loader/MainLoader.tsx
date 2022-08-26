import { Center, Container, Loader } from "@mantine/core";

const MainLoader: React.FC = () => {
  return (
    <Container size={200} px={0}>
      <Center
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Loader color="teal" size="xl" variant="dots" />
      </Center>
    </Container>
  );
};

export default MainLoader;
