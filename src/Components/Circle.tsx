import React from 'react';

interface CircleProps {
    value: number;
}

function Circle({ value }: CircleProps) {
    let color = 'bg-gray-300';
    if (value === 1) {
        color = 'bg-yellow-500';
    } 
    if (value === -1) {
        color = 'bg-red-500';
    }
    return <div className={`w-full h-full rounded-full ${color}`}></div>;
}

export default Circle;
