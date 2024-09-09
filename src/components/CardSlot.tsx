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
      className={`flex flex-wrap w-full h-[100vh] items-start justify-center place-content-start border border-dashed ${isOver ? 'bg-blue-100' : 'bg-[#fafafa]'}`}
    >
      {cards.map((card) => (
        <div
            key={card.id}
            className="flex justify-center"
            >
          <Card id={card.id} content={card.content} description={card.description} onReturn={onReturn} />
        </div>
      ))}
    </div>
  );
};

export default CardSlot;
