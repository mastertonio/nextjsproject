import { Card, Image, Text, Badge, Button, Group, Divider, Grid, Slider } from '@mantine/core';
import { FaGripLinesVertical } from 'react-icons/fa'

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

        <div className="flex flex-col mt-[20px]">
          <div className="clear-none mb-0">
            <p className="text-[13px] text-[#676a6c] float-left mt-0 mb-0">Conservative Factor</p>
            <p className="text-[13px] text-[#676a6c] float-right mt-0 mb-0">5%</p>
          </div>

          <Slider
            thumbSize={26}
            thumbChildren={<FaGripLinesVertical />}
            size={15}
            color="teal"
            radius="xs"
            className={`rounded-0 pt-[5px] pb-0 pl-0 pr-0 m-0`} defaultValue={30}
            styles={(theme) => ({
              track: {
                borderRadius: 0,
              },
              thumb: {
                height: 30,
                width: 30,
                borderColor: '#D9D9D9',
                backgroundColor: theme.white,
                borderWidth: 1,
                boxShadow: theme.shadows.sm,
                borderRadius: 3,
                color: '#E8E7E6'
              },
            })}
          />
        </div>
        {/* <Slider
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
        /> */}
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
          thumbSize={26}
          thumbChildren={<FaGripLinesVertical />}
          size={15}
          color="teal"
          radius="xs"
          className={`rounded-0 pt-[5px] pb-0 pl-0 pr-0 m-0`} defaultValue={30}
          styles={(theme) => ({
            track: {
              borderRadius: 0,
            },
            thumb: {
              height: 30,
              width: 30,
              borderColor: '#D9D9D9',
              backgroundColor: theme.white,
              borderWidth: 1,
              boxShadow: theme.shadows.sm,
              borderRadius: 3,
              color: '#E8E7E6'
            },
          })}
        />
        {/* <Slider
          color="teal"
          size="xl"
          radius="md"
          mb={5}
          defaultValue={30}
        /> */}
      </Card>
    </div>

  );
}

export default FloatingCard