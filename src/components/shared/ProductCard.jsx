import { useState } from "react";
import { FaEye } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import api from "../../api/api"; // adjust path as per your project
import toast from "react-hot-toast";

const ProductCard = ({
  asset_id,
  filename,
  contentType,
  size,
  filePath,
  uploadedAt,
  uploadedBy,
  onDelete, // optional prop to refresh parent asset list after delete
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState(null);

  const handleAssetView = () => {
    setSelectedViewProduct({
      asset_id,
      filename,
      contentType,
      size,
      filePath,
      uploadedAt,
      uploadedBy,
    });
    setOpenProductViewModal(true);
  };

  const handleDeleteAsset = async () => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await api.delete(`/asset/${asset_id}`);
        toast.success("Asset deleted successfully");

        // call onDelete prop to refresh list without full reload if provided
        if (onDelete) {
          onDelete(asset_id);
        } else {
          window.location.reload(); // fallback quick approach
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete asset");
      }
    }
  };

  const safeContentType = contentType || "";

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={handleAssetView}
        className="w-full overflow-hidden aspect-[3/2] bg-gray-100 flex items-center justify-center cursor-pointer"
      >
        {safeContentType.includes("image") ? (
          <img
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
            src={`${import.meta.env.VITE_BACK_END_URL}/${filePath}`}
            alt={filename}
          />
        ) : (
          <div className="text-gray-600 text-center">
            <FaEye size={48} />
            <p>Preview</p>
          </div>
        )}
      </div>

      <div className="p-4">
        <h2
          onClick={handleAssetView}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {truncateText(filename, 50)}
        </h2>

        <p className="text-gray-600 text-sm">Type: {safeContentType || "Unknown"}</p>
        <p className="text-gray-600 text-sm">Size: {(size / 1024).toFixed(2)} KB</p>
        <p className="text-gray-600 text-sm">Uploaded by: {uploadedBy?.username || "Unknown"}</p>
        <p className="text-gray-600 text-sm">
          Uploaded at: {uploadedAt ? new Date(uploadedAt).toLocaleString() : "N/A"}
        </p>

        <button
          onClick={() =>
            window.open(`${import.meta.env.VITE_BACK_END_URL}/${filePath}`, "_blank")
          }
          className="bg-blue-500 text-white py-2 px-3 rounded-lg mt-3 w-full hover:bg-blue-600 transition-colors duration-300"
        >
          View / Download
        </button>

        <button
          onClick={handleDeleteAsset}
          className="bg-red-500 text-white py-2 px-3 rounded-lg mt-2 w-full hover:bg-red-600 transition-colors duration-300"
        >
          Delete
        </button>
      </div>

      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
      />
    </div>
  );
};

export default ProductCard;
