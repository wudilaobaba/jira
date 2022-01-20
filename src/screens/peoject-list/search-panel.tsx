import { User } from "types/user";
import { Input, Select } from "antd";
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ setParam, param, users }: SearchPanelProps) => {
  return (
    <>
      <Input
        type="text"
        value={param.name}
        onChange={(evt) =>
          setParam({
            ...param,
            name: evt.target.value,
          })
        }
      />
      <Select
        value={param.personId}
        onChange={(personId) =>
          setParam({
            ...param,
            personId,
          })
        }
      >
        <Select.Option value="">负责人</Select.Option>
        {users.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
