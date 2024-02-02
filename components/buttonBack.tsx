"use client"
import useFriendStore from '@/hooks/use-friends'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
interface ButtonBackProps {
    location: string
}
const ButtonBack: React.FC<ButtonBackProps> = ({ location }) => {
    const router = useRouter()
    const clearFriends = useFriendStore((state) => state.clearFriends);
    const HandleReturn = () => {
        clearFriends
        router.push(`/create/${location}`)
    }
    return (
        <div onClick={() => HandleReturn()}>
            <ArrowLeft />
        </div>
    )
}

export default ButtonBack