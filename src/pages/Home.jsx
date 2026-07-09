import React, { useEffect, useState } from "react";
import "../css/newLayout.css";
import api from "../api/adminApi.js";
import BannerGrid1x2 from "../components/BannerGrid1x2.jsx";
import Grid4 from "../components/Grid4.jsx";

export default function Home() {
    const [sectionsByPosition, setSectionsByPosition] = useState({});
    const [sectionsDesignType, setSectionsDesignType] = useState([]);
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await api.get("/api/homepagesectionsByPosition/");
                setSectionsByPosition(response.data);
            } catch (error) {
                console.error("Error fetching homepage sections:", error);
            }
        };
        const fetchDesignTypes = async () => {
            try {
                const response = await api.get("/api/getHomePageSectionDesignTypes/");
                setSectionsDesignType(response.data);
            } catch (error) {
                console.error("Error fetching homepage sections:", error);
            }
        };

        fetchSections();
        fetchDesignTypes();
    }, []);
    console.log(sectionsDesignType.map(d => console.log(`Pos`, d.position)));
    
    return (
        <>
            {
                sectionsDesignType.map((d ,idx) => {
                    console.log(d.position);
                    switch (d.designType) {
                        case "grid-4":
                            return <Grid4 title={d.title} data={sectionsByPosition[d.position] || []}/>;
                            break;
                        case "grid-2":
                            return 'Grid 2';
                            break;
                            // <!-- return <Grid2 key={idx} items={sectionsByPosition[d.position] || []} />; -->
                        case "carousel":
                            return 'carousel';
                            break;
                            // <!-- return <Carousel key={idx} items={sectionsByPosition[d.position] || []} />; -->
                        case "banner-grid-1x2":
                            return <BannerGrid1x2 data={sectionsByPosition[d.position] || []} />;
                            break;
                        default:
                            return null;
                    }
                })
            }
        </>
    );
}
