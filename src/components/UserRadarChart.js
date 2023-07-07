import React, { useEffect, useState } from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const UserRadarChart = ({ fill, accent }) => {
    const data = [
        {
            subject: "Images",
            A: 5,
            B: 4,
            fullMark: 5,
        },
        {
            subject: "Cards",
            A: 4,
            B: 2,
            fullMark: 5,
        },
        {
            subject: "Names",
            A: 3,
            B: 1,
            fullMark: 5,
        },
        {
            subject: "Numbers",
            A: 5,
            B: 3,
            fullMark: 5,
        },
        {
            subject: "Words",
            A: 4,
            B: 2,
            fullMark: 5,
        },
    ]

    const legendData = [
        { value: "Kenneth", color: fill },
        { value: "CCA Average", color: accent },
    ];

    const [windowSize, setWindowSize] = useState(window.innerWidth <= 550 ? window.innerWidth - 10 : 500)
    
    window.addEventListener("resize", (e) => {
        setWindowSize(e.target.innerWidth <= 550 ? e.target.innerWidth - 10 : 500)
    })

    return (
        <ResponsiveContainer height={windowSize} width={windowSize}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 'data-max']}  tickCount={6} />
                <Radar
                    name="CCA Average"
                    dataKey="B"
                    fillOpacity={0.6}
                    className="fill-accent stroke-accent"
                />
                
                <Radar
                    name="Kenneth"
                    dataKey="A"
                    fillOpacity={0.6}
                    className="fill-secondary stroke-secondary"
                />

                <Legend payload={legendData} />
                <Tooltip />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default UserRadarChart;
