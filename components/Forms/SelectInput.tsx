import { ChangeEventHandler } from 'react';
import { Label, Select } from 'flowbite-react';
import { SelectOptT } from '@/utils/types';
import { customInput } from '../CustomTheme';

type Props = {
    label?: string
    htmlFor?: string
    selectId?: string
    data: SelectOptT[]
    className?: string
    classWrapp?: string
    onOpsional?: boolean
    errMsg?: string
    name?: string
    changeSelect: ChangeEventHandler<HTMLSelectElement>
    defaultValue?: string
}

export default function SelectInput({
    label,
    htmlFor,
    selectId,
    data,
    className,
    classWrapp,
    onOpsional = false,
    errMsg,
    name,
    changeSelect,
    defaultValue
}: Props) {
    return (
        <div className={`flex flex-col ${classWrapp}`}>
            <div className={`flex items-center ${className}`}>
                <Label htmlFor={htmlFor} value={label} />
                {!onOpsional ? (
                    <span className="text-red-500 ml-1">*</span>
                ) : (
                    <span className='text-gray-text ml-1'>(Opsional)</span>
                )}
            </div>
            <Select defaultValue={defaultValue} name={name} id={selectId} className='mt-2' onChange={changeSelect} theme={customInput} style={{
                backgroundColor: '#fff',
                cursor: 'pointer'
            }}>
                {data.length > 0 && data.map((opt, i) => {
                    return (
                        <option key={i} value={opt.value}>{opt.name}</option>
                    )
                })}
            </Select>
            <p className="text-red-600"><small>{errMsg}</small></p>
        </div>
    )
}