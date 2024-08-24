// mainScript.jsx (rename to .jsx if needed)
import { initLenis, getLenis } from "@/components/core/lenis";
import { useEffect } from "react";

const MainScript = ({ isInfiniteScroll, ...props }) => {
    useEffect(() => {
        document.querySelector(".main").classList.remove("on-load");
        if (!getLenis(isInfiniteScroll)) {
            initLenis(isInfiniteScroll);
        }
    }, []);

    return null;
};

export default MainScript;