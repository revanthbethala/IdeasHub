import { useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { PostUserIdea } from "../services/IdeaServices";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useIdeaStore } from "../store/IdeaStore";

type FormErrors = {
  title?: string;
  description?: string;
  techStack?: string;
  tags?: string;
};

function PostIdea() {
  const {
    formData,
    setFormField,
    resetForm,
    addTech,
    removeTech,
    addTag,
    removeTag,
  } = useIdeaStore();

  const [techInput, setTechInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormField(e.target.name as keyof typeof formData, e.target.value);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.techStack.length === 0)
      newErrors.techStack = "At least one tech is required";
    if (formData.tags.length === 0)
      newErrors.tags = "At least one tag is required";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setIsLoading(true);
        const res = await PostUserIdea(formData);
        console.log(res);
        toast.success("Idea Posted Successfully");
      } catch (err) {
        toast.error("Unknown error occurred! Please try again later");
      } finally {
        setIsLoading(false);
      }
      resetForm();
      setTechInput("");
      setTagInput("");
      setErrors({});
    }
  };

  const handleAddTech = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      addTech(techInput);
      setTechInput("");
    }
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput);
      setTagInput("");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 pt-10">
      <div className="w-full max-w-3xl bg-white p-6 md:p-10 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600 font-lato">
          Post Your Idea
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block mb-1 font-medium text-gray-700"
            >
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your project title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-1 font-medium text-gray-700"
            >
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full border border-gray-300 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe your project idea in detail"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Tech Stack and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tech Stack */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Tech Stack <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="ml-2 text-indigo-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Enter tech and press Enter"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.techStack && (
                <p className="text-red-500 text-sm mt-1">{errors.techStack}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Tags <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-yellow-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Enter tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition font-semibold"
          >
            {isLoading ? (
              <div className="flex gap-2 items-center justify-center">
                <Loader2 className="animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Post Idea"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostIdea;
