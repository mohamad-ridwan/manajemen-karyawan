'use client'

import {RiBarChartHorizontalLine} from 'react-icons/ri'
import UseNavbar from '../UseNavbar'

export default function MenuBtn() {
    const {
        clickBtnNavbar
    } = UseNavbar()
    return (
        <button onClick={clickBtnNavbar}>
            <RiBarChartHorizontalLine className="mr-3 flex md:hidden" style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>
    )
}