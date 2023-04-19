import { Card, Image, Text, Badge, Button, Group, Divider } from '@mantine/core';
import { StringDecoder } from 'string_decoder';
import RoiSlider from '../slider';

export type iSliderCardProps = {
  label: string
  money: number
  progress: number
  isSectionEmpty: boolean
}

const SliderCard: React.FC<iSliderCardProps> = ({ label, money, progress }) => {

  const Summary = () => (
    <div className="flex flex-col">
      <div className="clear-none mb-0" >
        <p className="text-[14px] text-[#676a6c] float-left mt-0 mb-0">Total Hours Saved:</p>
        <p className="text-[14px] text-[#1c84c6] float-right mt-0 mb-0 font-semibold">0</p>
      </div >
      <div className="clear-none mb-0" >
        <p className="text-[14px] text-[#676a6c] float-left mt-0 mb-0">FTEs Saved:</p>
        <p className="text-[14px] text-[#1c84c6] float-right mt-0 mb-0 font-semibold">0</p>
      </div >
    </div>

  )

  return (
    <Card className="h-[240px] mb-4 !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" shadow="sm" p="lg" withBorder>
      <Card.Section withBorder className="h-[48px] mb-0 pt-[14px] pl-[15px] pr-[15px] pb-[6px] "
      >
        <Group position="apart">
          <Text className="text-[20px] sm:text-[18px] text-[#428bca]" weight={700}>{label}</Text>
          <Badge variant="filled" className="rounded-[0.25em] text-[10px] leading-[15px] pt-[3px] pb-[3px] pl-[8px] pr-[8px]">2 Year</Badge>
        </Group>
      </Card.Section>
      <Card.Section>

      </Card.Section>
      <Text className="text-[30px] text-[#216C2A] mt-[20px] mb-[20px]" weight={700} align='end'>
        ${money}
      </Text>
      <Divider />
      <div className="mt-[30px]">
        {label !== "Summary" ? (<RoiSlider addLabel={label == "Summary" ? false : true} progress={progress} />) : (<Summary />)}
      </div>

    </Card>
    // <Card className="h-[200px] p-[30px] mb-4" shadow="sm" p="lg" radius="md" withBorder>
    //   <Card.Section>
    //     <Text className="text-[24px] sm:text-[2em]" color="blue" weight={700}>{label}</Text>
    //   </Card.Section>
    //   <Text className="text-[30px]" weight={700} color="teal" align='end'>
    //     ${money}
    //   </Text>
    //   {label !== "Summary" ? (<RoiSlider addLabel={label == "Summary" ? false : true} progress={progress} />) : ""}
    // </Card>
  );
}

export default SliderCard