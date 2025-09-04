import { type FC } from "react";

const Loader: FC = () => {
  return (
    <div className="flex items-center justify-center w-full py-4">
      <span className="flex space-x-2">
        <span
          className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"
          style={{ animationDelay: "50ms" }}
        />
        <span
          className="w-3 h-3 bg-amber-600 rounded-full animate-bounce"
          style={{ animationDelay: "100ms" }}
        />
      </span>
    </div>
  );
};

export default Loader;
