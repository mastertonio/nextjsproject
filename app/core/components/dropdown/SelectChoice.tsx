import React from 'react'
import { Select } from "@mantine/core"
import { useNewStore } from '@app/store/builder/builderState'

type iFormSelectProps = {
    data: {
        value: string;
        label: string;
    }[],
    values: any;
}

const SelectChoice: React.FC<iFormSelectProps> = ({ data, values }) => {
    // const [choiceValue, setChoiceValue] = useState<string | null>(null);
    const choiceValue = useNewStore((state) => state.choiceValue)
    const setChoiceValue = useNewStore((state) => state.setChoiceValue)
    console.log('values', choiceValue)
    return (
        <div className="ml-auto">
            <Select
                placeholder="Choose"
                data={data}
                {...values}
                value={choiceValue}
                onChange={setChoiceValue}
            // value={valueData}
            // onChange={handleChange}
            />
        </div>
    )
}

export default SelectChoice