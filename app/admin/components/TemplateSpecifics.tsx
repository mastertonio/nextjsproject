import React from 'react'
import { Card, Grid, Text, TextInput, Button } from '@mantine/core'

type iTemplateProps = {}

const TemplateSpecifics: React.FC<iTemplateProps> = () => {
    return (
        <div className="w-full">
            <div className="bg-[#ffffff] rounded-[5px] shadow p-[10px]">
                <h1 className="text-[30px] text-[#676a6c] font-normal">Template Specifics</h1>
            </div>

            <Card className="mt-[20px]" shadow="sm" radius="md" withBorder>
                <Grid className="p-[10px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Template Name: </Text>
                    <TextInput
                        required
                        className="w-[50%] ml-auto"
                    />
                </Grid>
                <Grid className="p-[10px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Return Period: </Text>
                    <TextInput
                        required
                        className="w-[50%] ml-auto"
                    />
                </Grid>

                <Grid justify="flex-end" className="mt-[20px] mb-[20px]">
                    <Button
                        radius="sm"
                        size="sm"
                        color="red"
                        className="mr-[10px]"
                    >
                        Delete Template
                    </Button>
                    <Button
                        type="submit"
                        radius="sm"
                        size="sm"
                        className="mr-[10px]"
                    >
                        Update Template
                    </Button>

                </Grid>
            </Card>
        </div>
    )
}

export default TemplateSpecifics