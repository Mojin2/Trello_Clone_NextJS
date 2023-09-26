"use client";
import { useState, Fragment, FormEvent, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import {
  columnsState,
  IToDoState,
  modalState,
  newTaskState,
  newTaskTypeState,
} from "@/app/atom";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";

function Modal() {
  //   let [isOpen, setIsOpen] = useState(true);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [newTaskInput, setNewTaskInput] = useRecoilState(newTaskState);
  const [recoilColumnsArray, setColumnsArray] = useRecoilState(columnsState);
  const [ColumnsArray, setClientColumnsArray] = useState<IToDoState>({});
  const [newTaskType, setNewTaskType] = useRecoilState(newTaskTypeState);

  useEffect(() => {
    setClientColumnsArray(recoilColumnsArray);
  }, [recoilColumnsArray]);
  console.log(ColumnsArray);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    //  add task
    setColumnsArray((oldTodos) => {
      const todoCopy = [...oldTodos[newTaskType]];
      todoCopy.push(newTaskInput);
      return { ...oldTodos, [newTaskType]: todoCopy };
    });
    setIsOpen(false);
  };
  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transfrom overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Add a Task
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>

                {/* RadioGroup */}
                <TaskTypeRadioGroup />

                {/* Add button */}
                <div>
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
                {/* file input */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
