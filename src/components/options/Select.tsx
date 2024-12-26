import {Career} from "../../models/Career.ts";
import {Course} from "../../models/Course.ts";

interface SelectProps {
    purpose: string;
    selected: string;
    setSelected: (selected: string) => void;
    options: Career[] | Course[];
}
export function Select(
    { purpose, selected, setSelected, options }: SelectProps
){
    return (
        <select className="select"
                value={selected}
                onChange={(e) =>
                    setSelected(e.target.value)}
        >
            <option value={""} disabled>{purpose}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
    )
}