import React from 'react'
import { Modal, Grid, Card, Divider, NumberInput, Button } from '@mantine/core'

interface ModalProps {
    showModal: boolean;
    setClose: () => void;
}

const CalculationModal: React.FC<ModalProps> = ({ showModal, setClose }) => {
    return (
        <Modal opened={showModal} onClose={setClose} size="920px" title="Deals needed per rep to hit the sales goal ( deals / qtr)" className="section-wrapper" padding={0}>
            <div className="bg-[#ECEFF1] p-[10px] sm:p-[40px] mt-0">
                <Grid className="w-full m-0 pt-[20px] sm:pt-0">
                    <Card className="flex justify-between items-center w-full" p="sm">
                        <p className="text-[14px] text-slate-900 font-semibold mt-0 mb-0">What is the expected combined annual</p>
                        <p className="text-[14px] text-slate-900 font-semibold mt-0 mb-0">$0</p>
                    </Card>
                    <Card className="flex justify-between items-center w-full mt-[5px]" p="sm">
                        <p className="text-[14px] text-slate-900 font-semibold mt-0 mb-0">Average deal value</p>
                        <p className="text-[14px] text-slate-900 font-semibold mt-0 mb-0">$0</p>
                    </Card>
                </Grid>

                <div className="mt-[40px] pl-[10px] pr-[10px] sm:pl-0 sm:pr-0">
                    <p>Equation</p>
                    <p>( What is the expected combined annual sales for those reps? / Average deal value )</p>
                </div>

                <div className="flex justify-between items-center w-full mt-[40px]">
                    <p className="text-[14px] text-slate-900 font-semibold mt-0 mb-0 pl-[10px] sm:pl-0">Value</p>
                    <p className="text-[18px] sm:text-[14px] text-slate-900 font-semibold mt-0 mb-0 pr-[10px] sm:pr-0">0</p>
                </div>

                <Divider my="sm" className="mt-[40px]" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mt-[40px]">
                    <p className="text-[14px] text-slate-900 font-semibold mt-0 mb-0">Change value to:</p>
                    <div className="flex mt-[10px] sm:mt-0">
                        <NumberInput
                            className="ml-auto w-[175px] md:w-[300px] 2xl:w-[400px] test"
                            hideControls
                        />
                        <Button
                            type="submit"
                            radius="xs"
                            size="sm"
                        >
                            Change Value
                        </Button>
                    </div>
                </div>
                <Divider my="sm" className="mt-[40px]" />
                <Grid justify="flex-end" className="sm:mb-0 flex flex-col sm:flex-row m-0 sm:m-[-10px] pt-0 sm:pt-[10px] pb-0 sm:pb-[10px] mt-[40px]">
                    <Button
                        type="submit"
                        radius="sm"
                        size="sm"
                        color="teal"
                        className="mr-0 sm:mr-[10px] mb-[10px] sm:mb-0"
                    >
                        Reset to Original Equation
                    </Button>
                    <Button
                        radius="sm"
                        size="sm"
                        color="red"
                        className="mr-0 sm:mr-[0px] mb-[20px] sm:mb-0"
                        onClick={setClose}
                    >
                        Close
                    </Button>
                </Grid>
            </div>
        </Modal>
    )
}

export default CalculationModal