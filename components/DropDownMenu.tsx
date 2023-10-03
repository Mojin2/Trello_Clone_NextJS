import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  Bars3Icon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import {
  columnsState,
  editIndexState,
  editModalState,
  editState,
  IToDoState,
} from "@/app/atom";

interface Props {
  id: string;
  index: number;
  inputRef: React.RefObject<HTMLInputElement>;
}
export default function DropDownMenu({ id, index, inputRef }: Props) {
  const [recoilColumnsArray, setColumnsArray] = useRecoilState(columnsState);
  const [ColumnsArray, setClientColumnsArray] = useState<IToDoState>({});
  const [isEdit, setIsEdit] = useRecoilState(editState);
  const [editIndex, setEditIndex] = useRecoilState(editIndexState);
  const [isEditOpen, setEditIsOpen] = useRecoilState(editModalState);

  const handleEdit = () => {
    setIsEdit(true);
    setEditIndex(index);
    setEditIsOpen(true);
  };
  const handleClear = () => {
    setColumnsArray((oldTodos) => {
      const todoCopy: string[] = [];
      return { ...oldTodos, [id]: todoCopy };
    });
  };
  const handleDelete = () => {};
  return (
    <div className="flex mt-1">
      <Menu as="div" className="w-full relative">
        <div>
          <Menu.Button className="rounded-md text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex">
              <Bars3Icon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleEdit}
                    className={`${
                      active ? "bg-slate-200" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <PencilSquareIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <PencilSquareIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Edit Title
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleClear}
                    className={`${
                      active ? "bg-slate-200" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ArrowPathIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowPathIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Clear
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleDelete}
                    className={`${
                      active ? "bg-slate-200" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <TrashIcon
                        className="mr-2 h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <TrashIcon
                        className="mr-2 h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
