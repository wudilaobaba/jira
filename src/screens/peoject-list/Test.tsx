import { useArray } from "../../utils";

export const Test = () => {
  const arr: { name: string; age: number; id: number }[] = [
    { name: "Mike", age: 23, id: 1 },
    { name: "Tom", age: 12, id: 2 },
  ];
  const { value, clear, add, removeIndex } = useArray(arr);

  return (
    <div>
      <br />
      <br />
      <button onClick={() => add({ name: "whj", age: 23, id: Date.now() })}>
        add
      </button>
      <button onClick={() => clear()}>clear</button>
      <button onClick={() => removeIndex(0)}>remove(0</button>
      {value.map((item) => (
        <div key={item.id}>{`${item.name} --- ${item.age}`}</div>
      ))}
    </div>
  );
};
