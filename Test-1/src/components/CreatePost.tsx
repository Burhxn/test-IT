import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostFormInputs } from "../types/post";
import { schema } from "../utils/validation";
import { useNavigate } from "react-router-dom";

type Props = {
  onPostCreated: () => void;
};

const API = "http://localhost:3000/posts";

const CreatePost: React.FC<Props> = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: PostFormInputs) => {
    try {
      await axios.post(API, data);
      reset();
      // onPostCreated()
      navigate("/");
    } catch (err) {
      console.error("Error creating post", err);
    }
  };

  return (
    <div className="p-4">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <div>
          <input
            placeholder="Title"
            {...register("title")}
            className="w-50vw px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
        </div>

        <div>
          <input
            placeholder="Views"
            type="number"
            {...register("views")}
            className="w-50vw px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1">{errors.views?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-black px-6 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
