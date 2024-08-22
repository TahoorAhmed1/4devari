import { MAP_API_KEY, MAP_LIBRARIES, Map_ID } from "../config";

const API_KEY = MAP_API_KEY;
const LIBRARIES = MAP_LIBRARIES;
const MAP_IDS = Map_ID; // Add your map IDs here

const loadScript = () => {
    if( typeof document !== "undefined" && typeof window !== "undefined"){
        const queryParams = new URLSearchParams({
            key: API_KEY,
            libraries: LIBRARIES.join(','),
            map_ids: MAP_IDS.join(','),
        });
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?${queryParams.toString()}`;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
};

export { loadScript };

