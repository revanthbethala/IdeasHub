import { GetAllIdeas } from "../services/IdeaServices";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { Filter, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ideaType } from "../types";
import { NavLink } from "react-router-dom";
import { capitalizeWords } from "../helpers/capitalizeWords";

function Ideas() {
  const {
    data: ideas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ideas"],
    queryFn: GetAllIdeas,
  });
  const data = ideas?.data;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  if (isLoading) return <Loading />;
  if (!data)
    return (
      <div className="text-gray-600 font-medium mt-10 text-center">
        No ideas exists
      </div>
    );
  if (error)
    return (
      <div className="text-red-600 font-medium text-center mt-10">
        {error?.message}
      </div>
    );

  const uniqueTags: string[] = Array.from(
    new Set(data.flatMap((idea: ideaType) => idea.tags))
  );
  const uniqueTech: string[] = Array.from(
    new Set(data.flatMap((idea: { techStack: string[] }) => idea.techStack))
  );

  const filteredIdeas = data.filter((idea: ideaType) => {
    const matchesSearch = idea.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? idea.tags.includes(selectedTag) : true;
    const matchesTech = selectedTech
      ? idea.techStack.includes(selectedTech)
      : true;
    return matchesSearch && matchesTag && matchesTech;
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4 font-noto uppercase tracking-wide my-4 text-center">
        Community Ideas
      </h1>
      <div className="flex flex-wrap gap-4 rounded-full  px-3 my-3 justify-between">
        <div className="bg-gray-100 rounded-full flex gap-1 items-center px-3 border-gray-600 border ">
          <Search className="w-5 h-5" />
          <input
            type="search"
            placeholder="Search for Ideas"
            className="p-2 rounded-full focus:outline-none focus:border-none bg-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
            <Filter />
            <select
              className="bg-slate-100 outline-none"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">All Tags</option>
              {uniqueTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
            <Filter />
            <select
              className="bg-slate-100 outline-none"
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
            >
              <option value="">All Tech</option>
              {uniqueTech.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((idea: ideaType) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut" }}
              key={idea.id}
              className="bg-gray-50 rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 font-lato text-slate-800">
                {capitalizeWords(idea.title)}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{idea.description}</p>

              <div className="mb-2">
                <p className="text-sm font-medium text-slate-600 mb-1">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {tag[0].toUpperCase() + tag.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Tech Stack:
                </p>
                <div className="flex flex-wrap gap-2">
                  {idea.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {tech[0].toUpperCase() + tech.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
                <NavLink
                  to={`/ideas/${idea?.id}`}
                  className=" bg-blue-700 p-2 rounded-lg text-white"
                >
                  Details
                </NavLink>
                <p>
                  <span className="font-medium text-blue-800 bg-blue-200 text-sm rounded-lg p-1">
                    {idea?.status[0].toUpperCase() + idea?.status.slice(1)}
                  </span>
                </p>
              </div>
              <div className="mt-4"></div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 py-6 text-center text-lg font-medium col-span-full ">
            No ideas found.
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Ideas;
