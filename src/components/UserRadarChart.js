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
    const [data, setData] = useState([
        {
            subject: "Images",
            A: Math.floor(Math.random() * 5) + 1,
            B: Math.floor(Math.random() * 5) + 1,
            fullMark: 5,
        },
        {
            subject: "Cards",
            A: Math.floor(Math.random() * 5) + 1,
            B: Math.floor(Math.random() * 5) + 1,
            fullMark: 5,
        },
        {
            subject: "Names",
            A: Math.floor(Math.random() * 5) + 1,
            B: Math.floor(Math.random() * 5) + 1,
            fullMark: 5,
        },
        {
            subject: "Numbers",
            A: Math.floor(Math.random() * 5) + 1,
            B: Math.floor(Math.random() * 5) + 1,
            fullMark: 5,
        },
        {
            subject: "Words",
            A: Math.floor(Math.random() * 5) + 1,
            B: Math.floor(Math.random() * 5) + 1,
            fullMark: 5,
        },
    ]);

    const legendData = [
        { value: "Kenneth", color: fill,  },
        { value: "CCA", color: accent },
    ];

    const [windowSize, setWindowSize] = useState(
        window.innerWidth <= 550 ? window.innerWidth - 30 : 500
    );

    window.addEventListener("resize", (e) => {
        setWindowSize(
            e.target.innerWidth <= 550 ? e.target.innerWidth - 30 : 500
        );
    });

    const [dataset, setDataset] = useState([]);

    const FindSmaller = () => {
        let a = 0,
            b = 0;
        for (const x of data) {
            console.log(x.A)
            console.log(x.B)
            a += x.A;
            b += x.B;
        }

        console.log(a)
        console.log(b)
        a = a/5
        b = b/5

        console.log("kenneth: " + a, "cca: " + b);

        if (a > b) {
            setDataset([
                {
                    name: "Kenneth",
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
                    name: "Kenneth",
                    dataKey: "A",
                    className: "fill-primary stroke-primary-focus",
                },
            ]);
        }
    };

    const RandomiseData = () => {
        setData([
            {
                subject: "Images",
                A: Math.floor(Math.random() * 5) + 1,
                B: Math.floor(Math.random() * 5) + 1,
                fullMark: 5,
            },
            {
                subject: "Cards",
                A: Math.floor(Math.random() * 5) + 1,
                B: Math.floor(Math.random() * 5) + 1,
                fullMark: 5,
            },
            {
                subject: "Names",
                A: Math.floor(Math.random() * 5) + 1,
                B: Math.floor(Math.random() * 5) + 1,
                fullMark: 5,
            },
            {
                subject: "Numbers",
                A: Math.floor(Math.random() * 5) + 1,
                B: Math.floor(Math.random() * 5) + 1,
                fullMark: 5,
            },
            {
                subject: "Words",
                A: Math.floor(Math.random() * 5) + 1,
                B: Math.floor(Math.random() * 5) + 1,
                fullMark: 5,
            },
        ])
    }

    useEffect(() => {
        FindSmaller();
    }, [fill, data]);

    useEffect(() => {
        RandomiseData()
    }, [fill])

    return (
        <ResponsiveContainer height={windowSize} width={windowSize}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />

                {dataset.map((d) => (
                    <Radar
                        name={d.name}
                        dataKey={d.dataKey}
                        fillOpacity={0.6}
                        className={d.className}
                        key={d.dataKey}
                    />
                ))}

                <Legend payload={legendData} />
                <Tooltip />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis
                    angle={90}
                    domain={[0, "data-max"]}
                    tickCount={6}
                    style={{ display: "none" }}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default UserRadarChart;
