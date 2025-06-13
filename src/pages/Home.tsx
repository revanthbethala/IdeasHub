import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetAllIdeas } from "../services/IdeaServices";
import { ideaType } from "../types"; // adjust the path
import { formatDistanceToNow } from "date-fns";

export default function LandingPage() {
  return (
    <>
      {" "}
      <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-white to-slate-100 text-gray-800">
        <div className="grid md:grid-cols-2 gap-10 items-center relative justify-between">
          {/* Left Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-sm">
              Go-Ideas: Share & Discover Amazing Project Ideas 💡
            </h1>
            <div className="max-w-fit">
              <p className="text-base text-gray-600 ">
                Post your next big project idea or explore others' innovative
                concepts. Vote, collaborate, and bring your ideas to life on a
                professional, clean platform built for devs.
              </p>
            </div>
            <div className="flex gap-6 mt-5">
              <NavLink to="/ideas">
                <button className="flex gap-2 mt-3 bg-blue-700 text-white px-3 py-2 rounded-full cursor-pointer">
                  Browse Ideas <ArrowRight />
                </button>
              </NavLink>
              <NavLink to="/postIdea">
                <button className="flex gap-2 mt-3 border-2 border-gray-900 font-semibold text-slate-900 px-3 py-2 rounded-full cursor-pointer">
                  Post Your Thoughts <ArrowUpRight />
                </button>
              </NavLink>
            </div>
          </motion.div>

          {/* Right Code Block Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="relative lg:block hidden"
          >
            {/* Floating Info Block */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 160 }}
              className="absolute -left-16 -top-4 w-3/4 z-10 bg-slate-300/60 bg-opacity-90 border border-gray-300 backdrop-blur-md shadow-lg rounded-xl p-4"
            >
              <h3 className="text-lg font-bold text-indigo-700 mb-2">
                GO IDEAS
              </h3>
              <p className="text-sm text-slate-900 leading-relaxed">
                Go-Ideas is a collaborative hub where developers and tech
                enthusiasts can share their startup or side-project ideas,
                discover innovative concepts, and get inspired. Built using MERN
                stack, it features clean UI, voting, and detailed tagging for
                easy idea exploration.
              </p>
            </motion.div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-5 rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden mt-14">
              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <pre className="text-sm font-mono text-green-200 whitespace-pre-wrap leading-relaxed">
                {`// Express.js - Post an idea
app.post('/api/ideas', async (req, res) => {
  const { title, description, techStack, tags } = req.body;
  try {
    const newIdea = await Idea.create({ title, description, techStack, tags });
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post idea' });
  }
});

// React - Fetch ideas
const getIdeas = async () => {
  const response = await fetch('/api/ideas');
  return response.json();
};`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
      <Cards />
    </>
  );
}

function Cards() {
  const {
    data: ideas = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ideas"],
    queryFn: GetAllIdeas,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center">Failed to load ideas.</div>
    );

  const latestIdeas = [...ideas]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 8);

  const mostVotedIdeas = [...ideas]
    .sort((a, b) => (b.Votes || 0) - (a.Votes || 0))
    .slice(0, 8);

  const renderCard = (idea: ideaType) => (
    <div
      key={idea.id}
      className="min-w-[300px] max-w-[300px] bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mr-4 hover:shadow-2xl hover:scale-[1.02] transition duration-300 ease-in-out"
    >
      <h2 className="text-xl font-bold text-indigo-700 capitalize mb-2 font-lato">
        {idea.title}
      </h2>
      <p className="text-gray-600 text-sm line-clamp-3 mb-3">
        {idea.description.slice(0,60)}...
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {idea.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* <p className="text-sm font-noto font-medium">Built With:</p> */}
        {idea.techStack.map((tech, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className="font-medium">👍 Votes: {idea.Votes || 0}</span>
      </div>
      <p className="text-right text-xs text-gray-400 mt-3 italic">
        {formatDistanceToNow(new Date(idea.updatedAt))} ago
      </p>
      <button className="bg-indigo-700 rounded-lg text-white text-sm mt-3 px-2 py-1">
        <NavLink to={`ideas/${idea.id}`}>View Info</NavLink>
      </button>
    </div>
  );

  return (
    <div className="px-6 py-10 space-y-14 bg-gray-50 min-h-screen">
      <section>
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 font-lato">
          🚀 Latest Ideas
        </h2>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-2">
          {latestIdeas.map(renderCard)}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 font-lato">
          🔥 Most Voted Ideas
        </h2>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-2">
          {mostVotedIdeas.map(renderCard)}
        </div>
      </section>
    </div>
  );
}
