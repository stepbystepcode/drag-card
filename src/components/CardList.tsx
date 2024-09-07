import React from 'react';
import Card from './Card';

interface CardListProps {
  cards: { id: number; number: number }[];
  onReturn: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onReturn }) => {
  return (
    <div className="p-4 border border-dashed flex flex-wrap">
      {cards.map((card) => (
        <Card key={card.id} id={card.id} number={card.number} onReturn={onReturn} />
      ))}
    </div>
  );
};

export default CardList;
