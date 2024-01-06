import { ChangeEventHandler, KeyboardEventHandler } from "react"
import { CustomFlowbiteTheme, Label, TextInput } from "flowbite-react"
// import { customInput } from "@/components/CustomTheme"

type Props = {
    classWrap?: string
    classLabel?: string
    htmlFor?: string
    label?: string
    noRequired?: boolean
    errMsg?: string
    inputId?: string
    type: string
    value: string
    name?: string
    classInput?: string
    maxLength?: number
    changeInput?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
    placeholder?: string
    pressEnter?: KeyboardEventHandler<HTMLInputElement>
    customInput: CustomFlowbiteTheme['textInput']
    onDisabled?: boolean
    onInputRequired?: boolean
}

export default function InputForm({
    classWrap,
    classLabel,
    htmlFor,
    label,
    noRequired = false,
    errMsg,
    inputId,
    type,
    value,
    name,
    classInput,
    changeInput,
    placeholder,
    pressEnter,
    maxLength,
    customInput,
    onDisabled,
    onInputRequired
}: Props) {
    return (
        <div className={`flex flex-col ${classWrap}`}>
            <div className={`flex items-center ${classLabel}`}>
                <Label htmlFor={htmlFor} value={label} />
                {!noRequired && <>
                    <span className="text-red-500 ml-1">*</span>
                </>}
            </div>
            <TextInput
                id={inputId}
                type={type}
                value={value}
                name={name}
                className={classInput}
                onChange={changeInput}
                placeholder={placeholder}
                theme={customInput}
                maxLength={maxLength}
                onKeyDown={pressEnter}
                disabled={onDisabled}
                required={onInputRequired}
            />
            <p className="text-red-600"><small>{errMsg}</small></p>
        </div>
    )
}