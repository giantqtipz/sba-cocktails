import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { CocktailAttributes } from '../../../store/cocktails/interface';

interface Props {
  fields: CocktailAttributes;
  setFields: Dispatch<SetStateAction<CocktailAttributes>>;
  data?: CocktailAttributes;
}

const Steps: React.FC<Props> = (props) => {
  const [steps, setSteps] = useState([{ id: '', step: '', order: 0 }]);
  const { setFields, fields, data } = props;
  const stepsInputHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    idx: number
  ) => {
    const stepsValues = [...steps];
    stepsValues[idx].step = event.target.value;
    stepsValues[idx].order = idx;
    setSteps(stepsValues);
    setFields({
      ...fields,
      steps: stepsValues,
    });
  };

  const addStep = () => {
    setSteps([...steps, { id: '', step: '', order: steps.length }]);
  };

  const deleteStep = (idx: number) => {
    const stepsValues = [...steps];
    stepsValues.splice(idx, 1);
    const updatedOrder = stepsValues.map((step, index) => {
      return {
        id: step.id,
        step: step.step,
        order: index,
      };
    });
    setSteps(updatedOrder);
    setFields({
      ...fields,
      steps: updatedOrder,
    });
  };

  useEffect(() => {
    if (data && data.ingredients && data.steps) {
      setSteps(data.steps);
      setFields({
        ...fields,
        ingredients: data.ingredients,
        steps: data.steps,
      });
    }
  }, []);
  return (
    <label htmlFor="steps">
      <span>Steps</span>
      <button className="add-button" onClick={addStep} type="button">
        +
      </button>
      <ol>
        {steps
          .sort((a, b) => a.order - b.order)
          .map((step, idx) => (
            <li>
              <textarea
                name="step"
                value={steps[idx].step}
                onChange={(event) => stepsInputHandler(event, idx)}
                required
              />
              {idx > 0 && (
                <button
                  className="delete-button"
                  onClick={() => deleteStep(idx)}
                  type="button"
                >
                  <i className="fas fa-trash" />
                </button>
              )}
            </li>
          ))}
      </ol>
    </label>
  );
};

export default Steps;
