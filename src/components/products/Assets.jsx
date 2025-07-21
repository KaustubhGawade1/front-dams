import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAssets } from "../../store/actions"; // updated action
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";

const Assets = () => {
  const { isLoading, errorMessage } = useSelector(
    (state) => state.errors
  );
  const { assets} = useSelector(
    (state) => state.assets );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className="text-slate-800 text-lg font-medium">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {assets &&
              assets.map((item, i) => (
                <ProductCard asset_id={i} {...item} />
              ))}
          </div>
          <div className="flex justify-center pt-10">
            {/* <Paginations
              numberOfPage={pagination?.totalPages}
              totalAssets={pagination?.totalElements}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Assets;
