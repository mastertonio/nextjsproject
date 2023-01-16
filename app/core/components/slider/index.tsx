import { useState } from 'react';
import { Slider } from '@mantine/core';
import { FaGripLinesVertical } from 'react-icons/fa'

type iSliderProps = {
  progress: number
  addLabel: boolean
}

const RoiSlider: React.FC<iSliderProps> = ({ progress, addLabel }) => {
  const [value, setValue] = useState();

  return (
    <div className="flex flex-col">
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
        className={`rounded-0 pt-[5px] pb-0 pl-0 pr-0 m-0`} defaultValue={progress}
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
  );
}

export default RoiSlider