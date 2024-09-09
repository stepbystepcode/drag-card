import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CardSlot from './components/CardSlot';
import CardList from './components/CardList';
import { data } from './Data';

// 定义卡片类型
interface CardType {
  id: number;
  content: string;
  description: string;
}

const App: React.FC = () => {
  const initialCards: CardType[] = data.map((item: { name: string, description: string }, index: number) => ({
    id: index,
    content: item.name,
    description: item.description,
  }));

  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [slots, setSlots] = useState<CardType[][]>([[], [], [], [], []]); // 定义 slots 的类型为 CardType[][]
  const [hiddenSlots, setHiddenSlots] = useState<number[]>([]); // 维护隐藏卡槽的索引

  // 卡槽名称
  const slotLabels = ['非常重视', '比较重视', '有时重视', '很少重视', '完全不重视'];

  const handleDrop = (id: number, content: string, description: string, targetSlotIndex: number) => {
    setSlots((prevSlots) => {
      const newSlots = prevSlots.map((slot) => slot.filter((card) => card.id !== id)); // 从所有牌槽中删除该卡片
      newSlots[targetSlotIndex] = [...newSlots[targetSlotIndex], { id, content, description }]; // 将卡片添加到目标牌槽
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
        {/* 显示的卡槽 */}
        <div className={`gap-4 w-full grid-cols-${5-hiddenSlots.length} ${5-hiddenSlots.length > 2 ? 'grid' : 'flex'}`}>
          {slots.map((slot, index) => (
              <div key={index} className={`flex flex-col items-center w-full ${hiddenSlots.includes(index) ? 'hidden' : ''}`}>
                <button className="my-2 font-bold text-xl" onClick={() => setHiddenSlots([...hiddenSlots, index])}>
                  {slotLabels[index]}
                </button>
                
                <CardSlot
                  slotIndex={index}
                  cards={slot}
                  onDrop={handleDrop}
                  onReturn={handleReturn}
                />
              </div>
          ))}
        </div>

        {/* 底部卡片列表 */}
        <CardList cards={cards} onReturn={handleReturn} />
        {/* 隐藏的卡槽标签 */}
        {hiddenSlots.length > 0 && (
          <div className="fixed bottom-0 left-0 w-full p-2">
            <div className="flex space-x-4">
              {hiddenSlots.map((slotIndex) => (
                <button
                  key={slotIndex}
                  className="w-36 h-24 m-2 flex items-center justify-center text-md border text-white rounded bg-[#aee636]"
                  onClick={() => setHiddenSlots(hiddenSlots.filter((index) => index !== slotIndex))}
                >
                  {slotLabels[slotIndex]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default App;
