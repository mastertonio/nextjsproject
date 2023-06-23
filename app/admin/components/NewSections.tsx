import React, { useEffect, useState } from 'react'
import { Button, Grid, Card, Text } from '@mantine/core';
import { DragNDrop } from '@app/admin/components/dragdrop'
import { FcTodoList } from 'react-icons/fc'
import { MdModeEdit, MdClose, MdAddBox } from 'react-icons/md'
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
import DeleteVideoModal from './SectionModals/DeleteVideoModal';
import EditVideoModal from './SectionModals/EditVideoModal';
import { UserDataProp } from '@app/context/user.context';
import { SectionStateAdminTool, useAdminSectionStore } from '@app/store/adminToolSectionStore';
import NewAddSectionModal from './NewAddSectionModal';
import he from 'he';
import ReactPlayer from 'react-player';

type iSectionProps = {
    data: any,
    user: UserDataProp
    choices: []
    fullData: []
    allChoices: []
    AddAllchoices: []
}

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

const NewSections: React.FC<iSectionProps> = ({ data, user, choices, fullData, allChoices, AddAllchoices }) => {
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
    const [updateWriteUp, setUpdateWriteUp] = useState<any>({});
    const [openVideo, setOpenVideo] = useState(false);
    const [updateVideo, setUpdateVideo] = useState<any>({})
    const [openQuestion, setOpenQuestion] = useState(false);
    const [updateQuestion, setUpdateQuestion] = useState(false);
    const [deleteVideo, setDeleteVideo] = useState<any>(false);
    const [editVideo, setEditVideo] = useState<any>(false);
    const [sectData, setSectData] = useState<iSectionData[]>([])
    const [entry, setEntry] = useState(false)
    const [updateEntry, setUpdateEntry] = useState<any>({})
    const [getID, setGetID] = useState('');
    // const [newChoice, setNewChoice] = useState(false)
    // const [updateChoice, setUpdateChoice] = useState(false)
    const sectionData = useSectionsStore((state) => state.section)
    const addEmptySection = useBuilderStore((state) => state.addSection)
    // const adminData = useAdminSectionStore((state) => state.sections)

    const handleOpenWriteModal = (id: any) => {
        setUpdateWriteUp((prev: any) => ({ ...prev, [id]: true }))
    }

    const handleCloseWriteModal = (id: any) => {
        setUpdateWriteUp((prev: any) => ({ ...prev, [id]: false }))
    }

    const handleOpenVideoModal = (id: any) => {
        setUpdateVideo((prev: any) => ({ ...prev, [id]: true }))
    }

    const handleOpenDeleteVideo = (id: any) => {
        setDeleteVideo((prev: any) => ({ ...prev, [id]: true }))
    }

    const handleCloseDeleteVideo = (id: any) => {
        setDeleteVideo((prev: any) => ({ ...prev, [id]: false }))
    }

    const handleOpenEditVideo = (id: any) => {
        setEditVideo((prev: any) => ({ ...prev, [id]: true }))
    }

    const handleCloseEditVideo = (id: any) => {
        setEditVideo((prev: any) => ({ ...prev, [id]: false }))
    }

    const handleCloseVideoModal = (id: any) => {
        setUpdateVideo((prev: any) => ({ ...prev, [id]: false }))
    }

    const handleOpenEntryModal = (id: any) => {
        setUpdateEntry((prev: any) => ({ ...prev, [id]: true }))
    }

    const handleCloseEntryModal = (id: any) => {
        setUpdateEntry((prev: any) => ({ ...prev, [id]: false }))
    }
    const sectionsAll = data?.sections.map((section: SectionStateAdminTool, index: any) => {
        console.log('section', section)
        return (
            <div className="w-full mt-[40px]" key={section._id}>
                <div className="bg-[#ffffff] shadow p-[10px]">
                    <h1 className="text-[20px] sm:text-[28px] text-slate-800 font-bold flex flex-row items-center ml-[20px]">
                        <FcTodoList className="text-blue-600 mr-[10px] text-[30px] sm:text-[30px]" />
                        <span>{section.sectionTitle}</span>
                    </h1>
                </div>

                <div className="pl-[1rem] pr-[1rem] sm:pl-[2rem] sm:pr-[2rem] mt-[40px] mb-[40px]">
                    <Card className="mt-[15px] mb-[20px] cursor-pointer !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" radius="sm" withBorder>
                        <Card.Section withBorder inheritPadding py="xs">
                            <div className="flex flex-row items-center justify-between">
                                <Text dangerouslySetInnerHTML={{ __html: section.headers?.title.description ? he.decode(section?.headers?.title.description) : "Please add your own section writeup input here" }} className="text-[16px]"></Text>
                                <div>
                                    <SectionWriteUpModal defData={section.headers?.title.description ? he.decode(section?.headers?.title.description) : ""} id={section._id} adminId={data.id} cardID={index} user={user} />
                                    <MdClose className="text-red-600 text-[20px] cursor-pointer" />
                                </div>
                            </div>
                        </Card.Section>
                        <div className="mt-[20px] mb-[40px]">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-auto w-full sm:w-[50%]">
                                    <Text></Text>
                                </div>
                                <div className="flex-auto w-full sm:w-[50%] mt-[20px] sm:mt-0">
                                    <div className="flex flex-row items-center justify-end content-center">
                                        <Text dangerouslySetInnerHTML={{ __html: section.headers?.title?.content?.elements[0]?.dataType === 'media' ? he.decode(section.headers?.title?.content?.elements[0]?.link) : 'Add Video link here:' }} className="text-[14px] text-slate-600 font-semibold mr-[30px]"></Text>
                                        <div>
                                            {section.headers?.title?.content?.elements[0]?.link ? (
                                                <MdModeEdit className="text-teal-600 text-[16px] mr-[10px] cursor-pointer" onClick={() => handleOpenEditVideo(index)} />
                                            ) : (
                                                <MdAddBox className="text-blue-600 text-[16px] mr-[10px] cursor-pointer" onClick={() => handleOpenVideoModal(index)} />
                                            )}
                                            <MdClose className="text-red-600 text-[16px] cursor-pointer" onClick={() => handleOpenDeleteVideo(index)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="mt-[15px] mb-[20px] !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" radius="sm" withBorder>
                        <div className="mt-[20px]">
                            <DragNDrop user={user} id={section._id} adminId={data.id} data={section.grayContent?.elements} type={section.grayContent?.dataType} choices={choices} fullData={fullData} allChoices={allChoices} />
                            {/* <DragNDrop data={[]} type="collapse" /> */}
                        </div>

                        <Grid justify="flex-end" className="mt-[20px] mb-[20px] flex flex-col sm:flex-row m-0 sm:m-[unset] pt-0 sm:pt-[20px] entry-modal">
                            {/* {section.grayContent?.elements.map((elem)=> console.log(elem)) : ""} */}
                            <NewAddSectionModal id={section._id} user={user} adminId={data.id} sectionData={section} setOpenChoice={setUpdateChoice} setSectionData={setSectData} choices={AddAllchoices} fullData={fullData} />
                            {/* <ModalUpdateEntry setClose={handleCloseEntryModal} id={section._id} adminId={data.id} showModal={entry} sectionData={section} setSectionData={setSectData} setOpened={setUpdateEntry} open={updateEntry} setOpenChoice={setUpdateChoice} user={user} /> */}
                        </Grid>
                    </Card>
                </div>


                <SectionVideoModal id={section._id} adminId={data.id} showModal={openVideo} setOpened={() => handleOpenVideoModal(index)} open={updateVideo[index]} cardID={index} user={user} setClose={() => { handleCloseVideoModal(index) }} />
                <DeleteVideoModal id={section._id} adminId={data.id} user={user} setOpened={() => handleOpenDeleteVideo(index)} setClose={() => { handleCloseDeleteVideo(index) }} cardID={index} open={deleteVideo[index]} contentElem={section?.headers?.title?.content?.elements[0]?._id} />
                <EditVideoModal id={section._id} adminId={data.id} user={user} setOpened={() => handleOpenEditVideo(index)} setClose={() => { handleCloseEditVideo(index) }} cardID={index} open={editVideo[index]} contentElem={section?.headers?.title?.content?.elements[0]?._id} />
                <ModalAddQuestion showModal={openQuestion} setOpened={setUpdateQuestion} open={updateQuestion} setUpdateEntry={setUpdateEntry} />
                <AddNewChoiceModal showModal={newChoice} setOpened={setUpdateChoice} open={updateChoice} />
            </div>
        )
    }
    )

    return (
        <div>
            {sectionsAll}
        </div>
    )
}

export default NewSections