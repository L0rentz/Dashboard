exports.getAboutJson = (ip) => {
    var json =
    {
        "client": {
            "host": ip
        },
        "server": {
            "current_time": Date.now() / 1000 | 0,
            "services": [
                {
                    "name": "weather",
                    "widgets": [
                        {
                            "name": "city_temperature",
                            "description": "Display temperature for a city",
                            "params": [
                                {
                                    "name": "city",
                                    "type": "string"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "sport",
                    "widgets": [
                        {
                            "name": "formula_one_drivers",
                            "description": "Display a list of drivers from the selected year",
                            "params": [
                                {
                                    "name": "year",
                                    "type": "integer"
                                },
                            ]
                        },
                        {
                            "name": "formula_one_constructors",
                            "description": "Display a list of constructors from the selected year",
                            "params": [
                                {
                                    "name": "year",
                                    "type": "integer"
                                },
                            ]
                        },
                        {
                            "name": "football_leagues",
                            "description": "Display a ranking of the selected league at the selected year",
                            "params": [
                                {
                                    "name": "year",
                                    "type": "integer"
                                },
                                {
                                    "name": "league",
                                    "type": "string"
                                },
                            ]
                        }
                    ]
                },
                {
                    "name": "fun",
                    "widgets": [
                        {
                            "name": "chuck_norris_jokes",
                            "description": "Display a random joke from the selected category",
                            "params": [
                                {
                                    "name": "category",
                                    "type": "string"
                                },
                            ]
                        },
                    ]
                }
            ]
        }
    };
    return json;
}

module.exports = exports;