import { ReplayOutlined } from "@mui/icons-material";
import { Stack, Grid, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../utils/helpers";

export default function Game({ game, id, uid }) {
  const [operands, setOperands] = useState([
    ...game.question.operators_list.map((i) => null),
    null,
  ]);

  const [result, setResult] = useState(null);

  const [operators_list] = useState(game.question.operators_list);

  const navigate = useNavigate();

  useEffect(() => {
    if (game.question.answer === result) {
      axios({
        method: "POST",
        url: `${DOMAIN}/v1/games/${id}/submit-score`,
        params: {
          player_id: uid,
        },
      }).then((res) => {
        navigate(`/result/${id}`);
      });
    }
  }, [game.question.answer, result, uid, id, navigate]);

  // calculate result
  const calculate = (tempResult, operation, number) => {
    switch (operation) {
      case "+":
        return tempResult + number;
      case "-":
        return tempResult - number;
      default:
        return number;
    }
  };

  // get sum of numbers in formula
  const getFormula = (lastOption) => {
    let formula = ["+"];
    for (let index = 0; index < operators_list.length; index++) {
      formula = [...formula, operands[index], operators_list[index]];
    }
    formula = [...formula, lastOption];
    return formula;
  };

  const getResult = (formula) => {
    let tempResult = 0;
    let previous_opperation = null;

    // loop till last item
    for (let i = 0; i < formula.length; i++) {
      let item = formula[i];
      switch (typeof item) {
        case "number":
          tempResult = calculate(tempResult, previous_opperation, item);
          break;
        case "string":
          previous_opperation = item;
          break;
        default:
          break;
      }
    }

    setResult(tempResult);
  };

  const appendOperand = (option) => {
    setResult(null);
    let newOperands = [];
    let foundNull = false;
    let nullCount = 0;

    for (let index = 0; index < operands.length; index++) {
      let element = operands[index];
      if (element === null) {
        nullCount += 1;
      }

      if (!foundNull) {
        if (element === null) {
          element = option;
          foundNull = true;
        }
      }
      newOperands = [...newOperands, element];
    }
    if (nullCount <= 1) {
      const formula = getFormula(option);
      getResult(formula);
    }

    setOperands(newOperands);
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={3}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={1.5}
        style={{ width: "100%" }}
      >
        {game.question.options_list.map((options, index) => (
          <Stack
            justifyContent="center"
            alignItems="center"
            direction="row"
            spacing={1.5}
            style={{ width: "100%" }}
            key={index}
          >
            {options.map((option, nested_index) => (
              <Grid item key={nested_index}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                  }}
                  onClick={() => appendOperand(option)}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Stack>
        ))}
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        style={{ width: "100%" }}
        spacing={1.5}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            {operands[0] ? operands[0] : "__"}
          </Typography>
        </Stack>
        {operators_list.map((operator, index) => (
          <Stack
            key={index}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1.5}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              {operator}
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {operands[index + 1] ? operands[index + 1] : "__"}
            </Typography>
          </Stack>
        ))}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            =
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={900}
            color={game.question.answer === result ? "green" : "error"}
          >
            {game.question.answer}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        style={{ width: "100%" }}
        spacing={1.5}
      >
        <Button
          disableElevation
          variant="contained"
          style={{
            backgroundColor: "#000",
            color: "#fff",
          }}
          onClick={() =>
            setOperands([
              ...game.question.operators_list.map((i) => null),
              null,
            ])
          }
        >
          <ReplayOutlined />
        </Button>
      </Stack>
    </Stack>
  );
}
