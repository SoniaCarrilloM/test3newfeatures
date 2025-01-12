import { SchoolActionKind, schoolReducer } from "./school-context";

describe("schoolReducer", () => {
  test("should assign an assignment to a student", () => {
    const initialState = {
      teachers: [],
      students: [{ id: "1", name: "Student One", assignments: [] }],
    };

    const state = schoolReducer(initialState, {
      type: SchoolActionKind.ASSIGN_ASSIGNMENT,
      payload: { studentId: "1", assignment: "Math Homework" },
    });

    expect(state.students[0].assignments).toBeDefined();
    expect(state.students[0].assignments?.length).toBe(1);
    expect(state.students[0].assignments?.[0].assignment).toBe("Math Homework");
  });

  test("should grade an assignment for a student", () => {
    const initialState = {
      teachers: [],
      students: [
        {
          id: "1",
          name: "Student One",
          assignments: [
            { assignment: "Math Homework", grade: "", date: "2023-10-01" },
          ],
        },
      ],
    };

    const state = schoolReducer(initialState, {
      type: SchoolActionKind.GRADE_ASSIGNMENT,
      payload: { studentId: "1", assignment: "Math Homework", grade: "Pass" },
    });

    expect(state.students[0].assignments).toBeDefined();
    expect(state.students[0].assignments?.length).toBe(1);
    expect(state.students[0].assignments?.[0].grade).toBe("Pass");
  });

  test("should generate a report for students", () => {
    const initialState = {
      teachers: [],
      students: [
        {
          id: "1",
          name: "Student One",
          assignments: [
            { assignment: "Math Homework", grade: "Pass", date: "2023-10-01" },
          ],
        },
        {
          id: "2",
          name: "Student Two",
          assignments: [
            {
              assignment: "Science Project",
              grade: "Fail",
              date: "2023-10-01",
            },
          ],
        },
      ],
    };

    const state = schoolReducer(initialState, {
      type: SchoolActionKind.GENERATE_REPORT,
      payload: { date: "2023-10-01" },
    });

    const report = state.students.map((student) => {
      const passed = student.assignments.some(
        (a) => a.date === "2023-10-01" && a.grade === "Pass"
      );
      return { id: student.id, passed };
    });

    const passedCount = report.filter((student) => student.passed).length;

    expect(report).toEqual([
      { id: "1", passed: true },
      { id: "2", passed: false },
    ]);
    expect(passedCount).toBe(1);
  });
});
