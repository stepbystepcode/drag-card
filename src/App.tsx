import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CardSlot from './components/CardSlot';
import CardList from './components/CardList';
import { data } from './Data'; // 从同级文件夹的 Data.ts 中导入卡片数据

// 定义卡片类型
interface CardType {
  id: number;
  content: string;
}

const App: React.FC = () => {
  // 使用 Data.ts 中的数据来初始化卡片
  const initialCards: CardType[] = data.map((item, index) => ({
    id: index,
    content: item,
  }));

  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [slots, setSlots] = useState<CardType[][]>([[], [], [], [], []]); // 定义 slots 的类型为 CardType[][]
  const [hiddenSlots, setHiddenSlots] = useState<number[]>([]); // 维护隐藏卡槽的索引

  // 卡槽名称
  const slotLabels = ['非常重视', '比较重视', '有时重视', '很少重视', '完全不重视'];

  const handleDrop = (id: number, content: string, targetSlotIndex: number) => {
    setSlots((prevSlots) => {
      const newSlots = prevSlots.map((slot) => slot.filter((card) => card.id !== id)); // 从所有牌槽中删除该卡片
      newSlots[targetSlotIndex] = [...newSlots[targetSlotIndex], { id, content }]; // 将卡片添加到目标牌槽
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

  // 隐藏卡槽
  const hideSlot = (index: number) => {
    setHiddenSlots((prev) => [...prev, index]);
  };

  // 恢复显示卡槽
  const restoreSlot = (index: number) => {
    setHiddenSlots((prev) => prev.filter((slotIndex) => slotIndex !== index));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center space-y-4">
        {/* 显示的卡槽 */}
        <div className="grid grid-cols-5 gap-4">
          {slots.map((slot, index) => (
            !hiddenSlots.includes(index) && (
              <div key={index} className="flex flex-col items-center">
                <button className="mb-2 font-bold" onClick={() => hideSlot(index)}>
                  {slotLabels[index]} {/* 标签说明 */}
                </button>
                <CardSlot
                  slotIndex={index}
                  cards={slot}
                  onDrop={handleDrop}
                  onReturn={handleReturn}
                />
              </div>
            )
          ))}
        </div>

        {/* 底部卡片列表 */}
        <CardList cards={cards} onReturn={handleReturn} />

        {/* 隐藏的卡槽标签 */}
        {hiddenSlots.length > 0 && (
          <div className="mt-4 p-2 border">
            <h3 className="font-bold mb-2">隐藏的卡槽:</h3>
            <div className="flex space-x-4">
              {hiddenSlots.map((slotIndex) => (
                <button key={slotIndex} className="font-bold" onClick={() => restoreSlot(slotIndex)}>
                  {slotLabels[slotIndex]} {/* 点击恢复显示 */}
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
