import { useMutation } from "@tanstack/react-query";
import React, { useState, type ChangeEvent } from "react";
import { supabase } from "../supabase-client";

interface PostInput {
  title: string;
  content: string;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);

  if (uploadError) {
    throw new Error(uploadError.message);

    return;
  }

  const { data: publicURLData } = supabase.storage
    .from("posts")
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicURLData.publicUrl });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;
    mutate({ post: { title, content }, imageFile: selectedFile });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-white/10 bg-transparent p-2 rounded "
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          className="w-full border border-white/10 bg-transparent p-2 rounded "
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Upload Image</label>
        <div className="flex gap-5">
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            required
            className=" h-8 px-2 rounded text-gray-200 bg-slate-500"
          />
          {selectedFile && (
            <img
              className="w-30 h-30 rounded"
              src={URL.createObjectURL(selectedFile)}
              alt="Selected file preview"
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
      >
       {isPending? "Creating..": "Create Post"}
      </button>

      {isError && <p className="text-red-500">Erorr Creating Post...</p>}
    </form>
  );
}
