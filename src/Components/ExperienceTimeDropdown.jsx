const experienceOptions = [
    { label: "Menos de 3 anos", value: "LESS_THAN_3_YEARS" },
    { label: "De 3 a 7 anos", value: "FROM_3_TO_7_YEARS" },
    { label: "Mais de 7 anos", value: "MORE_THAN_7_YEARS" },
];

const SelectableField = ({ label, value, fieldName, fieldTitle, updateForm, setUpdateForm }) => {
    const handleChange = (event) => {
        const newValue = event.target.value;
        setUpdateForm((prevState) => ({
            ...prevState,
            professionalsDetails: {
                ...prevState.professionalsDetails,
                [fieldName]: newValue,
            },
        }));
    };

    return (
        <div>
            <label htmlFor={label}>{fieldTitle}</label>
            <select value={value} onChange={handleChange}>
                <option value="">Selecione uma Opção</option>
                {experienceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectableField;