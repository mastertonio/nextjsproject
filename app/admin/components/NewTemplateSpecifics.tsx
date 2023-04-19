import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useQuery } from "react-query";
import { Card, Grid, Text, TextInput, Button } from '@mantine/core'
import { useForm } from "@mantine/form"
import { MdAddBox, MdModeEdit, MdClose } from 'react-icons/md'
import { FcComboChart } from 'react-icons/fc'
import AddSectionModal from './SectionModals/AddSectionModal';
import { useCardStore } from '@app/store/builder/builderState';

type iTemplateProps = {}

const NewTemplateSpecifics: React.FC<any> = ({ data, user }) => {
    const cards = useCardStore((state) => state.cards);
    const removeCard = useCardStore((state) => state.removeCard);
    const [opened, setOpened] = useState(false);
    const [update, setUpdate] = useState(false);
    const form = useForm({
        initialValues: {
            templateName: "",
            returnPeriod: "",
        }
    });

    console.log("data specific", data)

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
                <h1 className="text-[20px] sm:text-[28px] text-slate-800 font-bold flex flex-row items-center ml-[20px]">
                    <FcComboChart className="text-blue-600 mr-[10px] text-[40px] sm:text-[30px]" />
                    <span>ROI Dashboard | 2 Year Projection</span>
                </h1>
            </div>

            <div className="pl-[1rem] pr-[1rem] sm:pl-[2rem] sm:pr-[2rem] mt-[40px]">
                <Card className="mt-[15px]" shadow="sm" radius="sm" withBorder>
                    <Text className="text-[16px] text-slate-800 font-semibold w-[100%] mb-[10px]">Select a section below to review your ROI</Text>
                    <Text className="text-[14px] text-[#676a6c] font-light w-[100%]">To calculate return on investment, begin with the first section below. The information entered therein will automatically populate corresponding fields in the other sections. You will be able to move from section to section add and/or adjust values to best reflect your organization and process. To return to this screen, click the ROI Dashboard button to the left.</Text>
                </Card>

                <div className="flex flex-col sm:grid grid-cols-3 gap-4 mt-[20px]">
                    {data?.sections.map((section: any) => {
                        console.log('section tool', section)
                        // return (
                        //     <>
                        //         {section.grayContent.dataType === 'sliders' ? section.grayContent.elements.map((item: any, indexItem: any) => {
                        //             console.log('section card', item)
                                    return (
                                        <Card key={section._id} className="mt-[15px] p-[40px] cursor-pointer !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" shadow="sm" radius="sm" withBorder>
                                            <div className="flex flex-row items-center justify-between">
                                                <Text className="text-[20px] text-blue-600 font-semibold">
                                                    {section.sectionTitle}
                                                </Text>
                                                <div>
                                                    <MdModeEdit className="text-blue-600 text-[25px] mr-[10px] cursor-pointer" />
                                                    <MdClose className="text-red-600 text-[25px] cursor-pointer" />
                                                </div>
                                            </div>
                                        </Card>
                                    )
                        //         }) : null}
                        //     </>
                        // )
                    })}
                    {/* {cards.map((card, index) => (
                        <Card key={index} className="mt-[15px] p-[40px] cursor-pointer !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" shadow="sm" radius="sm" withBorder>
                            <div className="flex flex-row items-center justify-between">
                                <Text className="text-[20px] text-blue-600 font-semibold">{card.sectionName}</Text>
                                <div>
                                    <MdModeEdit className="text-blue-600 text-[25px] mr-[10px] cursor-pointer" />
                                    <MdClose className="text-red-600 text-[25px] cursor-pointer" onClick={() => removeCard(card.id)} />
                                </div>
                            </div>
                        </Card>
                    ))} */}

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
            <AddSectionModal showModal={opened} setOpened={setUpdate} open={update} user={user} data={data} />
        </div>
    )
}

export default NewTemplateSpecifics