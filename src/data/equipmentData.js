import arduino from "../assets/arduino.jpg";
import arduinoMega from "../assets/arduino_mega.webp";
import arduinoShield from "../assets/arduino_shild.webp";
import battery from "../assets/battery.jpg";
import esp32 from "../assets/esp32.jpg";
import hcsr04 from "../assets/hc-sr04.jpg";
import lineSensor from "../assets/line_sensor.webp";
import multimeter from "../assets/multimeter.webp";
import solderingIron from "../assets/soldering_iron.webp";
import stm32 from "../assets/stm32-nucleo.webp";
import logicAnalyzer from "../assets/logic_analyzer.jpeg";
import resistors from "../assets/resistors.webp";
import capacitor from "../assets/cond.webp";
import diode from "../assets/diod.jpeg";
import transistor from "../assets/transistor.jpeg";
import breadboard from "../assets/breadboard.jpg";

export const equipmentData = [
  {
    id: 1,
    name: "Логічний аналізатор",
    image: logicAnalyzer,
    description: "Пристрій для захоплення та аналізу цифрових сигналів у схемах мікроконтролерів і цифрової логіки.",
    specs: "Підтримка цифрових інтерфейсів (UART, SPI, I2C), багатоканальний захоплення сигналів, аналіз часових діаграм"
  },
  {
    id: 2,
    name: "STM32",
    image: stm32,
    description: "Сімейство 32-бітних мікроконтролерів на базі ARM Cortex для вбудованих систем реального часу.",
    specs: "ARM Cortex-M, низьке енергоспоживання, широкий набір периферії (GPIO, ADC, UART, SPI, I2C)"
  },
  {
    id: 3,
    name: "ESP32",
    image: esp32,
    description: "Мікроконтролер із вбудованими бездротовими інтерфейсами для IoT та embedded-застосувань.",
    specs: "Wi-Fi та Bluetooth, двоядерний процесор, підтримка FreeRTOS, багата периферія"
  },
  {
    id: 4,
    name: "HC-SR04",
    image: hcsr04,
    description: "Ультразвуковий датчик для безконтактного вимірювання відстані.",
    specs: "Діапазон вимірювання ~2–400 см, ультразвуковий принцип роботи, цифровий інтерфейс"
  },
  {
    id: 5,
    name: "KY-033",
    image: lineSensor,
    description: "Інфрачервоний датчик для виявлення лінії або контрастних поверхонь.",
    specs: "ІЧ-світлодіод і фотодіод, цифровий вихід, налаштування чутливості"
  },
  {
    id: 6,
    name: "Arduino UNO",
    image: arduino,
    description: "Мікроконтролерна плата для швидкого прототипування та навчальних проєктів.",
    specs: "ATmega328P, USB-підключення, цифрові та аналогові входи/виходи, підтримка Arduino IDE"
  },
  {
    id: 7,
    name: "Мультиметр",
    image: multimeter,
    description: "Вимірювальний прилад для діагностики електричних кіл.",
    specs: "Вимірювання напруги, струму та опору, режим перевірки діодів і цілісності кола"
  },
  {
    id: 8,
    name: "Щит для Arduino",
    image: arduinoShield,
    description: "Модуль-розширення для Arduino, що спрощує підключення додаткових пристроїв.",
    specs: "Сумісність з Arduino UNO, розширення GPIO, швидке підключення модулів"
  },
  {
    id: 9,
    name: "Паяльник",
    image: solderingIron,
    description: "Інструмент для монтажу та ремонту електронних компонентів.",
    specs: "Регулювання температури, змінні жала, стабільний тепловий режим"
  },
  {
    id: 10,
    name: "Акумулятор",
    image: battery,
    description: "Перезаряджуваний Li-Po акумулятор для автономного живлення електронних пристроїв.",
    specs: "Висока енергетична щільність, низька вага, потребує контролю заряду"
  },
  {
    id: 11,
    name: "Резистор",
    image: resistors,
    description: "Пасивний електронний компонент для обмеження струму та поділу напруги.",
    specs: "Різні номінали опору, стандартні допуски, використання у сигнальних і силових схемах"
  },
  {
    id: 12,
    name: "Конденсатор",
    image: capacitor,
    description: "Пасивний компонент для накопичення електричного заряду та фільтрації сигналів.",
    specs: "Різні типи (керамічні, електролітичні), згладжування пульсацій, розв’язка живлення"
  },
  {
    id: 13,
    name: "Діод",
    image: diode,
    description: "Напівпровідниковий компонент для пропускання струму в одному напрямку.",
    specs: "Захист від зворотної полярності, випрямлення змінного струму"
  },
  {
    id: 14,
    name: "Транзистор",
    image: transistor,
    description: "Активний напівпровідниковий компонент для підсилення та комутації сигналів.",
    specs: "Керування струмом або напругою, використання як ключ або підсилювач"
  },
  {
    id: 15,
    name: "Макетна дошка",
    image: breadboard,
    description: "Інструмент для швидкого прототипування електронних схем без пайки.",
    specs: "Повторне використання, зручність тестування схем, стандартні контактні доріжки"
  }
];
