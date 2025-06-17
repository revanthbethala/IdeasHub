import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { DeleteIdea, GetIdeaById } from "../services/IdeaServices";
import Loading from "../components/Loading"; // assuming you have this
import { capitalizeWords } from "../helpers/capitalizeWords";
import { toast } from "react-toastify";

function Idea() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["idea", id],
    queryFn: () => GetIdeaById(id as string),
    enabled: !!id,
  });
  const idea = data?.data;
  const handleDelete = async () => {
    try {
      const res = await DeleteIdea(id as string);
      console.log(res);
      toast.success("Idea deleted Successfully");
      navigate("/ideas");
    } catch (err) {
      console.log(err);
      toast.error("Error occurred! Idea not deleted");
    }
  };
  if (isLoading) return <Loading />;
  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error.message || "Unknown error occurred"}
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="text-center mt-10 text-gray-500 font-medium">
        No idea found for the given ID.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">
        {capitalizeWords(idea.title)}
      </h1>
      <p className="text-gray-700 mb-6">{idea.description}</p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Tech Stack:
        </h3>
        <div className="flex flex-wrap gap-2">
          {idea.techStack.map((tech: string, index: number) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-sm text-gray-500">Status:</p>
          <p className="font-medium capitalize">{idea.status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Votes:</p>
          <p className="font-medium">{idea.Votes ?? "0"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Requested By:</p>
          <p className="font-medium">{idea.requestedBy}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Created At:</p>
          <p className="font-medium">
            {new Date(idea.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Updated:</p>
          <p className="font-medium">
            {new Date(idea.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-5 justify-center ">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white text-sm font-medium p-2 rounded-lg"
        >
          Delete Idea
        </button>
        <NavLink
          to={`/ideas/${id}/update`}
          className="bg-blue-600 text-white text-sm font-medium text-center p-2 rounded-lg"
        >
          Update Idea
        </NavLink>
      </div>
    </div>
  );
}

export default Idea;
