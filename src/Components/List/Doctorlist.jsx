import React, { useDeferredValue, useEffect, useState } from 'react'

const Doctorlist = () => {
    const [ doctors , setDoctors] = useState();
    useEffect(()=>{
        fetch("http://localhost:5000/doctors")
        .then((res)=>res.json())
        .then((data) =>{
            console.log("API Response",data);
            setDoctors(data);

        })
        .catch((error)=>console.error("errors print",error));
    },[])
  return (
    <div>
      <h2 className='text-center text-[30px] pt-20'>Available doctors</h2>
      <ul>
        {Array.isArray(doctors)&& doctors.map((doctor)=>(
            <li key={doctor.id}>
                <strong>{doctor.name}</strong> - {doctor.specialization}
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Doctorlist
