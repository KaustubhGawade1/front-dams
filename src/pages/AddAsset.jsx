import React, { useState } from "react";
import axios from "axios";

const AddAsset = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
const authData = JSON.parse(localStorage.getItem("auth"));
const token = authData?.jwtToken;

// If your jwtToken includes cookie attributes, clean it if needed:
let pureToken = token;
if (token?.includes("=")) {
  // For example: springBootDAMS=actualtoken; Path=/api;...
  pureToken = token.split("=")[1].split(";")[0];
}
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");

      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/api/asset/add/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization header if your endpoint is protected
           Authorization: `Bearer ${pureToken}`,

          },
        }
      );

      console.log("Upload response:", response.data);
      setMessage("Asset uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Failed to upload asset.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Asset</h1>

      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          {uploading ? "Uploading..." : "Upload Asset"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AddAsset;
