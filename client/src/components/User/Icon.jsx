/* eslint-disable react/prop-types */
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Icon = ({ type, handleShowPassword }) => {
    return (
        <div onClick={handleShowPassword}>
            {type === "password" ? (
                <AiOutlineEyeInvisible size={20} />
            ) : (
                <AiOutlineEye size={20} />
            )}
        </div>
    );
};

export default Icon;
