import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount } from "../../utils";
import { useDebounce } from "../../utils";
import qs from "qs";
import { Test } from "./Test";
import { useHttp } from "utils/http";
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 200);
  const client = useHttp();
  useMount(async () => {
    const users = await client("users");
    setUsers(users);
  });

  useEffect(() => {
    (async () => {
      const data = await client("projects", {
        data: cleanObject(debounceParam),
      });
      setList(data);
    })();
  }, [debounceParam]);

  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
      <Test />
    </>
  );
};
