import '../assets/css/grade-calculator.css'
import {useEffect, useState} from "react";
import {useAppContext} from "../hooks/useAppContext.tsx";
import {ModalType} from "../utils/Enums.ts";

export function GradeCalculator() {
    const [EP1, setEP1] = useState<string>('0');
    const [EP2, setEP2] = useState<string>('0');
    const [EP3, setEP3] = useState<string>('0');
    const [EP4, setEP4] = useState<string>('0');
    const [EParcial, setEParcial] = useState<string>('0');
    const [EFinal, setEFinal] = useState<string>('0');
    const { toggleModalStatus } = useAppContext();

    const handleCalculate = () =>{
        const convert = (value: string) => {
            if (value === ''){
                value = '0';
            }
            return parseFloat(value);
        }
        const averageEPS = (
            convert(EP1) +
            convert(EP2) +
            convert(EP3) +
            convert(EP4)
        ) / 4;
        const result = averageEPS * 0.4 + parseFloat(EParcial) * 0.3 + parseFloat(EFinal) * 0.3;
        let message: string;

        if (result > 16) {
            message = "Excelente resultado, siéntete orgulloso: " + result.toFixed(2);
        } else if (result > 13) {
            message = "Tuviste una nota decente, así que celébralo: " + result.toFixed(2);
        } else if (result >= 12.5) {
            message = "Aprobaste por un pelo, te salvaste esta vez: " + result.toFixed(2);
        } else {
            message = "Inténtalo el próximo ciclo, hijito: " + result.toFixed(2);
        }

        toggleModalStatus(true,{
            title: "Resultado",
            type: ModalType.Success,
            message: message,
            onClose: () => toggleModalStatus(false)
        })
    }

    const handleCleanFields = () => {
        setEP1('0')
        setEP2('0')
        setEP3('0')
        setEP4('0')
        setEParcial('0')
        setEFinal('0')
    }

    return (
        <>
            <aside className="grade-calculator">
                <h1>Calculador de Notas</h1>
                <div>
                    <GradeField name={"Evaluación Permanente 1"}
                                value={EP1}
                                setValue={setEP1}
                    />
                    <GradeField name={"Evaluación Permanente 2"}
                                value={EP2}
                                setValue={setEP2}
                    />
                    <GradeField name={"Evaluación Permanente 3"}
                                value={EP3}
                                setValue={setEP3}
                    />
                    <GradeField name={"Evaluación Permanente 4"}
                                value={EP4}
                                setValue={setEP4}
                    />
                    <GradeField name={"Evaluación Parcial"}
                                value={EParcial}
                                setValue={setEParcial}
                    />
                    <GradeField name={"Evaluación Final"}
                                value={EFinal}
                                setValue={setEFinal}
                    />
                </div>
                <section>
                    <button className="buttonPrimary"
                            onClick={handleCleanFields}
                    >Limpiar
                    </button>
                    <button className="buttonSecondary"
                            onClick={handleCalculate}
                    >Calcular
                    </button>
                </section>
            </aside>
        </>
    )
}

export function GradeField(
    {name, value, setValue}: { name: string; value: string; setValue: (value: string) => void }
) {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (parseFloat(value) > 20) {
            setError(`La ${name} no puede ser mayor a 20.`)
        } else if (parseFloat(value) < 0){
            setError(`La ${name} no puede ser menor a 0.`)
        } else {
            setError(null)
        }
    }, [name, value])

    return (
        <span className="grade-field">
            {error &&
                <h4 style={{color: "red"}}>
                    {error}
                </h4>
            }
            <p>{name}:</p>
            <input value={value}
                   onChange={(e) =>
                       setValue(e.target.value)}
                   type="number"
            />
        </span>
    )
}