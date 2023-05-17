import React, { useState } from 'react'
import { Modal, Button, Divider, Text, Textarea, Grid, Radio } from '@mantine/core';
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

interface RadioProps {
    label: string
    color: string

}

const RadioToggle: React.FC<RadioProps> = ({ color, label }) => {
    const [checked, setChecked] = useState(false);
    return (
        <Radio
            label={label}
            color={color}
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            onClick={() => setChecked(false)}
        />
    )
}

export default RadioToggle