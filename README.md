# dateYear

Сервис позволяет узнать дату по номеру дня в году.

## Пример использования
gradle build - запускает сервер  
curl "http://localhost?year=2020" – обращение к серверу


## Ответ сервера
Сервер предоставляет ответ в формате json:

**Успешный запрос:**  
http://localhost?year=2020
<pre>
{  
    "errorMessage":"200"
    "dataMessage":"12/9/2020"  
}
</pre>

Для удобства тестирования разного количества дней файле index.js можно заменить строчку **let day = 256** на **let day = request.query.day** и выполнять запрос в формате:
curl "http://localhost?year=2020&day=200"

**Запросы с ошибкой:**  
curl "http://localhost?year=-2020"  
<pre>
{  
    "errorMessage":"500"
    "dataMessage":"Кажется, вы затронули период до нашей эры"  
}
</pre>
curl "http://localhost?year=-2020"  
<pre>
{  
    "errorMessage":"500"
    "dataMessage":"Добавьте еще хотя бы 1 год к дате"  
}
</pre>
curl "http://localhost"  
<pre>
{  
    "errorMessage":"500"
    "dataMessage":"Год не указан"  
}
</pre>

