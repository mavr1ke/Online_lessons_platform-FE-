import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchCourseDetails } from "../../slices/courseDetailsSlice";
import { updateCourse } from "../../slices/coursesSlice";
import "./EditCourse.css";
import { toast } from "react-toastify";

interface CourseData {
  title: string;
  price: number | null;
  description: string;
  photoPath: string;
}

interface CourseErrors {
  title?: string;
  price?: string;
  description?: string;
}

const EditCourse: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const courseIdNumber = courseId !== undefined ? parseInt(courseId, 10) : 0;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const courseDetails = useAppSelector(
    (state) => state.coursesDetails.courseDetails
  );

  const [course, setCourse] = useState<CourseData>({
    title: "",
    price: null,
    description: "",
    photoPath: "",
  });

  const [errors, setErrors] = useState<CourseErrors>({});

  // const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  // const [presentation, setPresentation] = useState<File | null>(null);

  const [initialCourse, setInitialCourse] = useState<CourseData>();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "price") {
      if (value === "") {
        setCourse((prevCourse) => ({
          ...prevCourse,
          [name]: null,
        }));
      } else {
        const numericValue = parseInt(value, 10);
        // Проверяем, что значение является числом и не отрицательным
        if (!isNaN(numericValue) && numericValue >= 0) {
          setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: numericValue,
          }));
        }
      }
    } else {
      setCourse((prevCourse) => ({
        ...prevCourse,
        [name]: value,
      }));
    }
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetails(parseInt(courseId, 10)));
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    if (courseDetails) {
      const loadedCourse = {
        title: courseDetails.title,
        price: courseDetails.price,
        description: courseDetails.description,
        photoPath: courseDetails.photoPath,
      };
      setCourse(loadedCourse);
      setInitialCourse(loadedCourse);
    }
  }, [courseDetails]);

  const validate = (): boolean => {
    const newErrors: CourseErrors = {};
    if (!course.title || course.title.length < 5) {
      newErrors.title = "The title must be at least 5 characters long.";
    }
    if (course.price == null || course.price < 0 || course.price > 9999) {
      newErrors.price = "The price must be between 0 and 9999.";
    }
    if (!course.description || course.description.length < 300) {
      newErrors.description =
        "The description must be at least 300 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

        
    // Сравнение текущих данных с начальными
    if (JSON.stringify(course) === JSON.stringify(initialCourse)) {
      toast.info("No changes were made.");
      navigate("/my_courses");
      return;
    }

    if (!validate()) {
      toast.error("Please correct the errors before submitting.", {
        toastId: "edit_course_error",
      });
      return;
    }

    const updatedCourseData = {
      id: courseIdNumber,
      ...course,
      photoPath: course.photoPath,
    };
    dispatch(
      updateCourse({
        ...updatedCourseData,
        price: updatedCourseData.price as number, 
      })
    ).then(() => {
      toast.success("Course updated successfully", {
        toastId: "edit_course_success",
      });
      navigate("/my_courses");
    })
    .catch(() => {
      toast.error("An error occurred while updating the course.", {
        toastId: "edit_course_error",
      });
    });
  };

  return (
    <div className="edit-course-container">
      <div className="edit-course-header">
        <h2>Edit Course</h2>
      </div>
      <form onSubmit={handleSubmit} className="edit-course-form">
        <div className="edit-main-container">
          <div className="edit-files-container">
            <div className="edit-course-form-group">
              <label htmlFor="coverPhoto">Cover Photo</label>
              <input
                type="file"
                id="coverPhoto"
                name="coverPhoto"
                disabled={true}
                // onChange={handleFileChange(setCoverPhoto)}
              />
            </div>
          </div>
          <div className="edit-fields-container">
            <div className="edit-course-form-group">
              <label htmlFor="title">Title</label>
              {errors.title && (
                <p className="create-course-error">{errors.title}</p>
              )}
              <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-course-form-group">
              <label htmlFor="price">Price</label>
              {errors.price && (
                <p className="create-course-error">{errors.price}</p>
              )}
              <input
                type="text"
                id="price"
                name="price"
                value={course.price === null ? "" : course.price.toString()}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-course-form-group">
              <label htmlFor="description">Description</label>
              {errors.description && (
                <p className="create-course-error">{errors.description}</p>
              )}
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="edit-course-button-container">
          <button type="submit" className="edit-course-submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
