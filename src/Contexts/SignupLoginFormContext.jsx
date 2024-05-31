import axios from "axios";
import { createContext, useState } from "react";
import { variables } from "../Variables";

export const SignupFormContext = createContext();

export const SignupFormProvider = ({ children }) => {
  const [signupFormData, setSignupFormData] = useState({
    email: "",
    password: "",
    role: "",
    userGender: "",
    address: {
      state: "",
      city: "",
    },
    professionalsDto: {
      type: "",
      instagramUrl: "",
      skills: [],
    },
  });

  const handleSkillChange = (skill) => {
    setSignupFormData((prevState) => {
      const newSkills = prevState.professionalsDto.skills.includes(skill)
        ? prevState.professionalsDto.skills.filter((s) => s !== skill)
        : [...prevState.professionalsDto.skills, skill];

      if (newSkills.length > 5) return prevState;

      return {
        ...prevState,
        professionalsDto: {
          ...prevState.professionalsDto,
          skills: newSkills,
        },
      };
    });
  };

  const handleInputChange = (e, nameValue = null, valueValue = null) => {
    const name = nameValue || e?.target.name;
    const value = valueValue || e?.target.value;

    if (!name) return;

    const nameParts = name.split(".");
    if (nameParts.length > 1) {
      setSignupFormData((prevState) => {
        const newFormData = { ...prevState };
        let current = newFormData;

        for (let i = 0; i < nameParts.length - 1; i++) {
          current = current[nameParts[i]];
        }
        current[nameParts[nameParts.length - 1]] = value;
        return newFormData;
      });
    } else {
      setSignupFormData({
        ...signupFormData,
        [name]: value,
      });
    }
  };

  const signupUser = async () => {
    const signupURL = `${variables.localhost}/auth/signup`;
    try {
      const response = await axios.post(signupURL, signupFormData);
      const data = await response.data;

      if (response.status === 201) {
        alert("Cadastrado com sucesso!");
        console.log(data);
      } else {
        throw new Error("Não foi possível cadastrar!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignupFormContext.Provider
      value={{
        signupFormData,
        handleInputChange,
        handleSkillChange,
        signupUser,
      }}
    >
      {children}
    </SignupFormContext.Provider>
  );
};
