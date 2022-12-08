import random

OPERATORS = {
    0: "-",
    1: "+",
}

LEVELS = {
    1: 10,
    2: 50,
    3: 100,
}

MAX_OP_FOR_LEVEL = {
    1: 1,
    2: 2,
    3: 3,
}

def get_rows_count(level: int) -> int:
    if level == 1: return 3
    elif level == 2: return 4
    return 5

def get_columns_count(level: int) -> int:
    if level == 1: return 3
    elif level == 2: return 4
    return 4

def get_operators_count(level: int) -> int:
    if level == 1: return 2
    elif level == 2: return 3
    return 4

def gen_options(level) -> list:
    upper_range = LEVELS[level]
    
    options_list = []
    for _ in range(get_rows_count(level)):
        options = []
        for _ in range(get_columns_count(level)):
            options.append(random.randint(1, upper_range))
        options_list.append(options)
    return options_list

def gen_operators(level) -> list:
    plus_count = 0
    minus_count = 0
    operators_list = []

    for _ in range(get_operators_count(level)):
        operator = OPERATORS[random.randint(0, 1)]

        if plus_count >= MAX_OP_FOR_LEVEL[level]: operator = OPERATORS[0]
        if minus_count >= MAX_OP_FOR_LEVEL[level]: operator = OPERATORS[1]

        # append to list
        operators_list.append(operator)

        # increment counters
        if operator == OPERATORS[1]: plus_count += 1
        if operator == OPERATORS[0]: minus_count += 1

    return operators_list

def gen_game_data(level: int) -> dict:
    # setting upper range as per the level
    upper_range = LEVELS[level]

    options_list = gen_options(level)
    operators_list = gen_operators(level)
    answer = random.randint(1, upper_range)
    
    return {"options_list": options_list, "operators_list": operators_list, "answer": answer}
