import { Datepicker, DatepickerProps, Label } from "flowbite-react";
// import { customThemeDatePicker } from "../CustomTheme";

type Props = {
    maxDate?: Date
    htmlFor?: string
    dateId?: string
    name?: string
    label: string
    onSelectedDateChanged: (e: Date)=>void
    defaultDate: string
}

export default function DateInput({
    maxDate,
    htmlFor,
    dateId,
    name,
    label,
    onSelectedDateChanged,
    defaultDate = `${new Date()}`
}: Props) {
    return (
        <div className="mt-6">
            <div className="flex items-center">
                <Label htmlFor={htmlFor} value={label} />
                <span className="text-red-500 ml-1">*</span>
            </div>
            <Datepicker
                id={dateId}
                title={label}
                name={name}
                className="mt-2"
                icon={undefined}
                style={{ cursor: 'default', padding: '0.6rem' }}
                maxDate={maxDate}
                onSelectedDateChanged={onSelectedDateChanged}
                defaultDate={new Date(defaultDate)}
            />
        </div>
    )
}