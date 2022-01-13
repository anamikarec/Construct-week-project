import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  removeTodo,
  toggleTodo
} from "../redux/app/action";
import { getTodos } from "./api";

function TodoItem({ img_url, date, attendees, event_name, event_place }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "1rem",
          width: "50%",
          borderTop: "1px solid grey"
        }}
      >
        <div>
          <img
            src={img_url}
            alt="img"
            height="100"
            width="150"
            style={{
              borderRadius: "10px",
              marginTop: "10px",
              marginRight: "10px"
            }}
          />
        </div>
        <div style={{ textAlign: "left" }}>
          <h3>{date}</h3>
          <p>{event_name}</p>
          <p>{event_place}</p>
          <p>{attendees} attendees</p>
        </div>
      </div>
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     padding: "1rem",
    //     gap: "2rem",
    //     border: "1px solid gray",
    //     borderRadius: "20px",
    //     background: "green",
    //     margin: "20px"
    //   }}
    // >
    // <div
    //   style={{
    //     background: "black",
    //     padding: "10px",
    //     fontSize: "17px",
    //     color: "white",
    //     border: "2px solid blue",
    //     borderRadius: "10px",
    //     margin: "10px"
    //   }}
    // >
    // {event_name}
    //   </div>
    //   <div
    //     style={{
    //       background: "black",
    //       padding: "10px",
    //       fontSize: "17px",
    //       color: "white",
    //       border: "2px solid blue",
    //       borderRadius: "10px",
    //       margin: "10px"
    //     }}
    //   >
    //     {event_place}
    //   </div>
    // </div>
  );
}

function TodoList() {
  const { todos, isLoading, isError } = useSelector(
    (state) => state.app,
    shallowEqual
  );

  const dispatch = useDispatch();

  // console.log(count)

  useEffect(() => {
    // getTodos(dispatch);
    dispatch(getTodos());
  }, []);

  const handleDelete = (id) => {
    const action = removeTodo(id);
    dispatch(action);
  };

  const handleToggle = (id) => {
    const action = toggleTodo(id);
    dispatch(action);
  };
  return (
    <div style={{ width: "60%", margin: "auto" }}>
      {isLoading && <h3>Loading...</h3>}
      {isError && <h3> Something went wrong!</h3>}
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;
