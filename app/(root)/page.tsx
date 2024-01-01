import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <p>Hello world</p>
            <Button>Testing btn</Button>
            <UserButton afterSignOutUrl="/" />

        </div>
    )
}
