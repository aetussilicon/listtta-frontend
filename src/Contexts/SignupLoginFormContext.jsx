import axios from "axios";
import { createContext, useState } from "react";
import { variables } from "../Variables";

export const SignupLoginFormContext = createContext();

export const SignupLoginFormProvider = ({children}) => {

    const [signupFormData, setSignupFormData] = useState({
        email: '',
        password: '',
        role: '',
        address: {
            state: '',
            city: ''
        },
        professionalsDto: {
            type: '',
            instagramUrl: '',
            skills: []
        }
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
       
        const nameParts = name.split('.');
        if (nameParts.length > 1) {
            setSignupFormData(prevState => {
                const newFormData = { ...prevState };
                let current = newFormData;

                for (let i = 0; 1 < nameParts.length - 1; i++) {
                    current - current[nameParts[i]];
                }
                current[nameParts[nameParts.length - 1]] = value;
                return newFormData;
            });
        } else {
            setSignupFormData({
                ...signupFormData,
                [name] : value,
            });
        }
    };

    const signupuUser = async () => {
        const signupURL  = `${variables.localhost}/auth/signup`;
        try {
            const response = await axios.post(signupURL, signupFormData);
            const data = await response.data;
            
            if(response.status === 201) {
                alert("Cadastrado com sucesso!");
                console.log(data);
            } else {
                throw new Error("Não foi possível cadastrar!");
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <SignupLoginFormContext.Provider value={{ signupFormData, handleInputChange, signupuUser }}>
            {children}
        </SignupLoginFormContext.Provider>
    )

}