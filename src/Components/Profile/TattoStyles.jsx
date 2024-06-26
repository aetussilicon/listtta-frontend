import { useContext, useEffect, useState } from "react";
import {
  FiltersContext,
  FiltersProvider,
} from "../../Contexts/FiltersConxtext";
import "../../Styles/Components/Profile/TattooStyles.css";

const TattooStyles = ({ skills, setSkills, initialSkills }) => {
  const { specialtiesAPI } = useContext(FiltersContext);
  const [showedSkills, setShowedSkills] = useState([]);

  useEffect(() => {
    console.log(initialSkills);
    console.log("skills", skills);
    setSkills(initialSkills);

    const sortedSpecialties = specialtiesAPI.sort(
      (a, b) => a.displayName.length - b.displayName.length
    );
    setShowedSkills(sortedSpecialties);
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const valueInt = parseInt(value, 10);
    if (checked) {
      if (skills.length < 5) {
        setSkills([...skills, valueInt]);
      }
    } else {
      setSkills(skills.filter((skill) => skill !== valueInt));
    }
  };

  return (
    <FiltersProvider>
      <div className='profile-tattoo-styles'>
        <div className='styles-grid'>
          {showedSkills.map((skill) => (
            <>
              <label key={skill.filterId}>
                <input
                  type='checkbox'
                  value={skill.filterId}
                  checked={skills.includes(skill.filterId)}
                  onChange={handleCheckboxChange}
                  disabled={
                    !skills.includes(skill.filterId) && skills.length >= 5
                  }
                />
                {skill.displayName}
              </label>
            </>
          ))}
        </div>
      </div>
    </FiltersProvider>
  );
};

export default TattooStyles;
