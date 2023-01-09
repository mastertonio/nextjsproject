import { Card, Image, Text, Badge, Button, Group, Divider, Grid, Slider } from '@mantine/core';

const FloatingCard: React.FC = () => {
  return (
    <div className="w-full sticky top-[70px] rounded-[10px]">
      {/* w={'100%'} pos="sticky" top={70}  */}
      <Card mb={10} shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section pt={20} pl={20} >
          <Text fz={25} >Improve Win Rate</Text>
        </Card.Section>

        <Divider my="xs" size="xs" variant="solid" />

        <Grid p={10}>
          <Text size="sm" color="dimmed">
            Year 1:
          </Text>
          <Text ml={'auto'} size="sm" color="dimmed">
            $0
          </Text>
        </Grid>

        <Divider my="xs" size="xs" variant="solid" />

        <Grid p={10}>
          <Text size="sm" color="dimmed">
            Year 2:
          </Text>
          <Text ml={'auto'} size="sm" color="dimmed">
            $0
          </Text>
        </Grid>

        <Divider my="xs" size="xs" variant="solid" />

        <Grid p={10}>
          <Text size="sm" color="dimmed">
            Improve Win Rate Total:
          </Text>
          <Text ml={'auto'} size="sm" color="dimmed">
            $0
          </Text>
        </Grid>

        <Slider
          color="teal"
          size="xl"
          radius="md"
          defaultValue={70}
          mb={30}
          marks={[
            { value: 20, label: '20%' },
            { value: 50, label: '50%' },
            { value: 90, label: '90%' },
          ]}
        />
      </Card>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Grid p={10}>
          <Text size="sm" color="dimmed">
            Implementation Period:
          </Text>
          <Text ml={'auto'} size="sm" color="dimmed">
            n months
          </Text>
        </Grid>
        <Slider
          color="teal"
          size="xl"
          radius="md"
          mb={5}
          defaultValue={30}
        />
      </Card>
    </div>

  );
}

export default FloatingCard