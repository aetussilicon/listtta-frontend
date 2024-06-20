import { useContext, useEffect, useState } from "react";
import {
  FiltersContext,
  FiltersProvider,
} from "../../Contexts/FiltersConxtext";

const TattooStyles = ({ skills, setSkills, initialSkills }) => {
  const { specialtiesAPI } = useContext(FiltersContext);
  const [showAll, setShowAll] = useState(false);
  const [showedSkills, setShowedSkills] = useState(specialtiesAPI.slice(0, 12));

  useEffect(() => {
    setSkills(initialSkills.map((skill) => skill.filterId));
  }, []);

  const toggleShowAll = () => {
    if (showAll) {
      setShowedSkills(specialtiesAPI.slice(0, 12));
    } else {
      setShowedSkills(specialtiesAPI);
    }

    setShowAll(!showAll);
  };

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
        {showedSkills.map((skill) => (
          <label key={skill.filterId}>
            <input
              type='checkbox'
              value={skill.filterId}
              checked={skills.includes(skill.filterId)}
              onChange={handleCheckboxChange}
              disabled={!skills.includes(skill.filterId) && skills.length >= 5}
            />
            {skill.displayName}
          </label>
        ))}
        {specialtiesAPI.length > 12 && (
          <button onClick={toggleShowAll}>
            {showAll ? "Mostrar menos" : "Mostrar tudo"}
          </button>
        )}
      </div>
    </FiltersProvider>
  );
};

export default TattooStyles;
