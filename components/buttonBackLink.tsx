import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ButtonBackLinkProps {
    location: string
}
const ButtonBackLink: React.FC<ButtonBackLinkProps> = ({ location }) => {
    return (
        <div className='absolute left-4 p-2 rounded-full bg-figmaLightDark'>
            <Link href={`${location}`}>
                <ArrowLeft />
            </Link>
        </div>)
}

export default ButtonBackLink