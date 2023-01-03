import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { StringDecoder } from 'string_decoder';
import RoiSlider from '../slider';

export type iSliderCardProps = {
    label: string
    money: number
    progress: number
}

const SliderCard: React.FC<iSliderCardProps> = ({ label, money, progress}) => {
  return (
    <Card style={{height: 200, padding: 30,  }} shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Text style={{ fontSize: 25 }} color="blue" weight={700}>{label}</Text>
      </Card.Section>
      <Text style={{ fontSize: 30 }} weight={700} color="teal" align='end'>
        ${money}
      </Text>
      {label !== "Summary" ? (<RoiSlider addLabel={label == "Summary" ? false : true} progress={progress} />) : ""}
      
    </Card>
  );
}

export default SliderCard