import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject} from "../../utils";
import qs from 'qs'
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: "", personId: ""
  })
  const [list, setList] = useState([])
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  },[])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        const result = await response.json()
        setList(result)
      }
    })
  }, [param])


  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam}/>
      <List list={list} users={users}/>
    </>
  )
}