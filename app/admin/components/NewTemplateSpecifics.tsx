import React, { useState } from 'react'
import { Card, Grid, Text, TextInput, Button } from '@mantine/core'
import { useForm } from "@mantine/form"
import { MdAddBox, MdModeEdit, MdClose } from 'react-icons/md'
import { FcComboChart } from 'react-icons/fc'
import AddSectionModal from './SectionModals/AddSectionModal';

type iTemplateProps = {}

const NewTemplateSpecifics: React.FC<iTemplateProps> = () => {
    const [opened, setOpened] = useState(false);
    const [update, setUpdate] = useState(false);
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
                <h1 className="text-[28px] text-slate-800 font-bold flex flex-row items-center ml-[20px]">
                    <FcComboChart size={30} className="text-blue-600 mr-[10px]" />
                    <span>ROI Dashboard | 2 Year Projection</span>
                </h1>
            </div>

            <div className="pl-[1rem] pr-[1rem] sm:pl-[2rem] sm:pr-[2rem] mt-[40px]">
                <Card className="mt-[15px]" shadow="sm" radius="sm" withBorder>
                    <Text className="text-[16px] text-slate-800 font-semibold w-[100%] mb-[10px]">Select a section below to review your ROI</Text>
                    <Text className="text-[14px] text-[#676a6c] font-light w-[100%]">To calculate return on investment, begin with the first section below. The information entered therein will automatically populate corresponding fields in the other sections. You will be able to move from section to section add and/or adjust values to best reflect your organization and process. To return to this screen, click the ROI Dashboard button to the left.</Text>
                </Card>

                <div className="grid grid-cols-3 gap-4 mt-[20px]">
                    <Card className="mt-[15px] p-[40px] cursor-pointer !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" shadow="sm" radius="sm" withBorder>
                        <div className="flex flex-row items-center justify-between">
                            <Text className="text-[20px] text-blue-600 font-semibold">New Section Here</Text>
                            <div>
                                <MdModeEdit className="text-blue-600 text-[25px] mr-[10px]" />
                                <MdClose className="text-blue-600 text-[25px]" />
                            </div>
                        </div>
                    </Card>
                    <Card className="mt-[15px] p-[40px] cursor-pointer !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" shadow="sm" radius="sm" withBorder onClick={() => setUpdate(true)}>
                        <div className="flex flex-row items-center">
                            <MdAddBox className="text-blue-600 text-[30px] mr-[10px]" />
                            <Text className="text-[20px] text-blue-600 font-semibold">Add a New Section</Text>
                        </div>
                    </Card>
                </div>

                <div className="flex flex-row mt-[40px] w-full">
                    <Button
                        type="button"
                        radius="sm"
                        size="sm"
                        color="teal"
                        className='w-full'
                    >
                        Add New Testimonial
                    </Button>
                </div>

            </div>
            <AddSectionModal showModal={opened} setOpened={setUpdate} open={update} />
        </div>
    )
}

export default NewTemplateSpecifics