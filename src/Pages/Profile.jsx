import "../Styles/Pages/Profile.css";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import "../Styles/Pages/Profile.css";
import { useEffect, useRef, useState } from "react";
import { variables } from "../Variables.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
	const [userData, setUserData] = useState(null);
	const { puid } = useParams();

	const [isEditing, setIsEditing] = useState({
		fullName: false,
		userGender: false,
		taxNumber: false,
		email: false,
		phoneNumber: false,
		whatsappContact: false,
		address: {
			state: false,
			city: false,
		},
	});

	const [updateForm, setUpdateForm] = useState({
		fullName: "",
		userGener: "",
		taxNumber: "",
		email: "",
		phoneNumber: "",
		whatsappContact: "",
		address: {
			state: "",
			city: "",
		},
	});

	const fileInputRef = useRef(null);

	useEffect(() => {
		console.log(updateForm);
	});

	useEffect(() => {
		const getUserData = async () => {
			const response = await axios.get(
				`${variables.localhost}/professionals/list/${puid}`
			);
			const data = await response.data;
			setUserData(data);
			setUpdateForm({
				fullName: data.fullName,
				userGender: data.userGender,
				taxNumber: data.taxNumber,
				email: data.email,
				phoneNumber: data.phoneNumber,
				whatsappContact: data.whatsappContact,
				address: {
					state: data.state,
					city: data.city,
				},
			});
			console.log(data);
		};

		getUserData();
	}, [puid]);

	const changeUpdateFormInputs = (e) => {
		const { name, value } = e.target;

		if (name.includes("address.")) {
			const addressField = name.split(".")[1];
			setUpdateForm((prevState) => ({
				...prevState,
				address: {
					...prevState.address,
					[addressField]: value,
				},
			}));
		} else {
			setUpdateForm((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	// const submitUpdateForm = (e) => {
	//     e.preventDefault();
	//     const updateUserURL = `${variables.localhost}/users/update/${puid}`;

	//     const updateUserInfo = async () => {
	//         try {
	//             const response = axios.post
	//         }
	//     }
	// }

	const getAtributte = (name, placeholder) => {
		return name || placeholder;
	};

	const editInputText = (field) => {
		setIsEditing((prevState) => {
			if (field.includes("address.")) {
				const addressField = field.split(".")[1];
				return {
					...prevState,
					address: {
						...prevState.address,
						[addressField]: true,
					},
				};
			} else {
				return {
					...prevState,
					[field]: true,
				};
			}
		});
	};

	const saveEditedText = (field) => {
		setUserData(updateForm);
		setIsEditing((prevState) => {
			if (field.includes("address.")) {
				const addressField = field.split(".")[1];
				return {
					...prevState,
					address: {
						...prevState.address,
						[addressField]: false,
					},
				};
			} else {
				return {
					...prevState,
					[field]: false,
				};
			}
		});
	};

	if (!userData) {
		return <div>Carregando...</div>;
	}

	const handleDivClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setUserData((prevData) => ({
					...prevData,
					profilePicture: reader.result,
				}));
				setUpdateForm((prevForm) => ({
					...prevForm,
					profilePicture: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<Header />
			<div className='container profile-container'>
				<div className='base-info'>
					<div className='base-info-top-bar'>
						<div className='profile-input'>
							{isEditing.fullName ? (
								<>
									<input
										type='text'
										name='fullName'
										value={updateForm.fullName}
										onChange={changeUpdateFormInputs}
										placeholder='Nome de exibição'
									/>
									<span
										className='material-symbols-outlined edit-button'
										onClick={() => saveEditedText("fullName")}
									>
										download_done
									</span>
								</>
							) : (
								<>
									<p>
										{userData
											? getAtributte(userData.fullName, "Nome de exibição")
											: "Carregando..."}
									</p>
									<span
										className='material-symbols-outlined edit-button'
										onClick={() => editInputText("fullName")}
									>
										border_color
									</span>
								</>
							)}
						</div>
						<div className='profile-input profile-image-input'>
							<div
								className='profile-image-placeholder'
								onClick={handleDivClick}
								style={{
									backgroundImage: `url(${
										userData.profilePicture ||
										"/Assets/imgs/cards/choose-picture.png"
									})`,
								}}
							>
								<input
									type='file'
									ref={fileInputRef}
									style={{ display: "none" }}
									onChange={handleFileChange}
								/>
							</div>
						</div>
					</div>
					<div className='base-info-bottom'>
						<div className='location-info'>
							<div className='profile-input'>
								{isEditing.address.state ? (
									<></>
								) : (
									<>
										<p>
											<strong>Local: </strong>{" "}
											{userData
												? `${userData.city} / ${userData.state}`
												: "Carregando..."}
										</p>
										<span
											className='material-symbols-outlined edit-button'
											onClick={() => {
												editInputText("address.state");
											}}
										>
											border_color
										</span>
									</>
								)}
							</div>
						</div>
						<div className='profile-input'></div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
