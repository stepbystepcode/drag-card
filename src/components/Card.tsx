import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface CardProps {
  id: number;
  index: number;
  content: string;
  description: string;
  onReturn: (id: number) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const Card: React.FC<CardProps> = ({ id, index, content, description, onReturn, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { id, index, content, description },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: { id: number; index: number }, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // 避免将卡片拖放到自己身上
      if (dragIndex === hoverIndex) return;

      // 获取卡片的边界框
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // 获取鼠标位置
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

      // 获取卡片高度的一部分
      const hoverHeight = hoverBoundingRect.bottom - hoverBoundingRect.top;

      // 当鼠标越过卡片高度的25%时，触发向上或向下排序
      if (dragIndex < hoverIndex && hoverClientY < hoverHeight * 0.25) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverHeight * 0.75) return;

      // 执行排序移动
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex; // 更新拖拽项的索引
    },
  });

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={`relative min-w-64 h-44 max-w-[300px] aspect-[3/2] mt-2 flex items-center text-sm border rounded bg-white ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      onClick={() => onReturn(id)}
    >
      <div className="bg-[#aee636] text-white py-1 pl-6 pr-2 text-lg">
        {content}
      </div>
      <div className="absolute bottom-1 text-sm text-center p-1 text-gray-500 w-full">{description}</div>
    </div>
  );
};

export default Card;
