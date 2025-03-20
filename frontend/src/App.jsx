import { useEffect, useState } from "react";
function App() {

  const [x, setX] = useState(() => {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  });
  const [y, setY] = useState("");


  useEffect(() => {

    localStorage.setItem("todos", JSON.stringify(x));

  }, [x]);

  function inputValue(event) {
    setY(event.target.value);
  }

  function add() {
    setX(prev => ([...prev, { text: y, display: false }]));
    setY("");
  }

  function strikeThrough(index) {
    setX(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, display: !item.display } : item
      )
    );
  }

  function removeTodo(index) {
    setX(prev =>
      prev.filter((item, ind) =>
        (ind !== index)
      )
    );
  }

  return (

    <div class="flex h-screen items-center justify-center bg-gray-100">
      <div class="w-[80%] max-w-[600px] h-[70vh] rounded-lg p-5  flex flex-col">

        <span class="text-[42px] font-[500]">TODO</span>

        <div class="mb-[34px] flex h-[60px] w-full items-center justify-between bg-[#e4e5f1] px-[18px]">
          <input class="w-full border-none bg-transparent outline-none" type="text" placeholder="Create a new todo..." onChange={inputValue} value={y} />
          <button class="h-[40px] w-[80px] rounded-full bg-[#3a7bfd] px-[5px] font-[700] text-[#fafafa] transition-transform active:scale-95" onClick={add}>Add</button>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar">
          {x.map((item, index) => (
            <div class="flex w-[100%] justify-between p-[12px]">
              <div class="flex items-center gap-[20px]" onClick={() => strikeThrough(index)}>
                <div class="h-[30px] w-[30px] rounded-full border border-[#d2d3db] flex items-center justify-center">
                  {item.display && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 text-[#3a7bfd]">
                      <path fill-rule="evenodd" d="M4.5 12l4.5 4.5L19.5 6" clip-rule="evenodd" />
                    </svg>
                  )}
                </div>
                <span class={`text-[18px] font-[400] ${item.display ? "line-through text-gray-400" : ""}`}>{item.text}</span>
              </div>

              <svg onClick={() => removeTodo(index)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
              </svg>

            </div>
          ))}
        </div>

      </div>
    </div>

  );
}

export default App;





