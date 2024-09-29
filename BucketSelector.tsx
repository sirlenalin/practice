import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  BUCKET: 'bucket',
};

interface BucketSelectorProps {
  name: string;
  onDrop: (name: string) => void;
}

const BucketSelector: React.FC<BucketSelectorProps> = ({ name, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BUCKET,
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BUCKET,
    drop: (item: { name: string }) => onDrop(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, padding: '8px', margin: '4px', backgroundColor: isOver ? 'lightgreen' : 'lightgrey', cursor: 'move' }}>
      {name}
    </div>
  );
};

export default BucketSelector;
