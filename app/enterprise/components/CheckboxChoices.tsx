import { iVariableProp } from '@app/enterprise/components/input';
import { Card, Image, Text, Badge, Button, Group, Divider, Grid, Slider, Checkbox } from '@mantine/core';


export type iOtherTypeProps = {
    enabled: boolean
    name: string
    elements: iVariableProp[]
}

export type iChoicesTypeProps = {
    id: string
    name: string
}

interface iCheckboxChoices {
    other: iOtherTypeProps
    choices: iChoicesTypeProps[]
    hide: () => void
}

const CheckboxChoices: React.FC<Partial<iCheckboxChoices>> = ({ choices, other, hide }) => {

    return (
        <div className="flex flex-col ml-auto lg:w-[400px] w-96">
            {choices ? choices?.map(choice => (<Checkbox
                label={choice.name}
                color="dark"
                radius="xl"
                key={choice.id}
            />)) : ""}
            {other ? 
            <>
            <Checkbox
                label={other?.name}
                color="dark"
                radius="xl"
                onClick={()=> hide?.()}
            />
            </> : ""}
        </div>
    );
}

export default CheckboxChoices