const int pinPumpV0 = 5;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(pinPumpV0, OUTPUT);
}

void loop() {

  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    if (comando == "water") {
      digitalWrite(pinPumpV0, HIGH);
    }
  }

  // put your main code here, to run repeatedly:
  /*digitalWrite(pinPumpV0, HIGH);
  delay(1000);
  digitalWrite(pinPumpV0, LOW);
  delay(1000);*/
}


/*#include <TimeLib.h>

void setup() {
  Serial.begin(9600);

  // Establecer la hora y la fecha manualmente
  setTime(12, 34, 0, 1, 1, 2023); // HH, MM, SS, DD, MM, YYYY
}

void loop() {
  // Obtener la hora actual
  time_t t = now();
  struct tm *tm_info;
  tm_info = localtime(&t);

  // Imprimir la hora actual
  Serial.print("Hora actual: ");
  Serial.print(tm_info->tm_hour);
  Serial.print(":");
  Serial.print(tm_info->tm_min);
  Serial.print(":");
  Serial.print(tm_info->tm_sec);
  Serial.println();

  // Esperar un segundo
  delay(1000);
}*/