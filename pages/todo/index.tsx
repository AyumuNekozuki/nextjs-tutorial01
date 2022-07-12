import TodoList from "../../components/todoList"
import type { Todo } from "../../types/todolist"
import TodoForm from "../../components/todoForm"
import React, { useState } from "react"

type Props = {
  todolists: Array<Todo>
}

export default function Index({ todolists }: Props) {
  const [todos, settodo] = useState(todolists);

  const handle_add = async (event: any) =>{
    event.preventDefault();
    const data = {
      id: todos.length + 1,
      createdAt: "2022-02-02",
      title: event.target.todotitle.value,
      body: "テストテスト",
      tag: "特になし"
    };

    settodo([...todos, data]);
    console.log(todolists)
    event.target.todotitle.value = '';
  }

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <TodoForm handleadd={handle_add} />
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Todo</h1>
          </div>
          <div className="flex flex-wrap -m-2">
            {todos.map(todolist => (
              <TodoList todolist={todolist}></TodoList>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps = async () => {
  // const url = 'http://localhost:3000/todo.json'
  const url = process.env.JSON_FILE
  console.log(url)
  const req = await fetch(url);
  const json = await req.json();

  return {
    props: {
      todolists: json
    }
  }
}