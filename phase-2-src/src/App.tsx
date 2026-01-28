import { useEffect, useState } from "react";
import { GetJsonInfo } from "./services/apiServices";
import type { Course } from "./data/model";

function App() {
  const [courses, setCourses] = useState<Course[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const vami = await GetJsonInfo();
      setCourses(vami);
    };

    fetchData();
  }, []);
  return (
    <>
      <header className="flex justify-center">
        <img src="/assets/logo.svg" alt="" className="w-[20em] h-[5em]" />
      </header>
      <main>
        <section className="grid grid-cols-31 auto-rows-auto w-[250em] gap-2">
          {[...Array(31)].map((_, i) => (
            <p
              key={i}
              className="row-start-1 text-center py-3 border border-gray-300"
            >
              {i + 1}
            </p>
          ))}

          {courses.map((group, groupIndex) =>
            group.map((course) => {
              const startDate = new Date(course.startDate);
              const endDate = new Date(course.endDate);

              return (
                <div
                  style={{
                    gridRowStart: groupIndex + 2,
                    gridColumnStart: startDate.getDate(),
                    gridColumnEnd: endDate.getDate() + 1,
                  }}
                  className="border-2 border-amber-500 p-2 truncate w-full"
                >
                  <p className="text-blue-500 p-2 bg-gray-100 w-fit rounded-3xl">
                    {startDate.getHours()}:
                    {String(startDate.getMinutes()).padStart(2, "0")}-
                    {endDate.getHours()}:
                    {String(endDate.getMinutes()).padStart(2, "0")}
                  </p>
                  <p className="turncate w-full">
                    {/* <span>{course.language === "English" ? "us" : ""}</span> */}
                    <span>{course.courseName}</span>
                  </p>
                  <p>
                    <span>
                      {course.difficulty === "Beginner"
                        ? "🔴"
                        : course.difficulty === "Intermediate"
                          ? "🟡"
                          : "🟢"}
                      {course.difficulty}
                    </span>
                    -<span className="font-bold">{course.price} EUR</span>
                  </p>
                </div>
              );
            }),
          )}
        </section>
      </main>
    </>
  );
}

export default App;
