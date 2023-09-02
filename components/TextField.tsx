'use client'

import { Input } from './ui/input'
import { Label } from './ui/label'

type TextFieldProps = {
    placeholder: string
    // the rest of the props are passed to the input
    [x: string]: any
}

const TextField: React.FC<TextFieldProps> = ({
    placeholder,
    ...inputProps
}) => {
    return (
        <Input
            {...inputProps}
            placeholder={placeholder}
            type="search"
            className="outline-none border-none focus:outline-none focus:border-none"
        />
    )
}

export default TextField
