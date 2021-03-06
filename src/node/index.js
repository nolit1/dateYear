const express = require("express");

const app = express();


app.get("/", function (request, response) {

    let year = request.query.year;
    let day = 256 //request.query.day; Позволяет добавлять день в поле аргументов для более удобного тестирования
    
    //несколько простых обработок ошибок
    if (year < 0) {
        return response.json({ "errorCode": "500", "dataMessage": "Кажется, вы затронули период до нашей эры" })
    }
    if (year == 0) {
        return response.json({ "errorCode": "500", "dataMessage": "Добавьте еще хотя бы 1 год к дате" })
    }
    if (!year) {
        return response.json({ "errorCode": "500", "dataMessage": "Год не указан" })
    }

    //количество дней в феврале
    let dayInFebruary = 28;
    //Является ли год високосным
    let isVis = null;


    //проверка, является ли введенный год високосным
    if (year % 4 != 0) {
        isVis = false;
    } else
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                isVis = true;
            }
            isVis = false;
        }
        else isVis = true;

    //если високосный - в феврале 29 дней
    if (isVis) {
        dayInFebruary = 29;
    }

    let arrayDays = [31, dayInFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //текущий месяц (в который входит 256й или другой введенный день)
    let tempMonth = 0; //0-11
    //день месяца
    let tempDay = 0;


    let d = 0; //сумма дней от 1ого до текущего месяца
    let i = 0;
    //проходимся по месяцам, пока не найдем нужный день
    while (i < 12) {
        let t = d;
        d += arrayDays[i];
        //если оказались в нужном месяце
        if (d >= day) {
            tempMonth = i + 1;
            tempDay = day - t;
            break;
        } else {
            i += 1;
        }
    }

    return response.json({ "errorCode": "200", "dataMessage": tempDay + "/" + tempMonth + "/" + year })

});

//слушает на 80 порту
app.listen(80);