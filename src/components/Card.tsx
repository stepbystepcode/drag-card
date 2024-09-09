import React from 'react';
import { useDrag } from 'react-dnd';

interface CardProps {
  id: number;
  content: string;
  description: string;
  onReturn: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, content, description, onReturn }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { id, content, description },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={`w-36 h-24 m-2 flex items-center text-sm border rounded bg-white ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      onClick={() => onReturn(id)}
    >
      <div className="bg-[#aee636] text-white py-1 pl-6 pr-2">
        {content}
        <br />
        {description}
      </div>
    </div>
  );
};

export default Card;