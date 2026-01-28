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
        <section className="grid grid-cols-31 auto-rows-auto w-[200em]">
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
              const startDate = new Date(course.startDate).getDate();
              const endDate = new Date(course.endDate).getDate();

              return (
                <div
                  style={{
                    gridRowStart: groupIndex + 2,
                    gridColumnStart: startDate,
                    gridColumnEnd: endDate + 1,
                  }}
                  className="border-2 border-amber-500 p-2"
                >
                  {course.courseName}
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
