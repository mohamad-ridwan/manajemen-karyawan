import { ChangeEventHandler } from "react";
import { Button, Modal } from "flowbite-react";
import SelectInput from "@/components/Forms/SelectInput";
import { DataKaryawanT, SelectOptT } from "@/utils/types";
import InputForm from "@/components/Forms/InputForm";
import DateInput from "@/components/Forms/DateInput";
import { customButtonDefault, customPopupModal } from "@/components/CustomTheme";

type Props = {
    openModal: boolean
    closeModal: () => void
    changeSelect: ChangeEventHandler<HTMLSelectElement>
    changeInput: ChangeEventHandler<HTMLInputElement>
    formValue: DataKaryawanT
    errForm: DataKaryawanT
    dataSelectInput: { [key: string]: SelectOptT[] }
    changeNumberInput: ChangeEventHandler<HTMLInputElement>
    onSelectedDateChanged: (e: Date, nameInput: 'tglLahir' | 'tglBergabung')=>void
}

export default function ModalForm({
    openModal,
    closeModal,
    changeSelect,
    changeInput,
    formValue,
    errForm,
    dataSelectInput,
    changeNumberInput,
    onSelectedDateChanged,
}: Props) {
    return (
        <Modal
            show={openModal}
            onClose={closeModal}
            className="bg-[rgba(0,0,0,0.4)]"
            theme={customPopupModal}
            popup
        >
            <Modal.Header />
            <Modal.Body>
                <h1 className="font-semibold text-gray-text text-xl">
                    Form Data Karyawan
                </h1>

                <div className="mt-4">
                    <SelectInput
                        label="Jabatan"
                        htmlFor="jabatan"
                        selectId="jabatan"
                        name="jabatan"
                        data={dataSelectInput.jabatan}
                        changeSelect={changeSelect}
                        errMsg={errForm.jabatan}
                    />
                    <InputForm
                        label="NIK"
                        name="NIK"
                        type="tel"
                        value={formValue.NIK}
                        errMsg={errForm.NIK}
                        classInput="mt-2"
                        classWrap="mt-6"
                        changeInput={changeNumberInput}
                        placeholder="NIK 16 digit"
                    />
                    <InputForm
                        label="Alamat Rumah"
                        name="alamat"
                        type="text"
                        value={formValue.alamat}
                        errMsg={errForm.alamat}
                        classInput="mt-2"
                        classWrap="mt-6"
                        changeInput={changeInput}
                        placeholder="Jl. Sunan Muria VII Blok G"
                    />
                    <InputForm
                        label="No. Telp"
                        name="noTelp"
                        type="tel"
                        value={formValue.noTelp}
                        errMsg={errForm.noTelp}
                        classInput="mt-2"
                        classWrap="mt-6"
                        changeInput={changeNumberInput}
                        placeholder="08134..."
                    />
                    <DateInput
                        maxDate={new Date()}
                        htmlFor="tglLahir"
                        dateId="tglLahir"
                        name="tglLahir"
                        label="Tanggal Lahir"
                        defaultDate={formValue.tglLahir}
                        onSelectedDateChanged={(e)=>onSelectedDateChanged(e, 'tglLahir')}
                    />
                    <SelectInput
                        label="Divisi"
                        htmlFor="divisi"
                        selectId="divisi"
                        name="divisi"
                        classWrapp="mt-6"
                        data={dataSelectInput.divisi}
                        changeSelect={changeSelect}
                        errMsg={errForm.divisi}
                    />
                    <InputForm
                        label="Gaji"
                        name="gaji"
                        type="tel"
                        value={formValue.gaji}
                        errMsg={errForm.gaji}
                        classInput="mt-2"
                        classWrap="mt-6"
                        changeInput={changeNumberInput}
                        placeholder="Gaji Karyawan"
                    />
                    <DateInput
                        maxDate={new Date()}
                        htmlFor="tglBergabung"
                        dateId="tglBergabung"
                        name="tglBergabung"
                        label="Tanggal Bergabung"
                        defaultDate={formValue.tglBergabung}
                        onSelectedDateChanged={(e)=>onSelectedDateChanged(e, 'tglBergabung')}
                    />
                    <SelectInput
                        label="Status Karyawan"
                        htmlFor="statusKaryawan"
                        selectId="statusKaryawan"
                        name="statusKaryawan"
                        classWrapp="mt-6"
                        data={dataSelectInput.statusKaryawan}
                        changeSelect={changeSelect}
                        errMsg={errForm.statusKaryawan}
                    />
                    <Button theme={customButtonDefault} className="w-full mt-4" onClick={closeModal}>
                        Tutup
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}