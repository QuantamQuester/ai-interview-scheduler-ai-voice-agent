"use client"
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { UserDetailContext } from '../context/UserDetailContext';

export default function Provider({children}) {
    const [user, setUser ] = useState();
    useEffect(()=>{
        CreateNewUser();
    },[])

    const CreateNewUser= ()=>{
        supabase.auth.getUser().then(async({data:{user}})=>{
            // check if a user exists
            let { data: Users, error } = await supabase
            .from('Users')
            .select("*")
            .eq('email', user?.email); 

            console.log(Users);
            console.log(user);

            // create a new user
            if(!Users || Users?.length==0){
                console.log("no such user creating new user");
                const { data, error } = await supabase
                .from('Users')
                .insert([
                    {
                        name : user?.user_metadata?.name,
                        email : user?.email,
                        picture : user?.user_metadata.picture
                    },
                ])
                console.log(data);
                setUser(data);
                return;
            }
            setUser(Users[0]);
        })
    }
    return (
        <UserDetailContext.Provider value={{user,setUser}}>
             <div>{children}</div>
        </UserDetailContext.Provider>
       
    )
}

export const useUser = ()=>{
    const context = useContext(UserDetailContext);
    return context;
}