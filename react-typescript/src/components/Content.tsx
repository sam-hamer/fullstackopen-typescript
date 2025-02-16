import { JSX } from "react";
import { CoursePart } from "../App";
import Part from "./Part";
const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <div>
      {courseParts.map((part) => (
        <>
          <Part key={part.name} part={part} />
          <br />
        </>
      ))}
    </div>
  );
};

export default Content;
