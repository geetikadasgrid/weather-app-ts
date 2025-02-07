// import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonLoaderProps {
  imageHeight?: number;
  imageWidth?: number;
  textLines?: number;
  textWidth?: string | number;
  animate?: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  textLines = 3,
  textWidth = "100%",
  animate = true,
}) => {
  return (
    <SkeletonTheme
      baseColor="#e0e0e0"
      highlightColor="#f5f5f5"
      enableAnimation={animate}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-full">
          {Array.from({ length: textLines }).map((_, idx) => (
            <Skeleton
              key={idx}
              height={"150px"}
              width={textWidth}
              style={{ marginBottom: "8px" }}
            />
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;
