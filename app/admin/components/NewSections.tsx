import React, { useEffect, useState } from 'react'
import { Button, Grid, Card, Text } from '@mantine/core';
import { DragNDrop } from '@app/core/components/dragdrop'
import { FcTodoList } from 'react-icons/fc'
import { MdModeEdit, MdClose } from 'react-icons/md'
import ModalUpdateEntry from './ModalUpdateEntry';
// import ModalAddEntry from './ModalAddEntry';
import { useModalEntryStore, useModalAddEntryStore, } from '@app/store/builderStore';
import { useNewStore, useSectionWriteupStore, useQuestionPropsStore } from '@app/store/builder/builderState';
import { customConfig, IBuilderSubState, useBuilderStore, useSectionsStore, useCardStore } from '@app/store/builder/builderState';
// import SectionDnd from './SectionDnd';
// import { uniqueNamesGenerator } from 'unique-names-generator';
// import SectionItems from './SectionItems';
import SectionWriteUpModal from './SectionModals/SectionWriteUpModal';
import SectionVideoModal from './SectionModals/SectionVideoModal';
import ModalAddQuestion from './SectionModals/ModalAddQuestion';
import AddNewChoiceModal from './SectionModals/AddNewChoiceModal';

type iSectionProps = {}

export type iSectionData = {
    id: number
    title: string
    type: string
    format: string
    tooltip: string
    appendedText: string
    formula: string
    address: string
}

const NewSections: React.FC<iSectionProps> = () => {
    const questions = useQuestionPropsStore((state) => state.questions)
    const writeup = useSectionWriteupStore((state) => state.sectionWriteUp)
    const cardSection = useCardStore((state) => state.cards)
    const newChoice = useNewStore((state) => state.newChoice)
    const updateChoice = useNewStore((state) => state.updateChoice)
    const setUpdateChoice = useNewStore((state) => state.setUpdateChoice)
    const showModalEntry = useModalEntryStore((state) => state.value);
    const showAddModalEntry = useModalAddEntryStore((state) => state.value);
    const showAddEntry = useModalAddEntryStore((state) => state.show);
    const contentData = useBuilderStore((state) => state.content)
    const [openedWriteUp, setOpenedWriteUp] = useState(false);
    const [updateWriteUp, setUpdateWriteUp] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [updateVideo, setUpdateVideo] = useState(false)
    const [openQuestion, setOpenQuestion] = useState(false);
    const [updateQuestion, setUpdateQuestion] = useState(false);
    const [sectData, setSectData] = useState<iSectionData[]>([])
    const [entry, setEntry] = useState(false)
    const [updateEntry, setUpdateEntry] = useState(false)
    const [getID, setGetID] = useState('');
    // const [newChoice, setNewChoice] = useState(false)
    // const [updateChoice, setUpdateChoice] = useState(false)
    const sectionData = useSectionsStore((state) => state.section)
    const addEmptySection = useBuilderStore((state) => state.addSection)
    console.log('question section', sectData[0])
    console.log('questions', questions)

    return (
        <>
            {cardSection.map((card) => {
                console.log('card', typeof card.id)
                return (
                    <div className="w-full mt-[40px]" key={card.id}>
                        <div className="bg-[#ffffff] shadow p-[10px]">
                            <h1 className="text-[20px] sm:text-[28px] text-slate-800 font-bold flex flex-row items-center ml-[20px]">
                                <FcTodoList className="text-blue-600 mr-[10px] text-[30px] sm:text-[30px]" />
                                <span>{card.sectionName}</span>
                            </h1>
                        </div>

                        <div className="pl-[1rem] pr-[1rem] sm:pl-[2rem] sm:pr-[2rem] mt-[40px] mb-[40px]">
                            <Card className="mt-[15px] mb-[20px] cursor-pointer !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" radius="sm" withBorder>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <div className="flex flex-row items-center justify-between">
                                        <Text className="text-[16px] text-blue-600 font-semibold">{card.sectionName}</Text>
                                        <div>
                                            <MdModeEdit
                                                className="text-blue-600 text-[20px] mr-[10px] cursor-pointer"
                                                onClick={() => {
                                                    setUpdateWriteUp(true)
                                                    setGetID(card.id)
                                                }}
                                            />
                                            <MdClose className="text-red-600 text-[20px] cursor-pointer" />
                                        </div>
                                    </div>
                                </Card.Section>
                                <div className="mt-[20px] mb-[40px]">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-auto w-full sm:w-[50%]">
                                            <Text>{card.sectionWriteUp}</Text>
                                        </div>
                                        <div className="flex-auto w-full sm:w-[50%] mt-[20px] sm:mt-0">
                                            <div className="flex flex-row items-center justify-between">
                                                <Text className="text-[16px] text-slate-600 font-semibold">Section Video: <span className="text-teal-500">{card.sectionVideoLink}</span></Text>
                                                <div>
                                                    <MdModeEdit className="text-blue-600 text-[16px] mr-[10px] cursor-pointer" onClick={() => setUpdateVideo(true)} />
                                                    <MdClose className="text-red-600 text-[16px] cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card className="mt-[15px] mb-[20px] !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" radius="sm" withBorder>
                                <div className="mt-[20px]">
                                    <DragNDrop data={questions} type="collapse" />
                                    {/* <DragNDrop data={contentData} type="collapse" /> */}
                                </div>

                                <Grid justify="flex-end" className="mt-[20px] mb-[20px] flex flex-col sm:flex-row m-0 sm:m-[unset] pt-0 sm:pt-[20px]">
                                    <Button
                                        type="submit"
                                        radius="sm"
                                        size="sm"
                                        color="teal"
                                        className="mr-0 sm:mr-[10px]"
                                        // onClick={() => setUpdateQuestion(true)}
                                        onClick={() => setUpdateEntry(true)}
                                    // onClick={addEmptySection}
                                    >
                                        Add New Entry
                                    </Button>
                                </Grid>
                            </Card>
                        </div>

                        {/* {contentData.length > 0 ? contentData.map((content) => (<SectionItems key={content.id} content={content} />)
            ) : (<div className="pl-[2rem] pr-[2rem] mb-[40px]">No Sections Yet</div>)} */}

                        <SectionWriteUpModal showModal={openedWriteUp} setOpened={setUpdateWriteUp} open={updateWriteUp} cardID={getID} />
                        <SectionVideoModal showModal={openVideo} setOpened={setUpdateVideo} open={updateVideo} cardID={getID} />
                        <ModalAddQuestion showModal={openQuestion} setOpened={setUpdateQuestion} open={updateQuestion} setUpdateEntry={setUpdateEntry} />
                        <ModalUpdateEntry showModal={entry} sectionData={sectData} setSectionData={setSectData} setOpened={setUpdateEntry} open={updateEntry} setOpenChoice={setUpdateChoice} />
                        <AddNewChoiceModal showModal={newChoice} setOpened={setUpdateChoice} open={updateChoice} />
                    </div>
                )
            })}
        </>
    )
}

export default NewSections