import { useDisclosure } from "@mantine/hooks";
import { Button, CopyButton, HoverCard, Text } from "@mantine/core";

type iPophoverTypes = {
  title: string;
};

const Pophover: React.FC<iPophoverTypes> = ({ title }) => {
  return (
    <HoverCard width={280} shadow="md">
      <HoverCard.Target>
        <Text>{title}</Text>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text
          size="sm"
          variant="link"
          component="a"
          href="http://localhost:3000/templates/1"
        >
          Sample Copy, will do this next sprint
        </Text>
        <CopyButton value={title}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy}>
              {copied ? "Copied url" : "Copy url"}
            </Button>
          )}
        </CopyButton>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default Pophover;
