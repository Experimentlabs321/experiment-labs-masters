import React from "react";

const tagsData = [
  // 'Previous Class Homework',
  "Pre-Class Reading Material",
  "Class Material",
  "Post Class Homework",
  "Exercises",
];

const ContentStage = ({ contentStage, setContentStage }) => {
  const toggleTag = (tag) => {
    if (contentStage?.includes(tag)) {
      setContentStage(
        contentStage?.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setContentStage([...contentStage, tag]);
    }
  };

  return (
    <div className="">
      <div className="flex items-center gap-4 mb-4">
        <p className="h-2 w-2 bg-black rounded-full"></p>
        <p className="font-bold text-lg me-[36px]">Content Stage</p>
      </div>
      {/* <h2 className="text-lg font-semibold mb-4">Content Stage</h2> */}
      <div className="flex flex-row gap-5 flex-wrap items-center">
        {tagsData?.map((tag) => (
          <div
            key={tag}
            className={`flex items-center justify-between py-2 px-4 rounded-full cursor-pointer ${
              contentStage?.includes(tag)
                ? "bg-green text-white"
                : "bg-gray-200 text-gray-600 hover:bg-blue-100"
            }`}
            onClick={() => toggleTag(tag)}
          >
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentStage;
