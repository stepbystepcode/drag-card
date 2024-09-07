import React from 'react';
import { useDrag } from 'react-dnd';

interface CardProps {
  id: number;
  number: number;
  onReturn: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, number, onReturn }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { id, number },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={`w-14 h-20 m-2 text-center border rounded bg-white ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      onClick={() => onReturn(id)}
    >
      {number}
    </div>
  );
};

export default Card;
