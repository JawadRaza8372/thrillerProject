import React from "react";
import "./List.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ListSkeleton = () => {
  return (
    <SkeletonTheme color="black" highlightColor="gray">
      <div>
        <div className="h6">
          <Skeleton duration={1.2} />
        </div>
        <ul className="listULs">
          {Array(7)
            .fill()
            .map((item, index) => {
              return (
                <li key={index}>
                  <Skeleton duration={1.2} />
                </li>
              );
            })}
        </ul>
      </div>
    </SkeletonTheme>
  );
};

export default ListSkeleton;
