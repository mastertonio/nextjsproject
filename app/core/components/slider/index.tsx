import { useState } from 'react';
import { Slider, RangeSlider } from '@mantine/core';

type iSliderProps = {
    progress: number
    addLabel: boolean
}

const RoiSlider: React.FC<iSliderProps> = ({ progress, addLabel }) => {
  const [value, setValue] = useState();

  return (
    <>
      <Slider color="teal" style={{ margin: 0, padding: 0}} defaultValue={progress}  />
    </>
  );
}

export default RoiSlider