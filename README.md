
Рабочая версия тестового - https://netris-test-puce.vercel.app/


ЗАДАНИЕ:

Есть список событий аналитики с таймстемпами (временем в миллисекундах от начала видео) и данными о
зоне в кадре, в которой событие возникло (координаты в пикселях):
https://jsonkeeper.com/b/7T9N
●
●
●
Адрес тестового видеопотока:
http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
Необходимо реализовать веб-приложение, обладающее следующим функционалом:
Отображение тестового видео с возможностью постановки на паузу и возобновлением
воспроизведения по клику на область видео
Отображения списка событий аналитики с возможностью позиционирования видео на момент,
указанный в событии
Список событий должен быть отсортирован по дате возникновения, само событие должно
отображаться в списке в виде времени своего возникновения в формате MM:SS:sss
(минуты:секунды:миллисекунды). Пример: 00:03:012, 01:05:123, 03:26:100
В момент возникновения события в плеере поверх видео должен рисоваться зелёный прямоугольник,
соответствующий области, определённой в событии. Прямоугольник должен отображаться как при
переходе к событию по клику из списка событий, так и в случае обычного воспроизведения и
навигации по видео. При наступлении даты окончания события, прямоугольник должен скрываться.
Возможна ситуация что одновременно показываются 2 и более прямоугольника.
Требования:
1. 3. Приложение должно быть написано с использованием TypeScript.
2. Реализация должна использовать React
Решение должно быть опубликовано на GitHub
Желательно:
●
1. Использование redux
2. Использование redux-saga
3. Покрытие тестами


по итогу тесты больше 90%. 
Квадраты рисуются.
Метки времени выделяются зелёным когда они есть на экране. Если переходить по меткам, выбранные тоже выделяются зеленым.
