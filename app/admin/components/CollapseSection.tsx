import React from 'react'
import { Card, Grid, Text, TextInput, Button } from '@mantine/core'
import { useForm } from "@mantine/form"
import RichTextSection from '@app/core/components/richtext/RichTextSection'
import { IBuilderSubState, useBuilderStore } from '@app/store/builder/builderState'

type iCollapseProps = {
    item: IBuilderSubState
}

const CollapseSection: React.FC<iCollapseProps> = ({ item }) => {
    const updateData = useBuilderStore((state) => state.update)

    const form = useForm({
        initialValues: {
            sectionName: item.sectionName,
            sectionVideo: item.sectionVideo,
            sectionFormula: item.sectionFormula,
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            console.log('triggered')
            updateData({ ...item, sectionName: values.sectionName, sectionFormula: values.sectionFormula, sectionVideo: values.sectionVideo})
            console.log('Values: ', values)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Card className="mt-[20px] mb-[20px]" shadow="sm" radius="md" withBorder>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid className="p-[10px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Section Name: </Text>
                    <TextInput
                        required
                        className="w-[50%] ml-auto"
                        {...form.getInputProps("sectionName")}
                    />
                </Grid>
                {/* Rich editor */}
                <Grid className="p-[10px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Section Writeup: </Text>
                    <div className="w-[50%] ml-auto">
                        <RichTextSection />
                    </div>
                </Grid>

                <Grid className="p-[10px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Section Video: </Text>
                    <TextInput
                        className="w-[50%] ml-auto"
                        {...form.getInputProps("sectionVideo")}
                    />
                </Grid>

                <Grid className="p-[10px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Section Formula: </Text>
                    <TextInput
                        className="w-[50%] ml-auto"
                        {...form.getInputProps("sectionFormula")}
                    />
                </Grid>

                <Grid justify="flex-end" className="mt-[20px] mb-[20px]">
                    <Button
                        radius="sm"
                        size="sm"
                        color="red"
                        className="mr-[10px]"
                    >
                        Delete Section
                    </Button>
                    <Button
                        type="submit"
                        radius="sm"
                        size="sm"
                        className="mr-[10px]"
                    >
                        Update Section
                    </Button>
                </Grid>
            </form>
        </Card>
    )
}

export default CollapseSection