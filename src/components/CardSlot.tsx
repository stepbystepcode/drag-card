import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

interface CardSlotProps {
  cards: { id: number; content: string }[];  // 修改 number 为 content (string)
  onDrop: (id: number, content: string, slotIndex: number) => void;  // 修改 number 为 content
  onReturn: (id: number) => void;
  slotIndex: number;
}

const CardSlot: React.FC<CardSlotProps> = ({ cards, onDrop, onReturn, slotIndex }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop: (item: { id: number; content: string }) => {  // 修改 number 为 content
      if (!cards.some((card) => card.id === item.id)) {
        onDrop(item.id, item.content, slotIndex);  // 修改 number 为 content
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
          <Card id={card.id} content={card.content} onReturn={onReturn} />  {/* 修改 number 为 content */}
        </div>
      ))}
    </div>
  );
};

export default CardSlot;
