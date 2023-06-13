import { useState } from 'react';
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
  const [progressValue, setProgressValue] = useState(progress)

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
    <Card className="h-[210px] mb-4 rounded-none !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card ml-[5px] mr-[5px]" shadow="sm" p="md" withBorder>
      <Card.Section withBorder className="h-[42px] mb-0 pt-[10px] pl-[15px] pr-[15px] pb-[7px] "
      >
        <Group position="apart">
          <Text className="text-[18px] sm:text-[18px] text-[#428bca] hover:text-[#2a6496] cursor-pointer" weight={600}>{label}</Text>
          {/* <Badge variant="filled" className="rounded-[0.25em] text-[10px] leading-[15px] pt-[3px] pb-[3px] pl-[8px] pr-[8px]">2 Year</Badge> */}
        </Group>
      </Card.Section>
      <div className="pt-[15px] pb-[15px] pl-[10px] pr-[10px] h-[auto]">
        <Text className="text-[30px] text-[#216C2A] mt-0 mb-[5px]" weight={600} align='end'>
          ${money}
        </Text>
        <Divider className="mt-[10px] mb-[15px]" />
        <div>
          {label !== "Summary" ? (<RoiSlider addLabel={label == "Summary" ? false : true} progress={progressValue} setProgressValue={setProgressValue} />) : (<Summary />)}
        </div>
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