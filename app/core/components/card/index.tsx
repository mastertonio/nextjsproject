import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { StringDecoder } from 'string_decoder';
import RoiSlider from '../slider';

export type iSliderCardProps = {
  label: string
  money: number
  progress: number
}

const SliderCard: React.FC<iSliderCardProps> = ({ label, money, progress }) => {
  return (
    <Card className="h-[200px] p-[30px] mb-4" shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Text className="text-[24px] sm:text-[2em]" color="blue" weight={700}>{label}</Text>
      </Card.Section>
      <Text className="text-[30px]" weight={700} color="teal" align='end'>
        ${money}
      </Text>
      {label !== "Summary" ? (<RoiSlider addLabel={label == "Summary" ? false : true} progress={progress} />) : ""}

    </Card>
  );
}

export default SliderCard