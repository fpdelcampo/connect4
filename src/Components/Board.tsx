import React from 'react';
import Column from './Column';

interface BoardProps {
    values: number[];
    onDrop: (col: number) => void;
    hovered: number | null;
    handleMouseEnter: (col: number) => void;
    handleMouseLeave: () => void;
}

function Board({ values, onDrop, hovered, handleMouseEnter, handleMouseLeave }: BoardProps) {
    return (
        <div className="grid grid-cols-7 grid-rows-1 mx-auto bg-blue-600 w-[700px] h-[600px] mt-40 gap-2 p-2 rounded-3xl">
            {Array(7).fill(null).map((_, colIndex) => (
                <Column
                    key={colIndex}
                    colIndex={colIndex}
                    values={values}
                    onDrop={onDrop}
                    hovered={hovered === colIndex} // Check if this column is hovered
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                />
            ))}
        </div>
    );
}

export default Board;
