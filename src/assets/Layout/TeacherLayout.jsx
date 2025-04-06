import { Outlet } from 'react-router-dom';
import TeacherNavbar from '../Pages/Teacher/TeacherNavbar'
const TeacherLayout = () => {
  return (
    <>
    <TeacherNavbar/>
    <Outlet/>
    </>
  )
}

export default TeacherLayout