import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

const FloatingCard: React.FC = () => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section p={10} >
        <Text>Improve Win Rate</Text>
      </Card.Section>

      <Text size="sm" color="dimmed">
        This will be the summary floater which will float only on its corresponding section
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Slider or any content here
      </Button>
    </Card>
  );
}

export default FloatingCard