import React from "react";
import Male from "../images/boy.png";
import Female from "../images/girl.png";
import MentorMale from "../images/mentorMale.png";
import MentorFemale from "../images/mentorFemale.png";
import TeacherMale from "../images/teacherMale.png";
import TeacherFemale from "../images/teacherFemale.png";

const useSenderImage = (senderGender, senderType) => {
  let imageSrc = React.useMemo(() => {
    if (senderGender === "Male") {
      switch (senderType) {
        case "students":
          return Male;
        case "mentors":
          return MentorMale;
        default:
          return TeacherMale;
      }
    } else if (senderGender === "Female") {
      switch (senderType) {
        case "students":
          return Female;
        case "mentors":
          return MentorFemale;
        default:
          return TeacherFemale;
      }
    }
  }, [senderGender, senderType]); // Only recalculate if senderGender or senderType changes

  return imageSrc;
};

export default useSenderImage;
