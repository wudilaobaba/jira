import { User } from "types/user";
import { Table } from "antd";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  console.log(users);
  return (
    <Table
      pagination={false}
      dataSource={list}
      columns={[
        {
          key: "name",
          title: "名称",
          dataIndex: "name", //对应 list 中的name字段
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          key: "3",
          title: "负责人",
          // 01. render的第一个参数与dataIndex遥相呼应！！！！！！
          // dataIndex: 'organization',
          // render:(value, project)=><span>{value}</span>
          // 02. 如果没有dataIndex，那么value就是list中的每一条数据
          render: (value) => (
            <span key={value.id}>
              {users.find((item) => item.id === value.personId)?.name || "未知"}
            </span>
          ),
        },
      ]}
    />
  );
};
