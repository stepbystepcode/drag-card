import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import update from 'immutability-helper'; // 使用 immutability-helper 来更新卡片顺序

interface CardSlotProps {
  cards: { id: number; content: string; description: string }[];
  onDrop: (id: number, content: string, description: string, slotIndex: number) => void;
  onReturn: (id: number) => void;
  slotIndex: number;
}

const CardSlot: React.FC<CardSlotProps> = ({ cards, onDrop, onReturn, slotIndex }) => {
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      const updatedCards = update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      });
      // 更新排序后的卡片列表
      onDrop(updatedCards[hoverIndex].id, updatedCards[hoverIndex].content, updatedCards[hoverIndex].description, slotIndex);
    },
    [cards, onDrop, slotIndex]
  );

  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop: (item: { id: number; content: string; description: string }) => {
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
      {cards.map((card, index) => (
        <div key={card.id} className="flex justify-center">
          <Card
            id={card.id}
            index={index}
            content={card.content}
            description={card.description}
            moveCard={moveCard} // 传递 moveCard 函数用于卡片排序
            onReturn={onReturn}
          />
        </div>
      ))}
    </div>
  );
};

export default CardSlot;
