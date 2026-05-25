import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import { authDataContext } from './AuthContext'

export const adminDataContext = createContext()
function AdminContext({children}) {
    let [adminData,setAdminData] = useState(null)


    const getAdmin = async () => {
      try {
           let result = await axiosInstance.get("/api/user/get-admin")

      setAdminData(result.data)
      console.log(result.data)
      } catch (error) {
        setAdminData(null)
        // suppress noisy stack for expected 401 (not authenticated)
        if (error?.response?.status === 401) {
          console.debug('Admin not authenticated')
        } else {
          console.error(error)
        }
      }
    }

    useEffect(()=>{
     getAdmin()
    },[])


    let value = {
adminData,setAdminData,getAdmin
    }
  return (
    <div>
<adminDataContext.Provider value={value}>
    {children}
</adminDataContext.Provider>
      
    </div>
  )
}

export default AdminContext