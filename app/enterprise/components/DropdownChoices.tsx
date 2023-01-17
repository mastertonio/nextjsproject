import { iVariableProp } from '@app/enterprise/components/input';
import { Card, Image, Text, Badge, Button, Group, Divider, Grid, Slider, Checkbox, Select } from '@mantine/core';


export type iOtherTypeProps = {
    enabled: boolean
    name: string
    elements: iVariableProp[]
}

export type iChoicesTypeProps = {
    id: string
    name: string
}

type iCheckboxChoices = {
    other: iOtherTypeProps
    choices: iChoicesTypeProps[]
}

const DropdownChoices: React.FC<Partial<iCheckboxChoices>> = ({ choices, other }) => {
    const cs = choices ? choices.map(choice => ({value: choice.id, label: choice.name})) : []

    return (
        <div className="flex flex-col ml-auto lg:w-[400px] w-96">
            {choices ?  (
            <Select
                data={cs}
                placeholder="Pick one"
            />) : ""}
        </div>
    );
}

export default DropdownChoices