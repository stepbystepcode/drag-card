import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CardSlot from './components/CardSlot';
import CardList from './components/CardList';

// 定义卡片类型
interface CardType {
  id: number;
  number: number;
}

const App: React.FC = () => {
  const initialCards: CardType[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    number: Math.floor(Math.random() * 100),
  }));

  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [slots, setSlots] = useState<CardType[][]>([[], [], [], []]); // 定义 slots 的类型为 CardType[][]

  const handleDrop = (id: number, number: number, targetSlotIndex: number) => {
    setSlots((prevSlots) => {
      const newSlots = prevSlots.map((slot) => slot.filter((card) => card.id !== id)); // 从所有牌槽中删除该卡片
      newSlots[targetSlotIndex] = [...newSlots[targetSlotIndex], { id, number }]; // 将卡片添加到目标牌槽
      return newSlots;
    });
    setCards((prevCards) => prevCards.filter((card) => card.id !== id)); // 从底部区域删除卡片
  };

  const handleReturn = (id: number) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.filter((card) => {
          if (card.id === id) {
            setCards((prevCards) => [...prevCards, card]); // 将卡片返回到底部区域
            return false;
          }
          return true;
        })
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center space-y-4">
        <div className="grid grid-cols-4 gap-4">
          {slots.map((slot, index) => (
            <CardSlot
              key={index}
              slotIndex={index}
              cards={slot}
              onDrop={handleDrop}
              onReturn={handleReturn}
            />
          ))}
        </div>
        <CardList cards={cards} onReturn={handleReturn} />
      </div>
    </DndProvider>
  );
};

export default App;
