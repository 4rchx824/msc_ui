import React, { useContext, useEffect, useState } from "react";
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

import { ThemeContext } from "../screens/Layout";
import { DaisyThemes } from "./ThemeColors";

const UserRadarChart = ({ userDetails, ccaDetails }) => {
    let theme = useContext(ThemeContext);
    let { primary, secondary } = DaisyThemes[`[data-theme=${theme}]`];

    const [windowSize, setWindowSize] = useState(
        window.innerWidth <= 550 ? window.innerWidth - 30 : 500
    );

    window.addEventListener("resize", (e) => {
        setWindowSize(
            e.target.innerWidth <= 550 ? e.target.innerWidth - 30 : 500
        );
    });

    const [data, setData] = useState([
        {
            subject: "Images",
            A: userDetails.images,
            B: ccaDetails.images,
            fullMark: 5,
        },
        {
            subject: "Cards",
            A: userDetails.cards,
            B: ccaDetails.cards,
            fullMark: 5,
        },
        {
            subject: "Names",
            A: userDetails.names,
            B: ccaDetails.names,
            fullMark: 5,
        },
        {
            subject: "Numbers",
            A: userDetails.numbers,
            B: ccaDetails.numbers,
            fullMark: 5,
        },
        {
            subject: "Words",
            A: userDetails.words,
            B: ccaDetails.words,
            fullMark: 5,
        },
    ]);

    const legendData = [
        { value: userDetails.name, color: primary },
        { value: "CCA", color: secondary },
    ];

    const [dataset, setDataset] = useState([]);

    const FindSmaller = () => {
        let a = 0,
            b = 0;
        for (const x of data) {
            a += x.A;
            b += x.B;
        }

   
        a = a / 5;
        b = b / 5;
        if (a > b) {
            setDataset([
                {
                    name: userDetails.name,
                    dataKey: "A",
                    className: "fill-primary stroke-primary-focus",
                },
                {
                    name: "CCA",
                    dataKey: "B",
                    className: "fill-secondary stroke-secondary-focus",
                },
            ]);
        } else {
            setDataset([
                {
                    name: "CCA",
                    dataKey: "B",
                    className: "fill-secondary stroke-secondary-focus",
                },
                {
                    name: userDetails.name,
                    dataKey: "A",
                    className: "fill-primary stroke-primary-focus",
                },
            ]);
        }
    };

    useEffect(() => {
        FindSmaller();
    }, []);

    return (
        <>
            <ResponsiveContainer height={windowSize} width={windowSize}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />

                    {dataset.map((d) => (
                        <Radar
                            name={d.name}
                            dataKey={d.dataKey}
                            className={d.className}
                            fillOpacity={0.6}
                            key={d.dataKey}
                        />
                    ))}

                    <Legend payload={legendData} />
                    <Tooltip />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 5]}
                        tickCount={6}
                        style={{ display: "none" }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </>
    );
};

export default UserRadarChart;
