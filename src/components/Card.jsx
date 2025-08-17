import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

const Card = ({image}) => {

  const {selectedImage,setSelectedImage,setFrontendImage,setBackendImage} = useContext(userDataContext);

  return (
    <div className={`w-[100px] h-[160px] lg:w-[150px] lg:h-[250px] bg-[#0303260b] border-2 border-[#0000ff29] rounded-xl overflow-hidden 
                    hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white 
                    ${selectedImage === image ? "border-4 border-white shadow-2xl shadow-blue-950": ""}`} 
         onClick={()=>{ setSelectedImage(image)
                        setFrontendImage(null)
                        setBackendImage(null)
                 }}>
      <img src={image} className="h-full object-cover rounded-xl"/>
    </div>
  )
}

export default Card
