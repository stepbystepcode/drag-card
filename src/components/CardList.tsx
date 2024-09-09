import React from 'react';
import Card from './Card';

interface CardListProps {
  cards: { id: number; content: string, description: string }[];
  onReturn: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onReturn }) => {
  // 只渲染最后一张卡片
  const topCard = cards[cards.length - 1]; // 获取最后一张卡片

  return (
    <div className="w-64 z-10 aspect-[3/2] border border-dashed flex justify-center items-center fixed bottom-0 right-0 ">
      {topCard && (
        <Card key={topCard.id} id={topCard.id} content={topCard.content} description={topCard.description} onReturn={onReturn} />
      ) }
    </div>
  );
};

export default CardList;