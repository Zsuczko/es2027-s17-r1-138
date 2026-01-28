import { useEffect, useRef, useState } from "react";
import { GetJsonInfo } from "./services/apiServices";
import { type Currencies, type Course } from "./data/model";
import Tooltip from "./components/Tooltip";

function App() {
  const [courses, setCourses] = useState<Course[][]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tableSize, setTableSize] = useState<number>(300);
  const [currency, setCurrency] = useState<string>("EUR");
  const [currncyDivide, setCurrencyDivide] = useState<number>(1);
  const [currencyDividers, setCurrencyDividers] = useState<Currencies>({
    EUR: 1,
    HUF: 0.00261,
    CNY: 0.12,
  });

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const goFullScreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen();
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const vami = await GetJsonInfo();
      setCourses(vami);

      await fetch("/assets/currencies.json")
        .then((res) => res.json())
        .then((data) => {
          setCurrencyDividers(data);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currency === "EUR") {
      setCurrencyDivide(currencyDividers.EUR);
    } else if (currency === "HUF") {
      setCurrencyDivide(currencyDividers.HUF);
    } else if (currency === "CNY") {
      setCurrencyDivide(currencyDividers.CNY);
    }
  }, [currencyDividers, currency]);

  return (
    <>
      <header className="flex justify-center">
        <img src="/assets/logo.svg" alt="" className="w-[20em] h-[5em]" />
      </header>
      <main>
        <section className="flex justify-between p-2 bg-gray-100">
          <div className="flex gap-3">
            <h1 className="font-bold text-2xl">2026. March</h1>
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type="text"
              name=""
              id=""
              className="border-2 border-gray-200 rounded-sm w-sm bg-white"
              placeholder="🔍Search..."
            />
          </div>
          <div className="flex gap-4">
            <select
              className="border-2 border-gray-200 p-1"
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            >
              <option value="EUR">💰EUR</option>
              <option value="HUF">💰HUF</option>
              <option value="CNY">💰CNY</option>
            </select>

            <button
              className="border-2 border-gray-200 p-1 bg-gray-100 rounded-md"
              onClick={() => {
                goFullScreen();
              }}
            >
              🔝Full screen
            </button>
            <button className="border-2 border-gray-200 p-1 bg-gray-100 rounded-md">
              📂Export
            </button>
            <button
              className="border-2 border-gray-200 p-1 bg-gray-100 rounded-md"
              onClick={() => {
                if (tableSize > 200) setTableSize((prev) => prev - 10);
              }}
            >
              ➖
            </button>
            <button
              className="border-2 border-gray-200 p-1 bg-gray-100 rounded-md"
              onClick={() => {
                if (tableSize < 350) setTableSize((prev) => prev + 10);
              }}
            >
              ➕
            </button>
          </div>
        </section>

        <div className="w-full overflow-x-auto chart relative" ref={scrollRef}>
          <button
            className="fixed top-[50%] border-2 border-gray-100 p-1 text-2xl left-5 bg-gray-50 z-50"
            onClick={() => scroll("left")}
          >
            ⬅️
          </button>
          <button
            className="fixed top-[50%] border-2 border-gray-100 p-1 text-2xl right-5 bg-gray-50 z-50"
            onClick={() => scroll("right")}
          >
            ➡️
          </button>
          <section
            className="grid grid-cols-31 auto-rows-auto text-sm"
            style={{
              width: `${tableSize}em`,
            }}
          >
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`row-start-1 text-center border border-gray-300 ${days[i % 7] === "SAT" || days[i % 7] === "SUN" ? "text-red-700" : ""}`}
              >
                <p>{i + 1}</p>
                <p>{days[i % 7]}</p>
              </div>
            ))}
            {courses.map((group, groupIndex) =>
              group.map((course) => {
                if (
                  searchTerm !== "" &&
                  !course.courseNameEnglish
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                  return <></>;
                const startDate = new Date(course.startDate);
                const endDate = new Date(course.endDate);
                return (
                  <div
                    className="p-1"
                    style={{
                      gridRowStart: groupIndex + 2,
                      gridColumnStart: startDate.getDate(),
                      gridColumnEnd: endDate.getDate() + 1,
                    }}
                  >
                    <div
                      className={`h-full border-2 border-gray-200 p-2 truncate w-full border-l-4 rounded-lg ${course.category === "Technology & Software" ? "border-l-green-700" : "border-l-amber-500"}`}
                    >
                      <p className="text-blue-500 p-2 bg-gray-100 w-fit rounded-3xl">
                        {startDate.getHours()}:
                        {String(startDate.getMinutes()).padStart(2, "0")}-
                        {endDate.getHours()}:
                        {String(endDate.getMinutes()).padStart(2, "0")}
                      </p>
                      <p className="turncate w-full">
                        {/* <span>{course.language === "English" ? "us" : ""}</span> */}
                        <Tooltip text={course.courseName}>
                          <span className="z-0">{course.courseName}</span>
                        </Tooltip>
                      </p>
                      {course.language === "English" ? (
                        <></>
                      ) : (
                        <p className="text-gray-400">
                          {course.courseNameEnglish}
                        </p>
                      )}
                      <p className="flex items-center gap-1">
                        <span>
                          {course.difficulty === "Beginner"
                            ? "🔴"
                            : course.difficulty === "Intermediate"
                              ? "🟡"
                              : "🟢"}
                          {course.difficulty}
                        </span>
                        <span className="inline-block w-1 h-1 bg-black rounded-full"></span>
                        <span className="font-bold">
                          {Math.round(
                            course.price / currncyDivide,
                          ).toLocaleString()}{" "}
                          {currency}
                        </span>
                      </p>
                      <p>👤 {course.instructor}</p>
                    </div>
                  </div>
                );
              }),
            )}
          </section>
        </div>
      </main>
    </>
  );
}
export default App;
