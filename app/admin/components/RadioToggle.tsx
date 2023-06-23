import React, { BaseSyntheticEvent, useState } from 'react'
import { Modal, Button, Divider, Text, Textarea, Grid, Radio, NumberInput, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useModalEntryStore } from '@app/store/builderStore';
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useCardStore, useTokenStore } from '@app/store/builder/builderState';
import RichTextSection from '@app/core/components/richtext/RichTextSection';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { UserDataProp } from '@app/context/user.context';
import { MdModeEdit } from 'react-icons/md';
import { useCalculatorStore } from '@app/store/builder/calculatorStore';
import he from 'he';
import numeral from 'numeral';
import { AiFillQuestionCircle } from 'react-icons/ai';

interface RadioProps {
    label: string
    color: string
    radVal: any
    setRadVal: any
    elem: any
    setBlurred: any
    update: any
    handleBlur: any
    setSectID: any
    section: any
    data: any
    login: any
}

const RadioToggle: React.FC<RadioProps> = ({ color, label, elem, radVal, setRadVal, handleBlur, setBlurred, update, setSectID, data, login, section }) => {
    const [checked, setChecked] = useState(false);
    const cells = useCalculatorStore((state) => (state.cells))
    return (
        <div>

            
            
        </div>
    )
}

export default RadioToggle