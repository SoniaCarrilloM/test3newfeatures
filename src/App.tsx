import React, { useState } from "react";
import {
  SchoolActionKind,
  useSchool,
  useSchoolDispatch,
} from "./school-context";
import "./App.css";

function App() {
  const school = useSchool();
  const schoolDispatch = useSchoolDispatch();

  const [studentEditingId, setUserEditingId] = useState<string | null>(null);
  const [updatedStudentName, setUpdatedStudentName] = useState<string>("");

  const [teacherEditingId, setTeacherEditingId] = useState<string | null>(null);
  const [newAssignedStudentId, setNewAssignedStudentId] = useState<
    string | null
  >(null);
  const [assignment, setAssignmentState] = useState<string>("");
  const [grade, setGrade] = useState<string>("");

  const handleTeacherSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.currentTarget;
    const teacherName = target.teacher.value;
    const id = crypto.randomUUID();
    schoolDispatch?.({
      type: SchoolActionKind.ADD_TEACHER,
      payload: { name: teacherName, id, students: [] },
    });

    target.reset();
  };

  const handleStudentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.currentTarget;
    const studentName = target.student.value;
    const id = crypto.randomUUID();
    schoolDispatch?.({
      type: SchoolActionKind.ADD_STUDENT,
      payload: { name: studentName, id },
    });

    target.reset();
  };

  const handleUpdateStudent = () => {
    if (studentEditingId) {
      schoolDispatch?.({
        type: SchoolActionKind.UPDATE_STUDENT,
        payload: { name: updatedStudentName, id: studentEditingId },
      });
    }

    setUserEditingId(null);
    setUpdatedStudentName("");
  };

  const handleAssignStudent = () => {
    if (teacherEditingId && newAssignedStudentId) {
      schoolDispatch?.({
        type: SchoolActionKind.ASSIGN_STUDENT_TO_TEACHER,
        payload: {
          teacherId: teacherEditingId,
          studentId: newAssignedStudentId,
        },
      });
    }
  };

  const [report, setReport] = useState<{ id: string; passed: boolean }[]>([]);

  const handleGenerateReport = (date: string) => {
    // Implement the logic for generating the report based on the date
    console.log(`Generating report for date: ${date}`);
    // Example logic to set the report
    const generatedReport = school.students.map((student) => ({
      id: student.id,
      passed: Math.random() > 0.5, // Randomly pass or fail for demonstration
    }));
    setReport(generatedReport);
  };
    return (
      <div className="App">
      <img src="/infinitas-logo.svg" alt="Infinitas Logo" />

      <h1>IL Interview all new features /not refactored (test3newfeatures)</h1>

      <div className="section">
        <h2>Teacher</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {school?.teachers.map((teacher) => {
              return (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>
                    <ul>
                      {teacher.students.map((s) => (
                        <li key={s}>
                          {school?.students.map((s1) =>
                            s === s1.id ? s1.name : ""
                          )}
                        </li>
                      ))}
                    </ul>
                    {teacher.id === teacherEditingId ? (
                      <>
                        <select
                          value={newAssignedStudentId || ""}
                          onChange={(e) =>
                            setNewAssignedStudentId(e.target.value)
                          }
                        >
                          <option value={""}></option>
                          {school?.students.map((student) => (
                            <option key={student.id} value={student.id}>
                              {student.name}
                            </option>
                          ))}
                        </select>
                        <button
                          style={{ color: "red" }}
                          onClick={handleAssignStudent}
                        >
                          Assign
                        </button>
                      </>
                    ) : (
                      <button
                        style={{ color: "red" }}
                        onClick={() => setTeacherEditingId(teacher.id)}
                      >
                        Assign student
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr></hr>
        <form onSubmit={handleTeacherSubmit}>
          <label htmlFor="teacher">Teacher</label>
          <input type="text" id="teacher" name="teacher" />
          <button type="submit">Add Teacher</button>
        </form>
      </div>

      <div className="section">
        <h2>Students</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {school?.students.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    {student.id === studentEditingId ? (
                      <>
                        <input
                          type="text"
                          value={updatedStudentName}
                          onChange={(e) =>
                            setUpdatedStudentName(e.target.value)
                          }
                        ></input>
                        <button
                          style={{ color: "red" }}
                          onClick={handleUpdateStudent}
                        >
                          Done
                        </button>
                      </>
                    ) : (
                      <button
                        style={{ color: "red" }}
                        onClick={() => setUserEditingId(student.id)}
                      >
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr></hr>
        <form onSubmit={handleStudentSubmit}>
          <label htmlFor="student">Student</label>
          <input type="text" id="student" name="student" />
          <button type="submit">Add Student</button>
        </form>
        <div className="section">
          <h2>Assignments</h2>
          <input
            type="text"
            value={assignment}
            onChange={(e) => setAssignmentState(e.target.value)}
            placeholder="Assignment"
          />
        </div>
        <div>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Grade (Pass/Fail)"
          />
        </div>
      </div>
      <div className="section">
        <h2>Report</h2>
        <input
          type="date"
          onChange={(e) => handleGenerateReport(e.target.value)}
        />
        <ul>
          {report.map((student) => (
            <li key={student.id}>
              {student.id} - {student.passed ? "Passed" : "Failed"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
