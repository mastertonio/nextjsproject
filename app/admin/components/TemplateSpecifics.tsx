import React from 'react'
import { Card, Grid, Text, TextInput, Button } from '@mantine/core'
import { useForm } from "@mantine/form"
import { IconBookmark } from '@tabler/icons';

type iTemplateProps = {}

const TemplateSpecifics: React.FC<iTemplateProps> = () => {
    const form = useForm({
        initialValues: {
            templateName: "",
            returnPeriod: "",
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            console.log('Values: ', values)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <div className="w-full">
            <div className="bg-[#ffffff] shadow p-[10px]">
                <h1 className="text-[28px] text-[#676a6c] font-bold flex flex-row items-center ml-[20px]">
                    <IconBookmark size={30} stroke={3} />
                    <span>Template Specifics</span>
                </h1>
            </div>

            <form onSubmit={form.onSubmit(handleSubmit)} className="pl-[1rem] pr-[1rem] sm:pl-[2rem] sm:pr-[2rem]">
                <Card className="mt-[15px]" shadow="sm" radius="md" withBorder>
                    <Grid className="p-[10px]">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Template Name: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[50%] ml-auto"
                            {...form.getInputProps("templateName")}
                        />
                    </Grid>
                    <Grid className="p-[10px] mt-[20px] sm:mt-0">
                        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Return Period: </Text>
                        <TextInput
                            required
                            className="w-[100%] sm:w-[50%] ml-auto"
                            {...form.getInputProps("returnPeriod")}
                        />
                    </Grid>

                    <Grid justify="flex-end" className="mt-[20px] mb-[20px] flex flex-col sm:flex-row m-0 sm:m-[-8px] pt-0 sm:pt-[20px]">
                        <Button
                            type="button"
                            radius="sm"
                            size="sm"
                            color="red"
                            className="mr-0 sm:mr-[10px] mb-[10px]"
                        >
                            Delete Template
                        </Button>
                        <Button
                            type="submit"
                            radius="sm"
                            size="sm"
                            color="teal"
                            className="mr-0 sm:mr-[10px]"
                        >
                            Update Template
                        </Button>

                    </Grid>
                </Card>
            </form>
        </div>
    )
}

export default TemplateSpecifics