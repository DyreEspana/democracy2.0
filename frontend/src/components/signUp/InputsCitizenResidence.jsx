import countryInformationDE from "./CountryInformationDE.jsx";
import "../../pages/signUp/SignUp.css";

const InputsCitizenResidence = ({residence, handleChange}) => {
    return (<div className={"column"}>
            <div className={"row"}>
                <label>
                    residence type
                    <select
                        name="residenceType" id="residenceType"
                        required
                        value={residence.residenceType}
                        onChange={handleChange}
                    >
                        <option value={""}>--residence type--</option>
                        <option value={"MAIN_RESIDENCE"}>main residence</option>
                        <option value={"SUB_RESIDENCE"}>sub residence</option>
                    </select>
                </label>
                <label>
                    owner type
                    <select
                        name="ownerType" id="ownerType"
                        required={true}
                        value={residence.ownerType}
                        onChange={handleChange}
                    >
                        <option value={""}>--owner type--</option>
                        <option value={"PROPERTY"}>property</option>
                        <option value={"RENTER"}>renter</option>
                        <option value={"LANDLORD"}>landlord</option>
                    </select>
                </label>
            </div>
            <div className={"row"}>
                <label>
                    street
                    <input type="text"
                           name="street" id="street"
                           required={true}
                           value={residence.street}
                           onChange={handleChange}
                    />
                </label>
                <label>
                    house number
                    <input type="text"
                           name="houseNumber" id="houseNumber"
                           required={true}
                           value={residence.houseNumber}
                           onChange={handleChange}
                    />
                </label>
            </div>
            <div className={"row"}>
                <label>
                    stair
                    <input type="number"
                           name="stair" id="stair"
                           required={true}
                           value={residence.stair}
                           onChange={handleChange}
                    />
                </label>
                <label>
                    stock
                    <input type="number"
                           name="stock" id="stock"
                           required={true}
                           value={residence.stock}
                           onChange={handleChange}
                    />
                </label>
                <label>
                    door
                    <input type="number"
                           name="door" id="door"
                           required={true}
                           value={residence.door}
                           onChange={handleChange}
                    />
                </label>
            </div>
            <div className={"row"}>
                <label>
                    postalCode
                    <input type="number"
                           name="postalCode" id="postalCode"
                           required={true}
                           value={residence.postalCode}
                           onChange={handleChange}
                    />
                </label>
                <label>
                    city
                    <input type="text"
                           name="city" id="city"
                           required={true}
                           value={residence.city}
                           onChange={handleChange}
                    />
                </label>
            </div>
            <div className={"row"}>
                <label>
                    option
                    <input type="text"
                           name="option" id="option"
                           value={residence.option}
                           onChange={handleChange}
                    />
                </label>
                <label>
                    country
                    <select
                        name={"country"}
                        required={true}
                        value={residence.country}
                        onChange={handleChange}
                    >
                        <option value={""}>--select a country--</option>
                        {countryInformationDE.map((country, index) =>
                            <option key={index} value={country.name}>{country.flag} {country.name}</option>
                        )}
                    </select>
                </label>
            </div>
        </div>
    )
}

export default InputsCitizenResidence;