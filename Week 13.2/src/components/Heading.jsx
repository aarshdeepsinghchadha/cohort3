import { WebIcon } from "../icons/WebIcon";

export const Heading = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-10">
      <WebIcon />
      <h1 className="text-5xl font-bold text-white">
        <span className="text-blue-600 px-2 rounded">Webinar</span>.gg
      </h1>
    </div>
  );
};
