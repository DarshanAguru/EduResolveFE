/* eslint-disable react/prop-types */
import {useNavigate} from "react-router-dom"

export default function Button({children,style,goTo,type="button"}){
    const navigate=useNavigate()
    return(
        <button type={type} className={style} onClick={()=>navigate(goTo)}>{children}</button>
    )
}