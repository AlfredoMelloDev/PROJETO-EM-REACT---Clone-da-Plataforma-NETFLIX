// MovieRow.js
import React, { useState } from "react";
import "./MovieRow.css";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function MovieRow({ title, items }) {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) x = 0;
        setScrollX(x);
    };

    const handleRightArrow = () => {
        const results = items?.results ?? [];
        const listW = results.length * 150; // 150 = largura aproximada do item (ajuste se precisar)
        let x = scrollX - Math.round(window.innerWidth / 2);

        // limite pra não “passar do fim”
        if (window.innerWidth - listW > x) {
            x = window.innerWidth - listW - 60; // 60 = folga
        }

        setScrollX(x);
    };

    const results = items?.results ?? [];

    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">
                <div
                    className="movieRow--list"
                    style={{ marginLeft: `${scrollX}px`, width: results.length * 150 }}
                >
                    {results.map((item, key) => (
                        <div key={item.id ?? key} className="movieRow--item">
                            <img
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                alt={item.title || item.name || item.original_title || "Poster"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
