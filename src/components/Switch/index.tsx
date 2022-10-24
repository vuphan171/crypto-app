import { FC } from 'react';
import emoji from "react-easy-emoji";
import "./switch.scss";

interface ISwitchProps {
    checked: boolean;
    checkedIcon: string;
    unCheckedIcon: string;
    size: "small" | "medium" | "large"
};

const Switch: FC<ISwitchProps> = ({ checked, checkedIcon, unCheckedIcon, size }) => {

    return (
        <label className="switch">
        <input
            type="checkbox"
            checked={checked}
        />
        <span className="slider round">
            <span className="emoji">{checked ? emoji(checkedIcon) : emoji(unCheckedIcon)}</span>
        </span>
    </label>
    );
};

export default Switch;