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

const SelectFormat: React.FC<iFormSelectProps> = ({ data, values }, props) => {
    // const [choiceValue, setChoiceValue] = useState<string | null>(null);
    const formatChoice = useNewStore((state) => state.formatChoice)
    const setFormatValue = useNewStore((state) => state.setFormatValue)
    console.log('values choice', props)
    return (
        <div className="ml-auto">
            <Select
                placeholder="Choose"
                data={data}
                {...values}
                onChange={setFormatValue}
                value={formatChoice}
            />
        </div>
    )
}

export default SelectFormat