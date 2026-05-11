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

const EQUIPMENT_IMAGES = {
  "arduino.jpg": arduino,
  "arduino_mega.webp": arduinoMega,
  "arduino_shild.webp": arduinoShield,
  "battery.jpg": battery,
  "esp32.jpg": esp32,
  "hc-sr04.jpg": hcsr04,
  "line_sensor.webp": lineSensor,
  "multimeter.webp": multimeter,
  "soldering_iron.webp": solderingIron,
  "stm32-nucleo.webp": stm32,
  "logic_analyzer.jpeg": logicAnalyzer,
  "resistors.webp": resistors,
  "cond.webp": capacitor,
  "diod.jpeg": diode,
  "transistor.jpeg": transistor,
  "breadboard.jpg": breadboard,
};

export const getEquipmentImage = (imageName) => EQUIPMENT_IMAGES[imageName] || null;
export const equipmentImageOptions = Object.keys(EQUIPMENT_IMAGES);
