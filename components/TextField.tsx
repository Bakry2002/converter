//!  old version
'use client'

import Input from './ui/input'
import { Label } from './ui/label'

type TextFieldProps = {
    placeholder: string
} & React.InputHTMLAttributes<HTMLInputElement>

const TextField: React.FC<TextFieldProps> = ({
    placeholder,
    ...inputProps
}) => {
    return <Input {...inputProps} placeholder={placeholder} className="" />
}

export default TextField
