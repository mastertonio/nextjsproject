import React from 'react'
import { Select } from "@mantine/core"

type iFormSelectProps = {
    data: {
        value: string;
        label: string;
    }[],
    values: any
}

const FormSelect: React.FC<iFormSelectProps> = ({ data, values }) => {
    return (
        <div className="ml-auto">
            <Select
                placeholder="Choose"
                data={data}
                {...values}
            />
        </div>
    )
}

export default FormSelect