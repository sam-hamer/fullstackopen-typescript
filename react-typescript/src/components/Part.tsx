import { JSX } from "react";
import { CoursePart } from "../App";

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <div>
          {"Name: "}
          {part.name}
          <br />
          {"Exercises: "}
          {part.exerciseCount}
          <br />
          {"Description: "}
          {part.description}
        </div>
      );
    case "group":
      return (
        <div>
          {"Name: "}
          {part.name}
          <br />
          {"Exercises: "}
          {part.exerciseCount}
          <br />
          {"Group Projects: "}
          {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          {"Name: "}
          {part.name}
          <br />
          {"Exercises: "}
          {part.exerciseCount}
          <br />
          {"Description: "}
          {part.backgroundMaterial}
        </div>
      );
    case "special":
      return (
        <div>
          {"Name: "}
          {part.name}
          <br />
          {"Exercises: "}
          {part.exerciseCount}
          <br />
          {"Description: "}
          {part.description}
          <br />
          {"Requirements: "}
          {part.requirements.join(", ")}
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
