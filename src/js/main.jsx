// mainScript.jsx (rename to .jsx if needed)
import { resetLenis } from "@/components/core/lenis";
import { initMouse } from "@/components/core/mouse";
import { useEffect } from "react";

const MainScript = ({ isInfiniteScroll, ...props }) => {
    useEffect(() => {
        document.querySelector(".main").classList.remove("on-load");
        resetLenis(isInfiniteScroll)
        initMouse()
    }, []);

    return null
};

export default MainScript;