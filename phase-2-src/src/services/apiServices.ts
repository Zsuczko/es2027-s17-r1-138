import type { Course } from "../data/model";

const toDateOnly = (dateString: string) => {
  const d = new Date(dateString);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

const hasDateOverlap = (a: Course, b: Course) => {
  const startA = toDateOnly(a.startDate);
  const endA = toDateOnly(a.endDate);
  const startB = toDateOnly(b.startDate);
  const endB = toDateOnly(b.endDate);

  return startA <= endB && endA >= startB;
};

const isInMarch = (course: Course): boolean => {
  const start = new Date(course.startDate);
  const end = new Date(course.endDate);

  const isStartInMarch = start.getMonth() === 2;
  const isEndInMarch = end.getMonth() === 2;

  return isStartInMarch && isEndInMarch;
};

export async function GetJsonInfo(): Promise<Course[][]> {
  const res = await fetch("/assets/courses.json");
  const items: Course[] = await res.json();

  const courses: Course[][] = [];

  items.forEach((course) => {
    if (isInMarch(course)) {
      let placed = false;

      for (const group of courses) {
        const overlaps = group.some((existing) =>
          hasDateOverlap(existing, course),
        );

        if (!overlaps) {
          group.push(course);
          placed = true;
          break;
        }
      }

      if (!placed) {
        courses.push([course]);
      }
    }
  });

  console.log(courses);
  return courses;
}
