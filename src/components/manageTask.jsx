import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import axios from "axios";

function ManageTask({data}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [loading, setLoading] = useState(false);
  const [savedTask, setSavedTask] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post("http://localhost:5000/register", {
				title,
				description,
				priority,

			});

			const result = response.data;
			console.warn(result);

			if (result) {
				alert("Data saved successfully");
				setTitle("");
				setDescription("");
				setPriority("");
			}
		} catch (error) {
			console.error("Error saving data:", error);
			alert("Failed to save data. Please try again.");
		} finally {
			setLoading(false);
		}

    };

    const handleShowAll = async(e) =>{
      e.preventDefault();
      try{
        const response = await axios.get("http://localhost:5000/register")
        setSavedTask(response.data.allTasks)
      }catch (error){
        alert("Data not retrieved")
      }
    }

	return (
		<>
    <div className="text-3xl text-gray-900 dark:text-white">{data}</div>

			<form className = "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div>
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
				<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					id="title"
					required
				/>
</div>
<div>
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
				<textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
</div>
<div>
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
							{priority ? `Priority: ${priority}` : "Select priority"}
							<ChevronDownIcon
								aria-hidden="true"
								className="-mr-1 h-5 w-5 text-gray-400"
							/>
						</MenuButton>
						<MenuItems 
							transition
							className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
						>
							<div className="py-1">
								<MenuItem onClick={() => setPriority("High")}>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
									>
										High
									</a>
								</MenuItem>
								<MenuItem onClick={() => setPriority("Medium")}>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
									>
										Medium
									</a>
								</MenuItem>
								<MenuItem onClick={() => setPriority("Low")}>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
									>
										Low
									</a>
								</MenuItem>
							</div>
						</MenuItems>
					</div>
				</Menu>
</div>
<div>
				<button type="submit" disabled={loading || !title || !description || !priority}>
					{loading ? "Saving..." : "Add Task"}
				</button>
        </div>
			</form>
      <button type="button" onClick={handleShowAll}>showAllTasks</button>
      <div  className="inline-flex w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
         <ul>
          {savedTask.map((task, index) => (
            <li key={index}>{task.title}</li>
          ))}
        </ul>
      </div>

		</>
	);
}

export default ManageTask;
