import { Box, Container, Text } from "@mantine/core";

type iSectionDescriptionProps = {
    name: string
}

const SectionDescription: React.FC<iSectionDescriptionProps> = ({ name }) => {
  return (
    <Container style={{ margin: 40, padding: 0 }}>
      <Text size="md" mb={20}>
        Studies show that 40 - 60% of all opportunities will end in a no
        decision. This happens so often because prospects have a difficult time
        quantifying your benefits / value.. Companies will make a purchasing
        decision for two main reasons:{" "}
      </Text>
      <span>1 - You&apos;re going to make them money</span>
      <p>2 - You&apos;re going to save them money </p>
      <Text>
        {" "}
        Yet the majority of salespeople do not have the tools to engage in these
        types of financial discussions. Therefore they are only left to sell
        features and functionality.
      </Text>
    </Container>
  );
};

export default SectionDescription;
