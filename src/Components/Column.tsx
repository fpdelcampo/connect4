import React from 'react'
import Circle from './Circle'

interface ColumnProps {
    colIndex: number;
    values: number[];
    onDrop: (col: number) => void;
    hovered: boolean;
    handleMouseEnter: (col: number) => void;
    handleMouseLeave: () => void;
}

function Column({colIndex, values, onDrop, hovered, handleMouseEnter, handleMouseLeave }: ColumnProps) {
    const columnValues = values.filter((_, index: number) => index % 7 === colIndex);
    return (
        <div 
        className={`flex flex-col-reverse items-center cursor-pointer ${hovered ? 'bg-yellow-200' : ''} gap-2`}
        onClick={() => onDrop(colIndex)}
        onMouseEnter={() => handleMouseEnter(colIndex)}
        onMouseLeave={handleMouseLeave}
        >
            {columnValues.map((value: number, rowIndex: number) => (
                <Circle
                    value={value}
                    key={rowIndex}
                />
            ))}
        </div>
    )
}

export default Column