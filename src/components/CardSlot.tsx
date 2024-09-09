import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

interface CardSlotProps {
  cards: { id: number; content: string, description: string }[];
  onDrop: (id: number, content: string, description: string, slotIndex: number) => void;
  onReturn: (id: number) => void;
  slotIndex: number;
}

const CardSlot: React.FC<CardSlotProps> = ({ cards, onDrop, onReturn, slotIndex }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop: (item: { id: number; content: string, description: string }) => {
      if (!cards.some((card) => card.id === item.id)) {
        onDrop(item.id, item.content, item.description, slotIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`flex flex-col justify-start items-center gap-2 w-full h-[calc(100vh-12rem)] p-4 border border-dashed ${isOver ? 'bg-blue-100' : 'bg-[#fafafa]'}`}
    >
      {cards.map((card) => (
        <div
            key={card.id}
            className="w-full flex justify-center"
            >
          <Card id={card.id} content={card.content} description={card.description} onReturn={onReturn} />
        </div>
      ))}
    </div>
  );
};

export default CardSlot;
