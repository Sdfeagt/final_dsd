"use client";
import { BounceLoader } from "react-spinners";


const Loading = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <BounceLoader color="#40bc5c" />
        </div>
    );
}

export default Loading;