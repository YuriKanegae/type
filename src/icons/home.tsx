import "./index.css";

import type { IconProps } from "./iconProps";

function Home({ width = "24", height = "24" }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" >
            <title>Home icon</title>
            <path fill="currentColor" d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75" />
        </svg>
    );
}

export default Home;