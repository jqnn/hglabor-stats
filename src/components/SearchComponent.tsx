"use client";

import {useRouter} from "next/navigation";
import {useRef} from "react";

export function SearchComponent() {
    const navigation = useRouter()
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const content = inputRef.current?.value;
        if (content === undefined || content === null || content === "") return;
        navigation.push(`/player/${content}`);
    }

    return (
        <div className="flex items-center justify-center mb-10 px-4">
            <div className="flex items-center bg-zinc-900 rounded-lg overflow-hidden w-full max-w-3xl shadow-lg">
                <div className="ml-2 flex-grow flex items-center p-2">
                    <input ref={inputRef} type="text" id="searchInput" placeholder="Username or UUID"
                           className="bg-transparent text-white w-full focus:outline-none text-lg placeholder-zinc-500 px-2 py-2 sm:px-4"/>
                </div>
                <button onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-3 transition-colors duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-zinc-200" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}