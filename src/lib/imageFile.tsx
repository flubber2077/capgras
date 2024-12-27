import Image from 'next/image'
import thereWas from '../../public/images/there-was-no-end-to-expand-to-czOT.jpg'

export async function ThereWasImage () {
    return <Image src={thereWas} alt="placeholder alt" placeholder="blur" />
}
