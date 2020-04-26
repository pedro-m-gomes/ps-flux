import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses);
  const [authors, setAuthors] = useState(authorStore.getAuthors);

  useEffect(() => {
    courseStore.addChangeListener(onChangeCourses);
    if (courseStore.getCourses().length === 0) {
      loadCourses();
    }
    authorStore.addChangeListener(onChangeAuthors);
    if (authorStore.getAuthors().length === 0) {
      loadAuthors();
    }
    return () => {
      courseStore.removeChangeListener(onChangeCourses); // cleanup on unmount
      authorStore.removeChangeListener(onChangeAuthors); // cleanup on unmount
    };
  }, []);

  function onChangeCourses() {
    setCourses(courseStore.getCourses());
  }

  function onChangeAuthors() {
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        deleteCourse={deleteCourse}
        getAuthorsNameById={authorStore.getAuthorsNameById}
        getAuthorById={authorStore.getAuthorById}
        authors={authors}
      />
    </>
  );
}

export default CoursesPage;
