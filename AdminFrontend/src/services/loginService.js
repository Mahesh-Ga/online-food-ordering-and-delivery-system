import appForAdmin from "../httpCommon"


export const signIn = (email,password)=>{ 
    const body = {
        email,
        password
    } 
    return appForAdmin.post(`/user/signin`,body)
}

export const validateUser = ()=>{
    return appForAdmin.get(`/admin/restaurant`)

}

// later change to validate api 
// export const signOut = ()=>{
//     return app
// }
