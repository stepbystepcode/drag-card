import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

interface CardSlotProps {
  cards: { id: number; number: number }[];
  onDrop: (id: number, number: number, slotIndex: number) => void;
  onReturn: (id: number) => void;
  slotIndex: number;
}

const CardSlot: React.FC<CardSlotProps> = ({ cards, onDrop, onReturn, slotIndex }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop: (item: { id: number; number: number }) => {
      if (!cards.some((card) => card.id === item.id)) {
        onDrop(item.id, item.number, slotIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`relative flex justify-center w-24 h-72 p-4 border border-dashed ${isOver ? 'bg-blue-100' : ''}`}
    >
      {cards.map((card, index) => (
        <div
          key={card.id}
          style={{
            position: 'absolute',
            top: `${index * 20}px`,
            zIndex: index,
          }}
        >
          <Card id={card.id} number={card.number} onReturn={onReturn} />
        </div>
      ))}
    </div>
  );
};

export default CardSlot;
